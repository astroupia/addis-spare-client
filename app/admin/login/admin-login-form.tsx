"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle, CheckCircle, Shield } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getUserByEmail, verifyPassword } from  "@/mock/mock-admin-data" 


type LoginCredentials = {
  email: string
  password: string
  remember_me: boolean
}
 

interface AdminLoginFormProps {
  onLoginSuccess?: (user_id: string) => void
  className?: string
}

export function AdminLoginForm({ onLoginSuccess, className }: AdminLoginFormProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
    remember_me: false,
  })
  const [show_password, setShowPassword] = useState<boolean>(false)
  const [is_loading, setIsLoading] = useState<boolean>(false)
  const [error_message, setErrorMessage] = useState<string>("")
  const [success_message, setSuccessMessage] = useState<string>("")
  const router = useRouter()
  const { theme } = useTheme()
  const is_dark = theme === "dark"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials((prev: LoginCredentials) => ({ ...prev, [name]: value }))
    setErrorMessage("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication logic
      const user = getUserByEmail(credentials.email)

      if (!user) {
        throw new Error("Invalid email or password")
      }

      // Check if user is admin
      if (user.role !== "admin") {
        throw new Error("Access denied. Admin privileges required.")
      }

      if (user.status !== "active") {
        throw new Error("Account is suspended or pending verification")
      }

      if (!verifyPassword(credentials.password, user.password_hash)) {
        throw new Error("Invalid email or password")
      }

      // Successful admin login
      setSuccessMessage("Admin login successful! Redirecting to dashboard...")

      // Store admin session
      localStorage.setItem(
        "user_session",
        JSON.stringify({
          user_id: user.id,
          email: user.email,
          name: `${user.frist_name} ${user.last_name}`,
          role: user.role,
          expires_at: new Date(Date.now() + (credentials.remember_me ? 30 : 1) * 24 * 60 * 60 * 1000).toISOString(),
        }),
      )

      onLoginSuccess?.(user.id)

      setTimeout(() => {
        router.push("/admin/dashboard")
      }, 1500)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#670D2F]/10 flex items-center justify-center">
          <Shield className="h-8 w-8 text-[#670D2F]" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
        <p className={cn("text-base", is_dark ? "text-gray-400" : "text-gray-600")}>
          Secure access to the admin dashboard
        </p>
      </div>

      {error_message && (
        <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700 dark:text-red-400">{error_message}</AlertDescription>
        </Alert>
      )}

      {success_message && (
        <Alert className="mb-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700 dark:text-green-400">{success_message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Admin Email</Label>
          <div className="relative">
            <Mail className={cn("absolute left-3 top-3 h-5 w-5", is_dark ? "text-gray-400" : "text-gray-500")} />
            <Input
              id="email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="admin@addisparts.com"
              className={cn("pl-10", is_dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300")}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className={cn("absolute left-3 top-3 h-5 w-5", is_dark ? "text-gray-400" : "text-gray-500")} />
            <Input
              id="password"
              name="password"
              type={show_password ? "text" : "password"}
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Enter admin password"
              className={cn("pl-10 pr-10", is_dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300")}
              required
            />
            <button type="button" onClick={() => setShowPassword(!show_password)} className="absolute right-3 top-3">
              {show_password ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember_me"
              checked={credentials.remember_me}
              onCheckedChange={(checked) => setCredentials((prev: LoginCredentials) => ({ ...prev, remember_me: checked as boolean }))}
            />
            <Label htmlFor="remember_me" className="text-sm">
              Keep me signed in
            </Label>
          </div>
        </div>

        <Button type="submit" disabled={is_loading} className="w-full bg-[#670D2F] hover:bg-[#3A0519] text-white">
          {is_loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Signing in...
            </>
          ) : (
            <>
              Sign In to Admin
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button onClick={() => router.push("/admin/login")} className="text-sm text-[#670D2F] hover:underline">
          ← Back to customer login
        </button>
      </div>

      {/* Demo Credentials */}
      <div className="mt-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Demo Admin Credentials:</h4>
        <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <p>
            <strong>Email:</strong> admin@addisparts.com
          </p>
          <p>
            <strong>Password:</strong> password123
          </p>
        </div>
      </div>
    </div>
  )
}
