"use client"

import { useState } from "react"
import { Star, ShoppingCart, Trash2, Edit3, AlertCircle, TrendingDown, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/lib/use-toast"
import type { WishlistItem } from "@/types/wishlist"
import Image from "next/image"


interface WishlistItemCardProps {
  item: WishlistItem
  onRemove: (itemId: string) => void
  onUpdate: (itemId: string, updates: Partial<WishlistItem>) => void
}

export function WishlistItemCard({ item, onRemove, onUpdate }: WishlistItemCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editNotes, setEditNotes] = useState(item.notes || "")
  const [editPriority, setEditPriority] = useState(item.priority)
  const { toast } = useToast()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "in_stock":
        return "bg-green-100 text-green-800"
      case "limited_stock":
        return "bg-yellow-100 text-yellow-800"
      case "out_of_stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriceChange = () => {
    if (item.price_history.length < 2) return null

    const currentPrice = item.price_history[item.price_history.length - 1].price
    const previousPrice = item.price_history[item.price_history.length - 2].price
    const change = currentPrice - previousPrice
    const percentage = ((change / previousPrice) * 100).toFixed(1)

    return {
      amount: Math.abs(change),
      percentage: Math.abs(Number.parseFloat(percentage)),
      isIncrease: change > 0,
    }
  }

  const handleSaveEdit = () => {
    onUpdate(item.id, {
      notes: editNotes,
      priority: editPriority,
    })
    setIsEditOpen(false)
    toast("Item updated",{
       
      description: "Your wishlist item has been updated successfully.",
    })
  }

  const handleRemove = () => {
    onRemove(item.id)
    toast( "Item removed",{
      
      description: `${item.product_name} has been removed from your wishlist.`,
    })
  }

  const priceChange = getPriceChange()

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex space-x-4">
          {/* Product Image */}
          {/* Product Image */}
          <div className="flex-shrink-0">
            <Image
              src={item.product_image || "/placeholder.svg"}
              alt={item.product_name || "Product image"}
              width={96}
              height={96}
              className="w-24 h-24 object-cover rounded-lg"
            />
          </div>


          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg truncate">{item.product_name}</h3>
                <p className="text-sm text-gray-500">SKU: {item.product_sku}</p>
                {item.product_brand && <p className="text-sm text-gray-500">Brand: {item.product_brand}</p>}
              </div>

              <div className="flex space-x-1">
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Wishlist Item</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-priority">Priority</Label>
                        <Select
                          value={editPriority}
                          onValueChange={(value: "low" | "medium" | "high") => setEditPriority(value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="edit-notes">Notes</Label>
                        <Textarea
                          id="edit-notes"
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => setIsEditOpen(false)} className="flex-1">
                          Cancel
                        </Button>
                        <Button onClick={handleSaveEdit} className="flex-1 bg-[#670D2F] hover:bg-[#3A0519]">
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="ghost" size="sm" onClick={handleRemove}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>

            {/* Rating */}
            {item.product_rating && (
              <div className="flex items-center space-x-1 mb-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{item.product_rating.average}</span>
                <span className="text-sm text-gray-500">({item.product_rating.count} reviews)</span>
              </div>
            )}

            {/* Price and Price Change */}
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-2xl font-bold text-[#670D2F]">${item.product_price.toFixed(2)}</span>
              {priceChange && (
                <div
                  className={`flex items-center space-x-1 text-sm ${priceChange.isIncrease ? "text-red-600" : "text-green-600"}`}
                >
                  {priceChange.isIncrease ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>
                    {priceChange.isIncrease ? "+" : "-"}${priceChange.amount.toFixed(2)} ({priceChange.percentage}%)
                  </span>
                </div>
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className={getPriorityColor(item.priority)}>
                {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
              </Badge>
              <Badge className={getAvailabilityColor(item.availability_status)}>
                {item.availability_status === "in_stock" && "In Stock"}
                {item.availability_status === "limited_stock" && "Limited Stock"}
                {item.availability_status === "out_of_stock" && "Out of Stock"}
              </Badge>
              {item.price_alert_enabled && (
                <Badge variant="outline">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Price Alert
                </Badge>
              )}
            </div>

            {/* Notes */}
                {item.notes && (
                  <p className="text-sm text-gray-600 mb-3 italic">
                    &quot;{item.notes}&quot;
                  </p>
                )}

            {/* Stock Info */}
            {item.stock_count !== undefined && (
              <p className="text-sm text-gray-500 mb-3">
                {item.stock_count > 0 ? `${item.stock_count} in stock` : "Out of stock"}
              </p>
            )}

            {/* Actions */}
            <div className="flex space-x-2">
              <Button
                className="flex-1 bg-[#670D2F] hover:bg-[#3A0519]"
                disabled={item.availability_status === "out_of_stock"}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="sm">
                View Product
              </Button>
            </div>

            {/* Added Date */}
            <p className="text-xs text-gray-400 mt-2">Added {formatDate(item.added_at)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
