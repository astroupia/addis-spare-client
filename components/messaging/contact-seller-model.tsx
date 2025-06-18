"use client"

import type React from "react"
import Image from "next/image";
import { useState } from "react"
import { X, Send, MessageCircle, Truck, DollarSign, CheckCircle, AlertCircle } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Seller, InquiryData } from "@/types/message"
import type { Product } from "@/types/product"

interface ContactSellerModalProps {
  is_open: boolean
  onClose: () => void
  seller: Seller
  product: Product
  onSendMessage: (inquiry: InquiryData) => Promise<void>
}

export function ContactSellerModal({ is_open, onClose, seller, product, onSendMessage }: ContactSellerModalProps) {
  const [inquiry_data, setInquiryData] = useState<Partial<InquiryData>>({
    product_id: product.id,
    seller_id: seller.id,
    subject: `Inquiry about ${product.name}`,
    message: "",
    inquiry_type: "general",
  })
  const [is_loading, setIsLoading] = useState<boolean>(false)
  const [show_vehicle_form, setShowVehicleForm] = useState<boolean>(false)
  const { theme } = useTheme()
  const is_dark = theme === "dark"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inquiry_data.message?.trim() || !inquiry_data.subject?.trim()) return

    setIsLoading(true)
    try {
      await onSendMessage(inquiry_data as InquiryData)
      onClose()
      // Reset form
      setInquiryData({
        product_id: product.id,
        seller_id: seller.id,
        subject: `Inquiry about ${product.name}`,
        message: "",
        inquiry_type: "general",
      })
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInquiryTypeChange = (type: string) => {
    setInquiryData((prev) => ({ ...prev, inquiry_type: type as InquiryData["inquiry_type"] }))
    setShowVehicleForm(type === "compatibility")

    // Update subject based on inquiry type
    const subjects = {
      compatibility: `Vehicle Compatibility - ${product.name}`,
      shipping: `Shipping Options - ${product.name}`,
      pricing: `Pricing Inquiry - ${product.name}`,
      availability: `Availability Check - ${product.name}`,
      general: `Inquiry about ${product.name}`,
    }
    setInquiryData((prev) => ({ ...prev, subject: subjects[type as keyof typeof subjects] }))
  }

  if (!is_open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div
        className={cn(
          "w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl",
          is_dark ? "bg-gray-900" : "bg-white",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                is_dark ? "bg-gray-800" : "bg-gray-100",
              )}
            >
              {seller.avatar_url ? (
                <Image
                  src={seller.avatar_url || "/placeholder.svg"}
                  alt={seller.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <MessageCircle className="h-6 w-6 text-[#670D2F]" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold">Contact {seller.business_name}</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{seller.response_time}</span>
                {seller.verified && (
                  <>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Verified</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className={cn("p-2 rounded-full transition-colors", is_dark ? "hover:bg-gray-800" : "hover:bg-gray-100")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Product Info */}
        <div className={cn("p-4 border-b", is_dark ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200")}>
          <div className="flex items-center space-x-4">
            <Image
              src={product.image_url || "/placeholder.png?height=60&width=60"}
              alt={product.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="font-semibold text-[#670D2F]">${product.price.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Inquiry Type */}
          <div className="space-y-2">
            <Label htmlFor="inquiry_type">What would you like to ask about?</Label>
            <Select value={inquiry_data.inquiry_type} onValueChange={handleInquiryTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select inquiry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compatibility">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Vehicle Compatibility</span>
                  </div>
                </SelectItem>
                <SelectItem value="shipping">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4" />
                    <span>Shipping & Delivery</span>
                  </div>
                </SelectItem>
                <SelectItem value="pricing">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Pricing & Discounts</span>
                  </div>
                </SelectItem>
                <SelectItem value="availability">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>Stock Availability</span>
                  </div>
                </SelectItem>
                <SelectItem value="general">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>General Question</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Vehicle Information (for compatibility inquiries) */}
          {show_vehicle_form && (
            <div className={cn("p-4 rounded-lg space-y-4", is_dark ? "bg-gray-800" : "bg-blue-50")}>
              <h4 className="font-medium flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                <span>Vehicle Information</span>
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicle_year">Year</Label>
                  <Input
                    id="vehicle_year"
                    type="number"
                    placeholder="2020"
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    value={inquiry_data.user_vehicle?.year || ""}
                    onChange={(e) =>
                      setInquiryData((prev) => ({
                        ...prev, 
                        user_vehicle: {
                          ...prev.user_vehicle,
                          year: Number.parseInt(e.target.value) || 0,
                          make: prev.user_vehicle?.make || "",
                          model: prev.user_vehicle?.model || "",
                        },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle_make">Make</Label>
                  <Input
                    id="vehicle_make"
                    placeholder="Toyota"
                    value={inquiry_data.user_vehicle?.make || ""}
                    onChange={(e) =>
                      setInquiryData((prev) => ({
                        ...prev,
                        user_vehicle: {
                          ...prev.user_vehicle,
                          make: e.target.value,
                          model: prev.user_vehicle?.model || "",
                          year: prev.user_vehicle?.year || 0,
                        },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle_model">Model</Label>
                  <Input
                    id="vehicle_model"
                    placeholder="Camry"
                    value={inquiry_data.user_vehicle?.model || ""}
                    onChange={(e) =>
                      setInquiryData((prev) => ({
                        ...prev,
                        user_vehicle: {
                          ...prev.user_vehicle,
                          model: e.target.value,
                          make: prev.user_vehicle?.make || "",
                          year: prev.user_vehicle?.year || 0,
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={inquiry_data.subject || ""}
              onChange={(e) => setInquiryData((prev) => ({ ...prev, subject: e.target.value }))}
              placeholder="Enter subject"
              required
            />
          </div>

          {/* Message */}
          <div className="space-y-10 w-full">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={inquiry_data.message || ""}
              onChange={(e) => setInquiryData((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Type your message here..."
              rows={5}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose} disabled={is_loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={is_loading || !inquiry_data.message?.trim() || !inquiry_data.subject?.trim()}
              className="bg-[#670D2F] hover:bg-[#3A0519]"
            >
              {is_loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
