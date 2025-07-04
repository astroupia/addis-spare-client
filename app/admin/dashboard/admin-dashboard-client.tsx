"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogOut, Shield, AlertTriangle } from "lucide-react"
import { AdminOverview } from "@/components/admin/overview"
import { AdminUsers } from "@/components/admin/users"
import { AdminProducts } from "@/components/admin/product"
import { AdminOrders } from "@/components/admin/order"
import { AdminAnalytics } from "@/components/admin/analytics"
import { AdminModeration } from "@/components/admin/moderation"
import { getAllReportedContent } from "@/mock/mock-admin-data"


interface AdminUserSession {
  id: string
  name: string
  role: string
  [key: string]: unknown // Add more fields as needed
}


export function AdminDashboardClient() {
  const [activeTab, setActiveTab] = useState("overview")
  const [adminUser, setAdminUser] = useState<AdminUserSession | null>(null)
  const [pendingReports, setPendingReports] = useState(0)
  const router = useRouter()

  useEffect(() => {
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

    const reports = getAllReportedContent()
    const pending = reports.filter((r) => r.status === "pending" || r.status === "under_review").length
    setPendingReports(pending)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user_session")
    router.push("admin/login")
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
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-4">
            {/* Branding */}
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-[#670D2F]" />
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Addis Spare Parts</p>
              </div>
            </div>

            {/* User & Alerts */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              {pendingReports > 0 && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{pendingReports} pending</span>
                </div>
              )}
              <div className="text-sm text-left">
                <p className="font-medium text-gray-900 dark:text-white">{adminUser.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="w-full sm:w-auto">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="flex flex-wrap gap-2 w-full min-w-[600px] sm:min-w-0">
              <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
              <TabsTrigger value="users" className="text-sm">Users</TabsTrigger>
              <TabsTrigger value="products" className="text-sm">Products</TabsTrigger>
              <TabsTrigger value="orders" className="text-sm">Orders</TabsTrigger>
              <TabsTrigger value="moderation" className="relative text-sm">
                Moderation
                {pendingReports > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-500 hover:bg-red-500">
                    {pendingReports}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-sm">Analytics</TabsTrigger>
            </TabsList>
          </div>

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
          <TabsContent value="moderation" className="space-y-6">
            <AdminModeration />
          </TabsContent>
          <TabsContent value="analytics" className="space-y-6">
            <AdminAnalytics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
