import React from "react"
import {  TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {  Package, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { OrderHistory, SavedItem, User } from "@/types/auth"

interface ViewOrderHistoryProps {
  user: User
  order_history: OrderHistory[]
  saved_items: SavedItem[]
  formatDate: (date: string) => string
  getStatusColor: (status: string) => string
  setActiveTab: (tab: string) => void
}

export function ViewOrderHistory({
  user,
  order_history,
  formatDate,
  getStatusColor,
  setActiveTab
}: ViewOrderHistoryProps) {
  return (
    <>
      <TabsContent value="overview" className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Recent Orders</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {order_history.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div>
                    <p className="font-medium">{order.order_number}</p>
                    <p className="text-sm text-gray-500">{formatDate(order.order_date)}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    <p className="text-sm font-medium mt-1">${order.total_amount.toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("orders")}>
                View All Orders
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Account Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Extra layer of security</p>
                  </div>
                  <Badge className={user.two_factor_enabled ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                    {user.two_factor_enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Email Verification</p>
                    <p className="text-sm text-gray-500">Verify email</p>
                  </div>
                  <Badge className={user.email_verified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {user.email_verified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Phone Verification</p>
                    <p className="text-sm text-gray-500">Verify phone</p>
                  </div>
                  <Badge className={user.phone_verified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                    {user.phone_verified ? "Verified" : "Pending"}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("profile")}>
                Manage Security
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </>
  )
}
