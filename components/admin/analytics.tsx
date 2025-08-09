"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Users, ShoppingCart, DollarSign, Package, Calendar } from "lucide-react"
import { getAdminAnalytics } from "@/mock/mock-admin-data"

const COLORS = ["#670D2F", "#8B1538", "#AF1D41", "#D3254A", "#F72D53"]

type AnalyticsType = ReturnType<typeof getAdminAnalytics>;

export function AdminAnalyticsComponent() {
  const [analytics, setAnalytics] = useState<AnalyticsType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      const analyticsData = getAdminAnalytics()
      setAnalytics(analyticsData)
      setIsLoading(false)
    }

    loadAnalytics()
  }, [])

  if (isLoading || !analytics) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-64 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const pieData = [
    { name: "Active Users", value: analytics.overview.total_users * 0.8 },
    { name: "Inactive Users", value: analytics.overview.total_users * 0.2 },
  ]

  const revenueData = analytics.user_activity.map((day) => ({
    date: new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    revenue: day.orders * 45.5, // Average order value
    orders: day.orders,
  }))

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">User Growth</p>
                <p className="text-2xl font-bold text-gray-900">+{analytics.overview.growth_metrics.users_growth}%</p>
                <Badge className="bg-green-100 text-green-800 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  This month
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Order Growth</p>
                <p className="text-2xl font-bold text-gray-900">+{analytics.overview.growth_metrics.orders_growth}%</p>
                <Badge className="bg-green-100 text-green-800 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  This month
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue Growth</p>
                <p className="text-2xl font-bold text-gray-900">+{analytics.overview.growth_metrics.revenue_growth}%</p>
                <Badge className="bg-green-100 text-green-800 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  This month
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Product Growth</p>
                <p className="text-2xl font-bold text-gray-900">
                  +{analytics.overview.growth_metrics.products_growth}%
                </p>
                <Badge className="bg-green-100 text-green-800 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  This month
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Activity Trends</CardTitle>
            <CardDescription>Daily user activity over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.user_activity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  }
                />
                <YAxis />
                <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
                <Bar dataKey="new_users" fill="#670D2F" name="New Users" />
                <Bar dataKey="active_users" fill="#AF1D41" name="Active Users" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Daily revenue and order volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#670D2F" strokeWidth={2} name="Revenue ($)" />
                <Line type="monotone" dataKey="orders" stroke="#AF1D41" strokeWidth={2} name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Active vs inactive users</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products Performance</CardTitle>
            <CardDescription>Revenue by top performing products</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.top_products} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#670D2F" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Detailed breakdown of key metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#670D2F]">{analytics.overview.total_users.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-xs text-green-600">+{analytics.overview.growth_metrics.users_growth}% growth</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#670D2F]">{analytics.overview.total_orders.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-xs text-green-600">+{analytics.overview.growth_metrics.orders_growth}% growth</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#670D2F]">${analytics.overview.total_revenue.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-xs text-green-600">+{analytics.overview.growth_metrics.revenue_growth}% growth</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#670D2F]">{analytics.overview.total_products.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-xs text-green-600">+{analytics.overview.growth_metrics.products_growth}% growth</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}



// Add this type definition above or import it from your types file
type AdminAnalyticsType = {
  user_activity: Array<{
    date: string
    new_users: number
    active_users: number
    orders: number
  }>
  top_products: Array<{
    name: string
    sales_count: number
    revenue: number
  }>
  // Add other fields as needed
}

export function AdminAnalytics() {
  const [analytics, setAnalytics] = useState<AdminAnalyticsType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      setAnalytics(getAdminAnalytics())
      setIsLoading(false)
    }

    loadAnalytics()
  }, [])

  if (isLoading || !analytics) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const { user_activity, top_products } = analytics

  // Prepare data for charts
  const userActivityData = user_activity.map((day) => ({
    date: new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    newUsers: day.new_users,
    activeUsers: day.active_users,
    orders: day.orders,
  }))

  const topProductsData = top_products.map((product) => ({
    name: product.name.length > 20 ? product.name.substring(0, 20) + "..." : product.name,
    sales: product.sales_count,
    revenue: product.revenue,
  }))

  const orderStatusData = [
    { name: "Delivered", value: 45, color: "#10B981" },
    { name: "Shipped", value: 25, color: "#8B5CF6" },
    { name: "Processing", value: 20, color: "#3B82F6" },
    { name: "Pending", value: 10, color: "#F59E0B" },
  ]

  return (
    <div className="space-y-6">
      {/* User Activity Chart */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              User Activity Trends
            </CardTitle>
            <CardDescription>Daily user registration and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="newUsers" stroke="#670D2F" strokeWidth={2} name="New Users" />
                <Line type="monotone" dataKey="activeUsers" stroke="#3A0519" strokeWidth={2} name="Active Users" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Order Status Distribution
            </CardTitle>
            <CardDescription>Current order status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sales and Revenue Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Top Products by Sales
            </CardTitle>
            <CardDescription>Best performing products by units sold</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProductsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#670D2F" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Revenue by Product
            </CardTitle>
            <CardDescription>Revenue generated by top products</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProductsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                <Bar dataKey="revenue" fill="#3A0519" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Daily Orders Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Daily Orders Trend
          </CardTitle>
          <CardDescription>Number of orders placed each day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#670D2F" strokeWidth={3} name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
