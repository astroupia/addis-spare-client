"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getUserById, getOrderHistoryByUserId, getSavedItemsByUserId } from "@/mock/mock-auth-data"
import type { User as UserType, OrderHistory, SavedItem } from "@/types/auth"

interface AuthHeaderProps {
  onLoadUser: (
    user: UserType,
    order_history: OrderHistory[],
    saved_items: SavedItem[]
  ) => void
}

export default function AuthHeader({ onLoadUser }: AuthHeaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const session = localStorage.getItem("user_session")
    if (!session) {
      router.push("/sign-in")
      return
    }

    try {
      const session_data = JSON.parse(session)
      const user = getUserById(session_data.user_id)
      if (!user) {
        router.push("/sign-in")
        return
      }
      const orders = getOrderHistoryByUserId(user.id)
      const saved = getSavedItemsByUserId(user.id)
      onLoadUser(user, orders, saved)
    } catch (error) {
      console.error("Error loading user:", error)
      router.push("/sign-in")
    } finally {
      setIsLoading(false)
    }
  }, [router, onLoadUser])

  const handleLogout = () => {
    localStorage.removeItem("user_session")
    router.push("/sign-in")
  }

  return { isLoading, handleLogout }
}
