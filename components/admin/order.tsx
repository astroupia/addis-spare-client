"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ShoppingCart, Search, MoreHorizontal, Eye, Truck, Package, CheckCircle, XCircle } from "lucide-react"
import { getAllOrders, updateOrderStatus } from "../../mock/mock-admin-data"
import type { AdminOrder } from "../../mock/mock-admin-data"
import Image from "next/image"

export function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [filteredOrders, setFilteredOrders] = useState<AdminOrder[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      const orderData = getAllOrders()
      setOrders(orderData)
      setFilteredOrders(orderData)
      setIsLoading(false)
    }

    loadOrders()
  }, [])

  useEffect(() => {
    const filtered = orders.filter(
      (order) =>
        order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredOrders(filtered)
  }, [searchTerm, orders])

  const handleStatusChange = async (
    orderId: string,
    newStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled",
  ) => {
    const success = updateOrderStatus(orderId, newStatus)
    if (success) {
      setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
      case "shipped":
        return <Badge className="bg-purple-100 text-purple-800">Shipped</Badge>
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      case "refunded":
        return <Badge className="bg-gray-100 text-gray-800">Refunded</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Order Management
          </CardTitle>
          <CardDescription>Manage customer orders and fulfillment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search orders by number, customer name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>

                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.order_number}</p>
                        {order.tracking_number && (
                          <p className="text-sm text-gray-500">Tracking: {order.tracking_number}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer_name}</p>
                        <p className="text-sm text-gray-500">{order.customer_email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{order.items_count} items</TableCell>
                    <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{getPaymentStatusBadge(order.payment_status)}</TableCell>
                    <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Dialog>
                            <DialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Order Details - {order.order_number}</DialogTitle>
                                <DialogDescription>Complete order information and items</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Customer Information</h4>
                                    <p className="text-sm">{order.customer_name}</p>
                                    <p className="text-sm text-gray-500">{order.customer_email}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Order Status</h4>
                                    <div className="space-y-1">
                                      {getStatusBadge(order.status)}
                                      {getPaymentStatusBadge(order.payment_status)}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Shipping Address</h4>
                                  <p className="text-sm">
                                    {order.shipping_address.street}
                                    <br />
                                    {order.shipping_address.city}, {order.shipping_address.state}{" "}
                                    {order.shipping_address.zip_code}
                                    <br />
                                    {order.shipping_address.country}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Order Items</h4>
                                  <div className="space-y-2">
                                    {order.items.map((item, index) => (
                                      <div key={index} className="flex items-center space-x-3 p-2 border rounded">
                                        <Image
                                          width={32}
                                          height={32}
                                          src={item.image_url || "/placeholder.svg"}
                                          alt={item.product_name}
                                          className="w-12 h-12 rounded object-cover"
                                        />
                                        <div className="flex-1">
                                          <p className="font-medium">{item.product_name}</p>
                                          <p className="text-sm text-gray-500">
                                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                                          </p>
                                        </div>
                                        <p className="font-medium">${(item.quantity * item.price).toFixed(2)}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                {order.notes && (
                                  <div>
                                    <h4 className="font-medium mb-2">Notes</h4>
                                    <p className="text-sm text-gray-600">{order.notes}</p>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                          {order.status === "pending" && (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(order.id, "processing")}
                              className="text-blue-600"
                            >
                              <Package className="mr-2 h-4 w-4" />
                              Mark Processing
                            </DropdownMenuItem>
                          )}
                          {order.status === "processing" && (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(order.id, "shipped")}
                              className="text-purple-600"
                            >
                              <Truck className="mr-2 h-4 w-4" />
                              Mark Shipped
                            </DropdownMenuItem>
                          )}
                          {order.status === "shipped" && (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(order.id, "delivered")}
                              className="text-green-600"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark Delivered
                            </DropdownMenuItem>
                          )}
                          {(order.status === "pending" || order.status === "processing") && (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(order.id, "cancelled")}
                              className="text-red-600"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel Order
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No orders found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
