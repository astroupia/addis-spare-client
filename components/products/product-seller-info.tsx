"use client"

import { useState } from "react"
import { BadgeCheck, MapPin, Phone, Star, ChevronDown } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Seller } from "@/types/message"

interface ProductSellerInfoProps {
  seller: Seller
  className?: string
}

export function ProductSellerInfo({ seller, className }: ProductSellerInfoProps) {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))
  }

  return (
    <div className={cn("border rounded-xl p-4 shadow-sm bg-white space-y-4", className)}>
      {/* Section Title */}
      <h3 className="text-base font-semibold text-gray-800">Seller Information</h3>

      {/* Seller Profile */}
      <div className="flex items-center space-x-4">
        <Image
          src={seller.profileImage}
          alt={seller.name}
          width={64}
          height={64}
          className="rounded-full object-cover border"
        />
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-1">
            {seller.business_name}
            {seller.verified && (
              <BadgeCheck className="w-4 h-4 text-green-500">
                <title>Verified seller</title>
              </BadgeCheck>
            )}
          </h2>
          <div className="flex items-center text-sm text-gray-600">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
            {seller.rating.average.toFixed(1)} / 5.0 ({seller.rating.count})
          </div>
        </div>
      </div>

      {/* Ratings Filter */}
      <div className="text-sm text-gray-700 space-y-1">
        <div className="flex items-center justify-between">
          <span>Filter Ratings:</span>
          <button
            onClick={toggleSort}
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            {sortOrder === "newest" ? "Newest First" : "Oldest First"}
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <div className="text-xs text-gray-500 italic">
          Ratings are displayed from {sortOrder === "newest" ? "newest" : "oldest"}
        </div>
      </div>

      {/* Contact Info */}
      <div className="text-sm text-gray-700 space-y-1">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          {seller.response_time}
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-500" />
          <a href={`tel:${seller.phone}`} className="text-blue-600 hover:underline">
            {seller.phone}
          </a>
        </div>
      </div>
    </div>
  )
}
