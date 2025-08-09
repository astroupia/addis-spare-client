"use client"

import type React from "react"

import { useState } from "react"
import { Star, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { WriteReviewData } from "@/types/review"
import { submitReview } from "@/mock/mock-review-data"



interface WriteReviewFormProps {
  productId: string
  orderId: string
  productName: string
  onSuccess?: () => void
  onCancel?: () => void
  className?: string
}

export function WriteReviewForm({
  productId,
  orderId,
  productName,
  onSuccess,
  onCancel,
  className,
}: WriteReviewFormProps) {

  const [formData, setFormData] = useState<WriteReviewData>({
    product_id: productId,
    order_id: orderId,
    rating: 0,
    title: "",
    content: "",
    pros: [],
    cons: [],
  })

  const [newPro, setNewPro] = useState("")
  const [newCon, setNewCon] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const addPro = () => {
    if (newPro.trim() && formData.pros && formData.pros.length < 5) {
      setFormData((prev) => ({
        ...prev,
        pros: [...(prev.pros || []), newPro.trim()],
      }))
      setNewPro("")
    }
  }

  const removePro = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      pros: prev.pros?.filter((_, i) => i !== index),
    }))
  }

  const addCon = () => {
    if (newCon.trim() && formData.cons && formData.cons.length < 5) {
      setFormData((prev) => ({
        ...prev,
        cons: [...(prev.cons || []), newCon.trim()],
      }))
      setNewCon("")
    }
  }

  const removeCon = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      cons: prev.cons?.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const result = await submitReview(formData)

      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          onSuccess?.()
        }, 2000)
      } else {
        setError(result.error || "Failed to submit review")
      }
    } catch  {
      setError("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className={cn("p-6 text-center", className)}>
        <div className="text-green-500 text-4xl mb-4">✓</div>
        <h3 className="text-lg font-semibold mb-2">Review Submitted!</h3>
        <p className="text-gray-600">Thank you for your review. It will be published after moderation.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div>
        <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
        <p className="text-sm text-gray-600">Share your experience with {productName}</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Rating */}
      <div className="space-y-2">
        <Label>Overall Rating *</Label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingClick(star)}
              className="p-1 hover:scale-110 transition-transform"
            >
              <Star
                className={cn(
                  "h-6 w-6 transition-colors",
                  star <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-300",
                )}
              />
            </button>
          ))}
          {formData.rating > 0 && (
            <span className="ml-2 text-sm text-gray-600">
              {formData.rating} star{formData.rating !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Review Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="Summarize your experience in a few words"
          required
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content">Review Content *</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
          placeholder="Tell others about your experience with this product. What did you like or dislike? How did it perform?"
          rows={5}
          required
        />
        <div className="text-xs text-gray-500">Minimum 20 characters ({formData.content.length}/20)</div>
      </div>

      {/* Pros */}
      <div className="space-y-2">
        <Label>What did you like? (Optional)</Label>
        <div className="flex space-x-2">
          <Input
            value={newPro}
            onChange={(e) => setNewPro(e.target.value)}
            placeholder="Add a positive point"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addPro())}
          />
          <Button
            type="button"
            onClick={addPro}
            disabled={!newPro.trim() || (formData.pros?.length || 0) >= 5}
            size="sm"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {formData.pros && formData.pros.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.pros.map((pro, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm"
              >
                <span>+ {pro}</span>
                <button type="button" onClick={() => removePro(index)} className="text-green-600 hover:text-green-800">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cons */}
      <div className="space-y-2">
        <Label>What could be improved? (Optional)</Label>
        <div className="flex space-x-2">
          <Input
            value={newCon}
            onChange={(e) => setNewCon(e.target.value)}
            placeholder="Add a point for improvement"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCon())}
          />
          <Button
            type="button"
            onClick={addCon}
            disabled={!newCon.trim() || (formData.cons?.length || 0) >= 5}
            size="sm"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {formData.cons && formData.cons.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.cons.map((con, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm"
              >
                <span>- {con}</span>
                <button type="button" onClick={() => removeCon(index)} className="text-red-600 hover:text-red-800">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Buttons */}
      <div className="flex space-x-4 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting || formData.rating === 0 || !formData.title || !formData.content}
          className="flex-1 bg-[#670D2F] hover:bg-[#3A0519]"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
