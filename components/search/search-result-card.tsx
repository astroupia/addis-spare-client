"use client"

import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import type { SearchResult } from "@/types/search"
import { HighlightedTextDisplay } from "./highlighted-text"


interface SearchResultCardProps {
  result: SearchResult
}

export function SearchResultCard({ result }: SearchResultCardProps) {
  const { theme } = useTheme()
  const is_dark = theme === "dark"
  const { product, highlightedName, highlightedDescription } = result

  return (
    <Link
      href={`/product/${product.id}`}
      className={cn(
        "group block rounded-lg overflow-hidden transition-all duration-200",
        "border shadow-sm hover:shadow-md",
        is_dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
      )}
    >
      <div className="aspect-video relative overflow-hidden bg-gray-100">
        <Image
          src={product.image_url || "/placeholder.svg?height=300&width=500"}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">
            <HighlightedTextDisplay segments={highlightedName} />
          </h3>
          <span
            className={cn(
              "px-2 py-1 text-xs font-semibold rounded-full",
              is_dark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-800",
            )}
          >
            {product.category}
          </span>
        </div>

        {highlightedDescription && (
          <p className={cn("text-sm mb-3 line-clamp-2", is_dark ? "text-gray-400" : "text-gray-600")}>
            <HighlightedTextDisplay segments={highlightedDescription} />
          </p>
        )}

        <div className="flex justify-between items-center">
          <span className="font-bold text-[#670D2F]">${product.price.toFixed(2)}</span>
          <span
            className={cn(
              "text-sm px-3 py-1 rounded-full transition-colors",
              "bg-[#670D2F]/10 text-[#670D2F] group-hover:bg-[#670D2F] group-hover:text-white",
            )}
          >
            View Details
          </span>
        </div>
      </div>
    </Link>
  )
}
