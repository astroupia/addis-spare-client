"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LogOut, Shield } from "lucide-react"
import { AdminOverview } from "@/components/admin/overview"
import { AdminUsers } from "@/components/admin/users"
import { AdminProducts } from "@/components/admin/product"
import { AdminOrders } from "@/components/admin/order"
import { AdminAnalytics } from "@/components/admin/analytics"
import { AdminModeration } from "@/components/admin/moderation"
import { AdminSettings } from "@/components/admin/setting"

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'superadmin' | 'staff';
  // Add other fields as needed
}


export function AdminDashboardClient() {
  const [activeTab, setActiveTab] = useState("overview")
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in and is admin
    const session = localStorage.getItem("user_session")
    if (!session) {
      router.push("/login")
      return
    }

    const parsedSession = JSON.parse(session)
    if (parsedSession.role !== "admin") {
      router.push("/dashboard")
      return
    }

    setAdminUser(parsedSession)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user_session")
    router.push("/login")
  }

  if (!adminUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#670D2F]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-[#670D2F]" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Addis Spare Parts</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{adminUser.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AdminOverview />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <AdminUsers />
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <AdminProducts />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <AdminOrders />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AdminAnalytics />
          </TabsContent>

          <TabsContent value="moderation" className="space-y-6">
            <AdminModeration />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
