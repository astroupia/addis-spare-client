"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import useSWR from "swr"
import ProductCard from "./product-card"
import { fetchProducts } from "@/mock/products"

export type ProductCompatibility = {
  make: string
  model: string
  year: number
}

export type Product = {
  _id: string
  sku: string
  name: string
  description: string
  brand: string
  category: string
  price: number
  images: string[]
  attributes: Record<string, string>
  compatibility: ProductCompatibility[]
  tags: string[]
  stockControlled: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
}

interface ProductsGridProps {
  initialProducts: {
    products: Product[]
    total: number
  }
}

export default function ProductsGrid({ initialProducts }: ProductsGridProps) {
  const [page, setPage] = useState(1)
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || "all"
  const make = searchParams.get("make") || "all"
  const model = searchParams.get("model") || "all"
  const year = searchParams.get("year") || "all"

  // Fetch products with SWR for client-side data fetching
  const { data, isLoading } = useSWR(
    [`products-${category}-${make}-${model}-${year}-${page}`],
    () =>
      fetchProducts({
        page,
        limit: 12,
        category: category !== "all" ? category : undefined,
        make: make !== "all" ? make : undefined,
        model: model !== "all" ? model : undefined,
        year: year !== "all" ? year : undefined,
      }),
    { fallbackData: initialProducts },
  )

  const products = data?.products || []

  return (
    <div className="space-y-4">
      {/* Results count and sort - fixed below header */}
      <div className="bg-white dark:bg-[#0C0C0C] p-3 rounded-lg shadow-sm mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">{data?.total || 0} results</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Sort by</span>
          <select className="text-sm border rounded p-1 bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700">
            <option>Relevance</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {products.length === 0 && !isLoading && (
        <div className="text-center py-12 border border-dashed rounded-lg dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">No parts found matching your criteria</p>
        </div>
      )}

      {/* Load more button */}
      {products.length > 0 && page * 12 < (data?.total || 0) && (
        <div className="flex justify-center mt-8 pb-8">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="bg-[#670D2F] hover:bg-[#670D2F]/90 text-white px-4 py-2 rounded-md"
          >
            Load More Parts
          </button>
        </div>
      )}
    </div>
  )
}
