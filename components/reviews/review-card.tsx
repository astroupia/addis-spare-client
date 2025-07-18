"use client"

import { useState } from "react"
import { Star, ThumbsUp, ThumbsDown, CheckCircle, Calendar } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ProductReview } from "@/types/review"
import { voteOnReview } from "@/mock/mock-review-data"
import Image from "next/image"
interface ReviewCardProps {
  review: ProductReview
  className?: string
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [hasVoted, setHasVoted] = useState(false)
  const [isVoting, setIsVoting] = useState(false)

  const handleVote = async (voteType: "helpful" | "not_helpful") => {
    if (hasVoted || isVoting) return

    setIsVoting(true)
    try {
      await voteOnReview(review.id, voteType)
      setHasVoted(true)
    } catch (error) {
      console.error("Error voting on review:", error)
    } finally {
      setIsVoting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const helpfulPercentage = review.total_votes > 0 ? Math.round((review.helpful_votes / review.total_votes) * 100) : 0

  return (
    <div
      className={cn(
        "border rounded-lg p-6 space-y-4",
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {review.user.avatar_url ? (
            <Image
              width={35}
              height={20}
              src={review.user.avatar_url || "/placeholder.svg"}
              alt={`${review.user.first_name} ${review.user.last_name}`}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold",
                isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700",
              )}
            >
              {review.user.first_name.charAt(0)}
              {review.user.last_name.charAt(0)}
            </div>
          )}

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">
                {review.user.first_name} {review.user.last_name.charAt(0)}.
              </span>
              {review.user.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
              {review.verified_purchase && (
                <Badge variant="secondary" className="text-xs">
                  Verified Purchase
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(review.created_at)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn("h-4 w-4", star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300")}
            />
          ))}
        </div>
      </div>

      {/* Review Content */}
      <div className="space-y-3">
        <h4 className="font-semibold text-lg">{review.title}</h4>
        <p className={cn("text-sm leading-relaxed", isDark ? "text-gray-300" : "text-gray-700")}>{review.content}</p>

        {/* Pros and Cons */}
        {(review.pros && review.pros.length > 0) || (review.cons && review.cons.length > 0) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {review.pros && review.pros.length > 0 && (
              <div>
                <h5 className="font-medium text-green-600 mb-2">Pros:</h5>
                <ul className="space-y-1">
                  {review.pros.map((pro, index) => (
                    <li key={index} className="text-sm flex items-start space-x-2">
                      <span className="text-green-500 mt-1">+</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {review.cons && review.cons.length > 0 && (
              <div>
                <h5 className="font-medium text-red-600 mb-2">Cons:</h5>
                <ul className="space-y-1">
                  {review.cons.map((con, index) => (
                    <li key={index} className="text-sm flex items-start space-x-2">
                      <span className="text-red-500 mt-1">-</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* Review Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleVote("helpful")}
            disabled={hasVoted || isVoting}
            className="text-sm"
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            Helpful ({review.helpful_votes})
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleVote("not_helpful")}
            disabled={hasVoted || isVoting}
            className="text-sm"
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            Not Helpful
          </Button>
        </div>

        {review.total_votes > 0 && <div className="text-sm text-gray-500">{helpfulPercentage}% found this helpful</div>}
      </div>
    </div>
  )
}
