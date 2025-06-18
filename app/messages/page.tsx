import { Suspense } from "react"
import type { Metadata } from "next"
import { ConversationList } from "../../components/messaging/conversation-list"
import { Loader2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Messages | Addis Spare Parts",
  description: "View and manage your conversations with sellers",
}

// In a real app, you would get the user ID from authentication
const MOCK_USER_ID = "user_123"

export default function MessagesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>

        <Suspense
          fallback={
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-[#670D2F]" />
            </div>
          }
        >
          <ConversationList user_id={MOCK_USER_ID} />
        </Suspense>
      </div>
    </main>
  )
}
