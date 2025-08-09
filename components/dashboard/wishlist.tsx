"use client"

import { useState, useEffect, useCallback } from "react"
import { Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WishlistSummary } from "@/components/wishlist/wishlist-summary"
import { WishlistItemCard } from "@/components/wishlist/wishlist-item-card"
import { CreateWishlistDialog } from "@/components/wishlist/create-wishlist-dialog"
import {
  getWishlistsByUserId,
  getWishlistSummary,
  removeFromWishlist,
  getWishlistItemsByUserId,
} from "@/mock/mock-wishlist-data"
import type { Wishlist, WishlistItem, WishlistFilters } from "@/types/wishlist"

interface WishlistTabProps {
  userId?: string
}

export function WishlistTab({ userId = "user_001" }: WishlistTabProps) {
  const [wishlists, setWishlists] = useState<Wishlist[]>([])
  const [activeWishlist, setActiveWishlist] = useState<string>("")
  const [items, setItems] = useState<WishlistItem[]>([])
  const [filteredItems, setFilteredItems] = useState<WishlistItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<WishlistFilters>({
    sort_by: "added_date",
    sort_order: "desc",
  })
  const [summary, setSummary] = useState(getWishlistSummary(userId))

  const loadWishlists = useCallback(() => {
    const userWishlists = getWishlistsByUserId(userId)
    setWishlists(userWishlists)
    setSummary(getWishlistSummary(userId))

    if (userWishlists.length > 0 && !activeWishlist) {
      const defaultWishlist = userWishlists.find((w) => w.is_default)
      setActiveWishlist(defaultWishlist?.id || userWishlists[0].id)
    }
  }, [userId, activeWishlist])

  const applyFilters = useCallback(() => {
    let filtered = [...items]

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.product_category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.product_brand?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (filters.category) {
      filtered = filtered.filter((item) => item.product_category === filters.category)
    }

    if (filters.priority) {
      filtered = filtered.filter((item) => item.priority === filters.priority)
    }

    if (filters.availability) {
      filtered = filtered.filter((item) => item.availability_status === filters.availability)
    }

    if (filters.price_range) {
      filtered = filtered.filter(
        (item) =>
          item.product_price >= filters.price_range!.min &&
          item.product_price <= filters.price_range!.max
      )
    }

    filtered.sort((a, b) => {
      let comparison = 0
      switch (filters.sort_by) {
        case "name":
          comparison = a.product_name.localeCompare(b.product_name)
          break
        case "price_low":
          comparison = a.product_price - b.product_price
          break
        case "price_high":
          comparison = b.product_price - a.product_price
          break
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          comparison = priorityOrder[b.priority] - priorityOrder[a.priority]
          break
        case "added_date":
        default:
          comparison =
            new Date(b.added_at).getTime() - new Date(a.added_at).getTime()
          break
      }
      return filters.sort_order === "desc" ? comparison : -comparison
    })

    setFilteredItems(filtered)
  }, [items, searchQuery, filters])

  useEffect(() => {
    loadWishlists()
  }, [loadWishlists])

  useEffect(() => {
    if (activeWishlist) {
      const wishlist = wishlists.find((w) => w.id === activeWishlist)
      setItems(wishlist?.items || [])
    } else {
      setItems(getWishlistItemsByUserId(userId))
    }
  }, [activeWishlist, wishlists, userId])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  const handleRemoveItem = (itemId: string) => {
    const item = items.find((i) => i.id === itemId)
    if (item) {
      removeFromWishlist(userId, item.product_id)
      loadWishlists()
    }
  }

  const handleUpdateItem = (itemId: string, updates: Partial<WishlistItem>) => {
    console.log("Update item:", itemId, updates)
    loadWishlists()
  }

  const categories = Array.from(new Set(items.map((item) => item.product_category)))

  return (
    <div className="space-y-6">
      <WishlistSummary summary={summary} />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">My Wishlists</h2>
          {wishlists.length > 1 && (
            <Select value={activeWishlist || "default"} onValueChange={setActiveWishlist}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select wishlist" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">All Items</SelectItem>
                {wishlists.map((wishlist) => (
                  <SelectItem key={wishlist.id} value={wishlist.id}>
                    {wishlist.name} {wishlist.is_default && "(Default)"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <CreateWishlistDialog userId={userId} onWishlistCreated={loadWishlists} />
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search wishlist items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select
                value={filters.category || "all"}
                onValueChange={(value) =>
                  setFilters({ ...filters, category: value !== "all" ? value : undefined })
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.priority || "all"}
                onValueChange={(value: "low" | "medium" | "high" | "all") =>
                  setFilters({ ...filters, priority: value !== "all" ? value : undefined })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

                  <Select
                  value={filters.sort_by || "added_date"}
                  onValueChange={(value) =>
                    setFilters({
                      ...filters,
                      sort_by: value as WishlistFilters["sort_by"], // type cast inside the function body
                    })
                  }
                >

                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="added_date">Date Added</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500">
                {items.length === 0 ? (
                  <>
                    <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                    <p>Start adding products you&rsquo;d like to buy later!</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-medium mb-2">No items match your filters</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredItems.map((item) => (
            <WishlistItemCard
              key={item.id}
              item={item}
              onRemove={handleRemoveItem}
              onUpdate={handleUpdateItem}
            />
          ))
        )}
      </div>

      {filteredItems.length > 0 && (
        <div className="text-center text-sm text-gray-500">
          Showing {filteredItems.length} of {items.length} items
        </div>
      )}
    </div>
  )
}
