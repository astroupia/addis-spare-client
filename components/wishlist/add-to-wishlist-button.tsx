"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { useToast } from "@/lib/use-toast"
import {
  addToWishlist,
  getWishlistsByUserId,
  isProductInWishlist,
  removeFromWishlist,
} from "@/mock/mock-wishlist-data"
import type { Product } from "@/types/product"

interface AddToWishlistButtonProps {
  product: Product
  userId?: string
  variant?: "default" | "icon"
  className?: string
}

export function AddToWishlistButton({
  product,
  userId = "user_001",
  variant = "default",
  className,
}: AddToWishlistButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedWishlist, setSelectedWishlist] = useState<string>("")
  const [notes, setNotes] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [priceAlertEnabled, setPriceAlertEnabled] = useState(false)
  const [targetPrice, setTargetPrice] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const wishlists = getWishlistsByUserId(userId)
  const isInWishlist = isProductInWishlist(userId, product.id)

  const handleToggleWishlist = async () => {
    if (isInWishlist) {
      const success = removeFromWishlist(userId, product.id)
      if (success) {
        toast("Removed from wishlist", {
          description: `${product.name} has been removed from your wishlist.`,
        })
      }
    } else {
      const defaultWishlist = wishlists.find((w) => w.is_default)
      if (defaultWishlist) {
        addToWishlist(userId, product, defaultWishlist.id)
        toast("Added to wishlist", {
          description: `${product.name} has been added to your wishlist.`,
        })
      } else {
        setIsOpen(true)
      }
    }
  }

  const handleAddToWishlist = async () => {
    setIsLoading(true)
    try {
      const wishlistId =
        selectedWishlist || wishlists.find((w) => w.is_default)?.id

      addToWishlist(
        userId,
        {
          ...product,
          notes,
          priority,
          price_alert_enabled: priceAlertEnabled,
          target_price: targetPrice
            ? Number.parseFloat(targetPrice)
            : undefined,
        },
        wishlistId
      )

      toast("Added to wishlist", {
        description: `${product.name} has been added to your wishlist.`,
      })

      setIsOpen(false)
      setNotes("")
      setPriority("medium")
      setPriceAlertEnabled(false)
      setTargetPrice("")
    } catch {
      toast("Error", {
        description: "Failed to add item to wishlist. Please try again.",
        className: "bg-red-100 text-red-800",
        icon: "⚠️",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (variant === "icon") {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={handleToggleWishlist}
        className={className}
      >
        <Heart
          className={`h-4 w-4 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`}
        />
      </Button>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isInWishlist ? "secondary" : "outline"}
          onClick={isInWishlist ? handleToggleWishlist : undefined}
          className={className}
        >
          <Heart
            className={`h-4 w-4 mr-2 ${isInWishlist ? "fill-red-500 text-red-500" : ""}`}
          />
          {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Wishlist</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              width={60}
              height={60}
              className="object-cover rounded"
            />
            <div>
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-lg font-bold text-[#670D2F]">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>

          {wishlists.length > 1 && (
            <div className="space-y-2">
              <Label htmlFor="wishlist">Select Wishlist</Label>
              <Select
                value={selectedWishlist}
                onValueChange={(value) => setSelectedWishlist(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a wishlist" />
                </SelectTrigger>
                <SelectContent>
                  {wishlists.map((wishlist) => (
                    <SelectItem key={wishlist.id} value={wishlist.id}>
                      {wishlist.name} {wishlist.is_default && "(Default)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={priority}
              onValueChange={(value) =>
                setPriority(value as "low" | "medium" | "high")
              }
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
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add a note about this item..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="price-alert">Price Alert</Label>
              <Switch
                id="price-alert"
                checked={priceAlertEnabled}
                onCheckedChange={setPriceAlertEnabled}
              />
            </div>

            {priceAlertEnabled && (
              <div className="space-y-2">
                <Label htmlFor="target-price">Target Price</Label>
                <Input
                  id="target-price"
                  type="number"
                  step="0.01"
                  placeholder="Enter target price"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  min="0"
                />
                <p className="text-sm text-gray-500">
                  You&apos;ll be notified when the price drops to or below this
                  amount.
                </p>
              </div>
            )}
          </div>

          <div className="flex space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddToWishlist}
              disabled={isLoading}
              className="flex-1 bg-[#670D2F] hover:bg-[#3A0519]"
            >
              {isLoading ? "Adding..." : "Add to Wishlist"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
