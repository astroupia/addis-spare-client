"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ReviewSummary as ReviewSummaryType } from "@/types/review"

interface ReviewSummaryProps {
  summary: ReviewSummaryType
  className?: string
}

export function ReviewSummary({ summary, className }: ReviewSummaryProps) {
  const { total_reviews, average_rating, rating_distribution } = summary

  const getPercentage = (count: number) => {
    return total_reviews > 0 ? (count / total_reviews) * 100 : 0
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center space-x-4">
        <div className="text-center">
          <div className="text-3xl font-bold">{average_rating.toFixed(1)}</div>
          <div className="flex items-center justify-center space-x-1 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "h-4 w-4",
                  star <= Math.round(average_rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                )}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500">{total_reviews} reviews</div>
        </div>

        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2 text-sm">
              <span className="w-8 text-right">{rating}</span>
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${getPercentage(rating_distribution[rating as keyof typeof rating_distribution])}%`,
                  }}
                />
              </div>
              <span className="w-8 text-gray-500">
                {rating_distribution[rating as keyof typeof rating_distribution]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Optional default export if you want `import ReviewSummary from ...`
export default ReviewSummary
