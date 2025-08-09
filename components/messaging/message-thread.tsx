"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Send, Paperclip, CheckCircle } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "../ui/textarea"
import type { MessageListResponse, Message } from "@/types/message"
import { mock_conversations, mock_messages } from "@/lib/mock-messaging-data"

interface MessageThreadProps {
  conversation_id: string
  user_id: string
  className?: string
}

export function MessageThread({ conversation_id, user_id, className }: MessageThreadProps) {
  const [message_data, setMessageData] = useState<MessageListResponse | null>(null)
  const [new_message, setNewMessage] = useState<string>("")
  const [is_loading, setIsLoading] = useState<boolean>(true)
  const [is_sending, setIsSending] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const messages_end_ref = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const is_dark = theme === "dark"

  useEffect(() => {
    const simulateFetchMessages = async () => {
      setIsLoading(true)
      try {
        await new Promise((res) => setTimeout(res, 500)) // Simulate delay

        const conversation = mock_conversations.find((conv) => conv.id === conversation_id)
        const messages = mock_messages[conversation_id] || []

        if (!conversation) throw new Error("Conversation not found")

        setMessageData({
          conversation,
          messages,
          total: messages.length,
          page: 1,
          limit: 50,
        })
      } catch (err) {
        console.error("Error fetching messages:", err)
        setError("Failed to load messages")
      } finally {
        setIsLoading(false)
      }
    }

    simulateFetchMessages()
  }, [conversation_id])

  useEffect(() => {
    scrollToBottom()
  }, [message_data?.messages])

  const scrollToBottom = () => {
    messages_end_ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!new_message.trim() || is_sending) return

    setIsSending(true)
    try {
      await new Promise((res) => setTimeout(res, 300)) // Simulate delay

      const sent_message: Message = {
        id: String(Date.now()),
        conversation_id: conversation_id,
        content: new_message.trim(),
        sender_id: user_id,
        sender_type: "user",
        created_at: new Date().toISOString(),
        read_at: new Date().toISOString(),
      }

      setMessageData((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          messages: [...prev.messages, sent_message],
          total: prev.total + 1,
        }
      })

      setNewMessage("")
    } catch (err) {
      console.error("Error sending message:", err)
      setError("Failed to send message")
    } finally {
      setIsSending(false)
    }
  }

  const formatMessageTime = (date_string: string) => {
    const date = new Date(date_string)
    return date.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (is_loading) {
    return (
      <div className={cn("flex justify-center items-center py-20", className)}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#670D2F]" />
      </div>
    )
  }

  if (error || !message_data) {
    return (
      <div className={cn("text-center py-10", className)}>
        <p className={cn("text-lg font-medium", is_dark ? "text-red-400" : "text-red-600")}>
          {error || "Failed to load conversation"}
        </p>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Conversation Header */}
      <div className={cn("p-4 border-b", is_dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200")}>
        <div className="flex items-center space-x-4">
          {message_data.conversation.seller.avatar_url ? (
            <Image
              src={message_data.conversation.seller.avatar_url}
              alt={message_data.conversation.seller.name}
              className="w-10 h-10 rounded-full object-cover"
              width={50}
              height={50}
            />
          ) : (
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", is_dark ? "bg-gray-700" : "bg-gray-200")}>
              <span className="text-sm font-medium">
                {message_data.conversation.seller.business_name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-semibold">{message_data.conversation.seller.business_name}</h2>
              {message_data.conversation.seller.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
            </div>
            <p className="text-sm text-gray-500">{message_data.conversation.subject}</p>
          </div>
        </div>

        {message_data.conversation.product && (
          <div className="mt-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <div className="flex items-center space-x-3">
              <Image
                src={message_data.conversation.product.image_url || "/placeholder.png"}
                alt={message_data.conversation.product.name}
                className="w-12 h-12 rounded-lg object-cover"
                height={50}
                width={50}
              />
              <div>
                <p className="font-medium">{message_data.conversation.product.name}</p>
                <p className="text-sm text-[#670D2F] font-semibold">
                  ${message_data.conversation.product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {message_data.messages.map((message) => (
          <div key={message.id} className={cn("flex", message.sender_type === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                message.sender_type === "user"
                  ? "bg-[#670D2F] text-white"
                  : is_dark
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-900",
              )}
            >
              <p className="text-sm">{message.content}</p>
              <div className="flex items-center justify-between mt-1">
                <span
                  className={cn(
                    "text-xs",
                    message.sender_type === "user" ? "text-white/70" : is_dark ? "text-gray-400" : "text-gray-500",
                  )}
                >
                  {formatMessageTime(message.created_at)}
                </span>
                {message.sender_type === "user" && message.read_at && <CheckCircle className="h-3 w-3 text-white/70" />}
              </div>
            </div>
          </div>
        ))}
        <div ref={messages_end_ref} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="flex items-end space-x-2 p-4 border-t dark:border-gray-700">
        <div className="flex-1">
          <Textarea
            value={new_message}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            rows={2}
            className="resize-none w-full border-none dark:border-gray-600 focus:ring-[#670D2F] focus:border-[#670D2F] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-sm p-2"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage(e)
              }
            }}
          />
        </div>

        <div className="flex space-x-2">
          <Button type="button" variant="outline" size="sm" disabled>
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button
            type="submit"
            disabled={!new_message.trim() || is_sending}
            className="bg-[#670D2F] hover:bg-[#3A0519]"
            size="sm"
          >
            {is_sending ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
