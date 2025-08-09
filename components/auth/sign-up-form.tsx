"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/types/auth"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Lock, UserIcon, Phone, MapPin } from "lucide-react"


export default function SignUpForm() {
  const router = useRouter()
  const [is_loading, setIsLoading] = useState(false)
  const [form_data, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    contact: {
      phone: "",
      address: "",
      city: "",
      country: "",
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...form_data,
        [parent]: {
          ...(form_data[parent as keyof typeof form_data] as Record<string, string>),
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...form_data,
        [name]: value,
      })
    }
  }

  const handleRoleChange = (value: string) => {
    setFormData({
      ...form_data,
      role: value,
    })
  }

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validateName = (name: string) => {
    return name.length >= 2 && name.length <= 100
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!validateName(form_data.name)) {
      alert("Name must be between 2 and 100 characters")
      return
    }

    if (!validateEmail(form_data.email)) {
      alert("Please enter a valid email address")
      return
    }

    if (form_data.password.length < 8) {
      alert("Password must be at least 8 characters")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, you would call your API here
      // For now, we'll simulate an API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const new_user: Partial<User> = {
        // Remove 'name' if not present in User type, or add it to the User type if needed.
        email: form_data.email,
        role: form_data.role as "customer" | "supplier" | "admin" | "support",
        // contact: form_data.contact, // Removed because 'contact' does not exist in User type
        status: "pending",
        preferences: {
          language: "en",
          currency: "USD",
          notifications: {
            email: true,
            sms: false,
            push: true,
          },
          theme: "light", // or "dark" or "system"
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        // If User type has a 'full_name' or similar property, you can map it here:
        // full_name: form_data.name,
      }

      console.log("User registered:", new_user)
      
      // Redirect to login page after successful registration
      router.push("/sign-in")
    } catch (error) {
      console.error("Registration error:", error)
      alert("Failed to register. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={form_data.name}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={form_data.email}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form_data.password}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Account Type</Label>
        <Select value={form_data.role} onValueChange={handleRoleChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="customer">Customer</SelectItem>
            <SelectItem value="supplier">Supplier</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="support">Support</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact.phone">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            id="contact.phone"
            name="contact.phone"
            placeholder="+1 (555) 123-4567"
            value={form_data.contact.phone}
            onChange={handleChange}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact.address">Address</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            id="contact.address"
            name="contact.address"
            placeholder="Addis Abebe"
            value={form_data.contact.address}
            onChange={handleChange}
            className="pl-10"
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-[#670D2F] hover:bg-[#3A0519] text-white" disabled={is_loading}>
        {is_loading ? "Creating Account..." : "Sign Up"}
      </Button>

      <div className="text-center text-sm text-gray-500">
        <p className="my-4">OR CONTINUE WITH</p>
        <div className="flex gap-4 justify-center">
          <Button
            type="button"
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2"
            onClick={() => alert("Google sign up not implemented")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2"
            onClick={() => alert("Facebook sign up not implemented")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-[#1877F2]"
              fill="currentColor"
            >
              <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
            </svg>
            Facebook
          </Button>
        </div>
      </div>
    </form>
  )
}
