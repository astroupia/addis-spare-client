"use client"

import { useParams } from "next/navigation"
import {  useState } from "react"
import { Loader2 } from "lucide-react"
import { MessageThread } from "@/components/messaging/message-thread"

const MOCK_USER_ID = "user_123"

export default function MessageClientPage() {
  const params = useParams()
  const conversation_id = params?.conversation_id as string

  const [isLoading] = useState(false)

  if (!conversation_id) {
    return <div className="text-red-500">Conversation ID is missing.</div>
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto h-[calc(100vh-200px)]">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-[#670D2F]" />
          </div>
        ) : (
          <MessageThread
            conversation_id={conversation_id}
            user_id={MOCK_USER_ID}
          />
        )}
      </div>
    </main>
  )
}
