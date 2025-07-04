"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Flag, AlertCircle, CheckCircle } from "lucide-react"

interface ReportContentDialogProps {
  contentType: "product" | "user" | "review"
  contentId: string
  contentName: string
  trigger?: React.ReactNode
}

export function ReportContentDialog({ contentType, contentId, contentName, trigger }: ReportContentDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call to submit report
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, this would send the report to the backend
      console.log("Report submitted:", {
        contentType,
        contentId,
        contentName,
        reason,
        description,
        reporterId: "current_user_id", // Would come from session
        timestamp: new Date().toISOString(),
      })

      setIsSubmitted(true)

      // Reset form after a delay
      setTimeout(() => {
        setIsOpen(false)
        setIsSubmitted(false)
        setReason("")
        setDescription("")
      }, 2000)
    } catch (error) {
      console.error("Error submitting report:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const reasonOptions = [
    { value: "inappropriate_content", label: "Inappropriate Content" },
    { value: "spam", label: "Spam" },
    { value: "fraud", label: "Fraud or Scam" },
    { value: "harassment", label: "Harassment" },
    { value: "copyright", label: "Copyright Violation" },
    { value: "other", label: "Other" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Flag className="h-4 w-4 mr-2" />
            Report {contentType}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Flag className="h-5 w-5 mr-2 text-red-500" />
            Report {contentType === "product" ? "Product" : contentType === "user" ? "User" : "Review"}
          </DialogTitle>
          <DialogDescription>
            Report &quot;{contentName}&quot; for violating community guidelines or platform policies.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-6">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Thank you for your report. Our moderation team will review it shortly.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for reporting</Label>
              <Select value={reason} onValueChange={setReason} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  {reasonOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Additional details</Label>
              <Textarea
                id="description"
                placeholder="Please provide more details about why you're reporting this content..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                False reports may result in action against your account. Please only report content that genuinely
                violates our policies.
              </AlertDescription>
            </Alert>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700"
                disabled={isSubmitting || !reason || !description}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Submitting...
                  </div>
                ) : (
                  "Submit Report"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
