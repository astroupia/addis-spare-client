"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react"
import { getAdminAnalytics, AdminAnalytics, ReportedContent } from "@/mock/mock-admin-data"
import Image from "next/image"

export function AdminOverview() {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null)
  const [reports, setReports] = useState<ReportedContent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      const analyticsData = getAdminAnalytics()
      // Since reports are not part of analyticsData, use mock data or set to empty array
      const reportsData: ReportedContent[] = [] // TODO: Replace with actual reports fetching logic if available
      setAnalytics(analyticsData)
      setReports(reportsData)
      setIsLoading(false)
    }

    loadData()
  }, [])

  if (isLoading || !analytics) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const pendingReports = reports.filter((r) => r.status === "pending" || r.status === "under_review")
  const criticalReports = reports.filter((r) => r.priority === "critical")

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <Card>
    <CardContent className="p-4">
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-blue-100 rounded-md">
          <Users className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-xl font-semibold text-gray-900">
            {analytics.overview.total_users.toLocaleString()}
          </p>
          <div className="flex items-center mt-1">
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-sm text-green-600">
              +{analytics.overview.growth_metrics.users_growth}%
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-4">
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-green-100 rounded-md">
          <ShoppingCart className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-xl font-semibold text-gray-900">
            {analytics.overview.total_orders.toLocaleString()}
          </p>
          <div className="flex items-center mt-1">
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-sm text-green-600">
              +{analytics.overview.growth_metrics.orders_growth}%
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-4">
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-yellow-100 rounded-md">
          <DollarSign className="h-5 w-5 text-yellow-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-xl font-semibold text-gray-900">
            ${analytics.overview.total_revenue.toLocaleString()}
          </p>
          <div className="flex items-center mt-1">
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-sm text-green-600">
              +{analytics.overview.growth_metrics.revenue_growth}%
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-4">
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-purple-100 rounded-md">
          <Package className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Products</p>
          <p className="text-xl font-semibold text-gray-900">
            {analytics.overview.total_products.toLocaleString()}
          </p>
          <div className="flex items-center mt-1">
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-sm text-green-600">
              +{analytics.overview.growth_metrics.products_growth}%
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</div>


      {/* Moderation Alerts */}
      {(pendingReports.length > 0 || criticalReports.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pendingReports.length > 0 && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-yellow-800">Pending Reports</p>
                    <p className="text-2xl font-bold text-yellow-900">{pendingReports.length}</p>
                    <p className="text-sm text-yellow-700">Require immediate attention</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {criticalReports.length > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-red-800">Critical Reports</p>
                    <p className="text-2xl font-bold text-red-900">{criticalReports.length}</p>
                    <p className="text-sm text-red-700">High priority violations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activities and admin actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recent_activity.slice(0, 6).map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {activity.type === "content_reported" && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                    {activity.type === "content_taken_down" && <Shield className="h-4 w-4 text-red-600" />}
                    {activity.type === "order_placed" && <ShoppingCart className="h-4 w-4 text-green-600" />}
                    {activity.type === "user_registration" && <Users className="h-4 w-4 text-blue-600" />}
                    {activity.type === "product_added" && <Package className="h-4 w-4 text-purple-600" />}
                    {activity.type === "user_login" && <CheckCircle className="h-4 w-4 text-gray-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Best selling products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.top_products.map((product, index) => (
                <div key={product.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center w-8 h-8 bg-[#670D2F] text-white rounded-full text-sm font-medium">
                      {index + 1}
                    </span>
                  </div>
                  <Image
                    width={32}
                    height={32}
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{product.sales_count} sales</span>
                      <span>${product.revenue.toFixed(2)} revenue</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
     
    </div>
  )
}
