"use client"

import {
  useState,
  useEffect,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from "react"
import { SortAsc } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReviewCard } from "./review-card"
import type { ProductReview } from "@/types/review"
import { getProductReviews } from "@/mock/mock-review-data"

interface ReviewListProps {
  productId: string
  className?: string
}

export const ReviewList = forwardRef(function ReviewList(
  { productId, className }: ReviewListProps,
  ref
) {
  const [reviews, setReviews] = useState<ProductReview[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest")

  const loadReviews = useCallback(async () => {
  setLoading(true)
    try {
      const reviewData = await getProductReviews(productId, { sort_by: sortBy })
      setReviews(reviewData)
    } catch (error) {
      console.error("Error loading reviews:", error)
    } finally {
      setLoading(false)
    }
  }, [productId, sortBy])

  useEffect(() => {
    loadReviews()
  }, [loadReviews])
    // Expose refetch method
  useImperativeHandle(ref, () => ({
    refetch: loadReviews,
  }))

  return (
    <div className={className}>
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center space-x-2">
          <SortAsc className="h-4 w-4" />
          <span className="text-sm font-medium">Sort by:</span>
          <Select value={sortBy} onValueChange={(value: "newest" | "oldest") => setSortBy(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading && reviews.length === 0 ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No reviews available.</p>
        </div>
      )}
    </div>
  )
})
