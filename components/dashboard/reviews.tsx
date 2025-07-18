"use client"

import { useState, useEffect } from "react"
import { Star, Edit, Trash2, Eye } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { ProductReview } from "@/types/review"
import { getUserReviews } from "@/mock/mock-review-data"

export function ReviewsTab() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [reviews, setReviews] = useState<ProductReview[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserReviews()
  }, [])

  const loadUserReviews = async () => {
    setLoading(true)
    try {
      const userReviews = await getUserReviews("current_user")
      setReviews(userReviews)
    } catch (error) {
      console.error("Error loading user reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg mb-4"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Reviews</h2>
          <p className="text-gray-600">Manage your product reviews and ratings</p>
        </div>
        <div className="text-sm text-gray-500">
          {reviews.length} review{reviews.length !== 1 ? "s" : ""}
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">⭐</div>
          <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
          <p className="text-gray-600 mb-4">
            You haven&apos;t written any reviews yet. Purchase products to share your experience!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={cn(
                "border rounded-lg p-6",
                isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-lg">{review.title}</h3>
                    <Badge className={getStatusColor(review.status)}>
                      {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "h-4 w-4",
                            star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">Product ID: {review.product_id}</span>
                    <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Review Details</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">{review.title}</h4>
                          <div className="flex items-center space-x-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={cn(
                                  "h-5 w-5",
                                  star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                                )}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 mb-4">{review.content}</p>

                          {review.pros && review.pros.length > 0 && (
                            <div className="mb-4">
                              <h5 className="font-medium text-green-600 mb-2">Pros:</h5>
                              <ul className="space-y-1">
                                {review.pros.map((pro, index) => (
                                  <li key={index} className="text-sm flex items-start space-x-2">
                                    <span className="text-green-500">+</span>
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
                                    <span className="text-red-500">-</span>
                                    <span>{con}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-sm text-gray-500">
                            {review.helpful_votes} of {review.total_votes} found this helpful
                          </div>
                          <Badge className={getStatusColor(review.status)}>{review.status}</Badge>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {review.status === "pending" && (
                    <>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <p className={cn("text-sm mb-4", isDark ? "text-gray-300" : "text-gray-700")}>
                {review.content.length > 150 ? `${review.content.substring(0, 150)}...` : review.content}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  {review.verified_purchase && <span className="text-green-600">✓ Verified Purchase</span>}
                  <span>{review.helpful_votes} helpful votes</span>
                </div>

                {review.status === "approved" && <span className="text-green-600">Published</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
