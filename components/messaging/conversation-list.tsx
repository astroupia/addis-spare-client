"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { MessageCircle, Clock, CheckCircle, Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import type { ConversationListResponse } from "@/types/message"
import { mock_conversations } from "@/lib/mock-messaging-data"

interface ConversationListProps {
  user_id: string
  className?: string
}

export function ConversationList({ user_id, className }: ConversationListProps) {
  const [conversations_data, setConversationsData] = useState<ConversationListResponse | null>(null)
  const [is_loading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { theme } = useTheme()
  const is_dark = theme === "dark"

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        // const response = await fetch(`/api/conversations?user_id=${user_id}`)
        // if (!response.ok) {
        //   throw new Error("Failed to fetch conversations")
        // }
        const data: ConversationListResponse = {
          conversations: mock_conversations,
          total: mock_conversations.length,
          page: 1,
          limit: mock_conversations.length,
        }
        setConversationsData(data)
      } catch (err) {
        console.error("Error fetching conversations:", err)
        setError("Failed to load conversations")
      } finally {
        setIsLoading(false)
      }
    }

    fetchConversations()
  }, [user_id])

  const formatTime = (date_string: string) => {
    const date = new Date(date_string)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (days === 1) {
      return "Yesterday"
    } else if (days < 7) {
      return `${days} days ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  if (is_loading) {
    return (
      <div className={cn("flex justify-center items-center py-20", className)}>
        <Loader2 className="h-8 w-8 animate-spin text-[#670D2F]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn("text-center py-10", className)}>
        <p className={cn("text-lg font-medium", is_dark ? "text-red-400" : "text-red-600")}>{error}</p>
      </div>
    )
  }

  if (!conversations_data || conversations_data.conversations.length === 0) {
    return (
      <div className={cn("text-center py-16", className)}>
        <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold mb-2">No conversations yet</h3>
        <p className={cn("text-base", is_dark ? "text-gray-400" : "text-gray-600")}>
          Start a conversation with a seller to see it here.
        </p>
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      {conversations_data.conversations.map((conversation) => (
        <Link
          key={conversation.id}
          href={`/messages/${conversation.id}`}
          className={cn(
            "block p-4 rounded-lg border transition-all duration-200 hover:shadow-md",
            is_dark ? "bg-gray-800 border-gray-700 hover:bg-gray-750" : "bg-white border-gray-200 hover:bg-gray-50",
          )}
        >
          <div className="flex items-start space-x-4">
            {/* Seller Avatar */}
            <div className="flex-shrink-0">
              {conversation.seller.avatar_url ? (
                <Image
                  src={conversation.seller.avatar_url || "/placeholder.png"}
                  alt={conversation.seller.name}
                  className="w-12 h-12 rounded-full object-cover"
                  width={50}
                  height={50}
                />
              ) : (
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    is_dark ? "bg-gray-700" : "bg-gray-200",
                  )}
                >
                  <MessageCircle className="h-6 w-6 text-[#670D2F]" />
                </div>
              )}
            </div>

            {/* Conversation Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium truncate">{conversation.seller.business_name}</h3>
                  {conversation.seller.verified && <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{conversation.last_message ? formatTime(conversation.last_message.created_at) : ""}</span>
                </div>
              </div>

              <p className="text-sm font-medium text-[#670D2F] mb-1">{conversation.subject}</p>

              {conversation.product && (
                <p className={cn("text-sm mb-2", is_dark ? "text-gray-400" : "text-gray-600")}>
                  About: {conversation.product.name}
                </p>
              )}

              {conversation.last_message && (
                <p className={cn("text-sm truncate", is_dark ? "text-gray-300" : "text-gray-700")}>
                  {conversation.last_message.sender_type === "user" ? "You: " : `${conversation.seller.name}: `}
                  {conversation.last_message.content}
                </p>
              )}

              {conversation.unread_count > 0 && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#670D2F] text-white">
                    {conversation.unread_count} unread
                  </span>
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
