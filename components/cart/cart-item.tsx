"use client"

import type { CartItem as CartItemType } from "@/components/cart/use-cart"
import { useCart } from "@/components/cart/use-cart"
import type { Product } from "@/components/products/products-grid"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { useState } from "react"


interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Get cart from context - safely with error handling
  const cart = useCart()
  const updateQuantity: (productId: string, quantity: number, options?: Record<string, string>) => void =
    cart.updateQuantity
  const removeItem: (productId: string, options?: Record<string, string>) => void = cart.removeItem
  const addItem: (product: Product, quantity: number, options?: Record<string, string>) => void = cart.addItem

  const mainImage =
    item.product.images && item.product.images.length > 0 && !imageError
      ? item.product.images[0]
      : `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(item.product.name)}`

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.product._id, item.selectedOptions)
    } else {
      updateQuantity(item.product._id, newQuantity, item.selectedOptions)
    }
  }

  const handleAddMore = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(item.product, 1, item.selectedOptions)
  }

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
          <Link href={`/product/${item.product._id}`}>
            <Image
              src={mainImage || "/placeholder.svg"}
              alt={item.product.name}
              fill
              className="object-contain p-2"
              sizes="96px"
              onError={() => setImageError(true)}
            />
          </Link>

          {/* Hover overlay with Add More button */}
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-all duration-200">
              <Button
                onClick={handleAddMore}
                size="sm"
                className="bg-[#670D2F] hover:bg-[#670D2F]/90 text-white transform scale-100 hover:scale-105 transition-transform duration-200"
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Add More
              </Button>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <Link
                href={`/product/${item.product._id}`}
                className="font-medium text-gray-900 dark:text-white hover:text-[#670D2F] dark:hover:text-[#ff8fb1] transition-colors"
              >
                {item.product.name}
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {item.product.brand} • SKU: {item.product.sku}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(item.product._id, item.selectedOptions)}
              className="text-gray-400 hover:text-red-500 p-1"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Selected Options */}
          {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
            <div className="mb-3">
              {Object.entries(item.selectedOptions).map(([key, value]) => (
                <span
                  key={key}
                  className="inline-block text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded mr-2 mb-1"
                >
                  {key}: {value}
                </span>
              ))}
            </div>
          )}

          {/* Compatibility Info */}
          {item.product.compatibility && item.product.compatibility.length > 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              Fits:{" "}
              {item.product.compatibility
                .slice(0, 2)
                .map((c) => `${c.make} ${c.model} ${c.year}`)
                .join(", ")}
              {item.product.compatibility.length > 2 && ` +${item.product.compatibility.length - 2} more`}
            </p>
          )}

          {/* Price and Quantity Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">${item.product.price.toFixed(2)} each</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
