"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/lib/use-toast"
import { createWishlist } from "@/mock/mock-wishlist-data"

interface CreateWishlistDialogProps {
  userId: string
  onWishlistCreated: () => void
}

export function CreateWishlistDialog({ userId, onWishlistCreated }: CreateWishlistDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleCreate = async () => {
    if (!name.trim()) {
      toast( "Error",{
        
        description: "Please enter a wishlist name.",
        className: "bg-red-100 text-red-800", // optional Tailwind classes
         icon: "⚠️", // optional icon
      })
      return
    }

    setIsLoading(true)

    try {
      const newWishlist = createWishlist(userId, {
        name: name.trim(),
        description: description.trim() || undefined,
        is_public: isPublic,
      })

      toast(  "Wishlist created",{
       
        description: `"${newWishlist.name}" has been created successfully.`,
      })

      setIsOpen(false)
      setName("")
      setDescription("")
      setIsPublic(false)
      onWishlistCreated()
    } catch{
      toast( "Error",{
        
        description: "Failed to create wishlist. Please try again.",
         className: "bg-red-100 text-red-800", // optional Tailwind classes
           icon: "⚠️", // optional icon
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#670D2F] hover:bg-[#3A0519]">
          <Plus className="h-4 w-4 mr-2" />
          Create Wishlist
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Wishlist</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Wishlist Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Birthday Wishlist, Car Upgrades"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe what this wishlist is for..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={200}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="public">Make Public</Label>
              <p className="text-sm text-gray-500">Others can view this wishlist</p>
            </div>
            <Switch id="public" checked={isPublic} onCheckedChange={setIsPublic} />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={isLoading} className="flex-1 bg-[#670D2F] hover:bg-[#3A0519]">
              {isLoading ? "Creating..." : "Create Wishlist"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
