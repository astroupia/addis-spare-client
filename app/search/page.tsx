"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { SearchResults } from "@/components/search/search-results"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const [query, setQuery] = useState("")  // ✅ initialize query state

  return (
    <div className="min-h-screen bg-white dark:bg-[#0C0C0C] transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#670D2F] to-[#3A0519] bg-clip-text text-transparent">
             Addis Spare
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
           Find Your Perfect Spare Part, Instantly here In Addis Spare
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}  // ✅ update query on input change
              placeholder="Search for your  Spare Part..."
              className={cn(
                "w-full pl-12 pr-4 py-4 rounded-2xl border transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-[#670D2F]/50 focus:border-[#670D2F]",
                "dark:bg-gray-800 dark:border-gray-700 dark:text-white",
                "bg-white border-gray-200 text-gray-900",
              )}
            />
          </div>
        </div>

        <SearchResults query={query} />  {/* ✅ pass query down to results */}
      </div>
    </div>
  )
}
