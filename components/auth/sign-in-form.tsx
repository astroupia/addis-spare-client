"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Lock } from "lucide-react"
import mockUsers from "@/mock/user.json" assert { type: "json" }



export default function SignInForm() {
  const router = useRouter()
  const [is_loading, setIsLoading] = useState(false)
  const [form_data, setFormData] = useState({
    email: "",
    password: "",
    remember_me: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...form_data,
      [name]: value,
    })
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...form_data,
      remember_me: checked,
    })
  }

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!validateEmail(form_data.email)) {
      alert("Please enter a valid email address")
      return
    }

    if (form_data.password.length < 1) {
      alert("Please enter your password")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, you would call your API here
      // For now, we'll simulate an API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate fetching user data from mock
      

      const user = mockUsers.find((user) => user.email === form_data.email)

      if (!user) {
        throw new Error("Invalid email or password")
      }

      // In a real app, you would verify the password hash here
      // For demo purposes, we'll just simulate a successful login

      console.log("User logged in:", user)

      // Store user session (in a real app, this would be a JWT token or session cookie)
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          }),
        )
      }

      // Redirect to dashboard after successful login
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      alert("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link href="/forgot-password" className="text-sm text-[#670D2F] hover:text-[#3A0519]">
            Forgot password?
          </Link>
        </div>
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

      <div className="flex items-center space-x-2">
        <Checkbox
          id="remember_me"
          checked={form_data.remember_me}
          onCheckedChange={handleCheckboxChange}
          className="data-[state=checked]:bg-[#670D2F] data-[state=checked]:border-[#670D2F]"
        />
        <label
          htmlFor="remember_me"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember me
        </label>
      </div>

      <Button type="submit" className="w-full bg-[#670D2F] hover:bg-[#3A0519] text-white" disabled={is_loading}>
        {is_loading ? "Signing In..." : "Sign In"}
      </Button>

      <div className="text-center text-sm text-gray-500">
        <p className="my-4">OR CONTINUE WITH</p>
        <div className="flex gap-4 justify-center">
          <Button
            type="button"
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2"
            onClick={() => alert("Google sign in not implemented")}
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
            onClick={() => alert("Facebook sign in not implemented")}
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
