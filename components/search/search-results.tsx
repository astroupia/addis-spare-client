"use client"

import { useState, useEffect } from "react"
import { Loader2, Search, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SearchResponse } from "@/types/search"
import { SearchResultCard } from "./search-result-card"

interface SearchResultsProps {
  query: string
  className?: string
}

export function SearchResults({ query, className }: SearchResultsProps) {
  const [search_response, setSearchResponse] = useState<SearchResponse | null>(null)
  const [is_loading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isRetrying, setIsRetrying] = useState<boolean>(false)
  
  
  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setSearchResponse(null)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)

        if (!response.ok) {
          throw new Error("Failed to fetch search results")
        }

        const data: SearchResponse = await response.json()
        setSearchResponse(data)
      } catch (err) {
        console.error("Search error:", err)
        setError("An error occurred while searching. Please try again.")
      } finally {
        setIsLoading(false)
        setIsRetrying(false)
      }
    }

    fetchResults()
  }, [query])

  const handleRetry = () => {
    setIsRetrying(true)
    window.location.reload()
  }

  if (is_loading) {
    return (
      <div className={cn("relative py-12", className)}>
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-[#670D2F]" />
          <p className="text-center text-lg font-medium">
            Searching for <span className="font-bold text-[#670D2F]">{query}</span>...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn("relative py-12 text-center", className)}>
        <h3 className="text-2xl font-bold text-red-600">Oops! Something went wrong</h3>
        <p className="mb-4">{error}</p>
        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className="inline-flex items-center px-4 py-2 bg-[#670D2F] text-white rounded hover:bg-[#3A0519]"
        >
          {isRetrying ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          {isRetrying ? "Retrying..." : "Try Again"}
        </button>
      </div>
    )
  }

  // ✅ Show "No results" only if query is non-empty
  if ((!search_response || search_response.results.length === 0) && query.trim()) {
    return (
      <div className={cn("relative py-12 text-center", className)}>
        <Search className="h-10 w-10 mx-auto text-gray-400" />
        <h3 className="text-xl font-semibold mt-4">No results found for {query}</h3>
        <p className="mt-2 text-gray-600">
          Try adjusting your search or browse through our categories.
        </p>
      </div>
    )
  }

  return (
    <div className={cn("relative", className)}>
     
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {search_response?.results.map((product, index) => (
          <SearchResultCard key={index} result={product} />
        ))}
      </div>
    </div>
  )
}
