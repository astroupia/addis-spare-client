"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle, CheckCircle } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox" 
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { LoginCredentials } from "@/types/auth"
import { getUserByEmail, verifyPassword } from "@/mock/mock-auth-data"

interface LoginFormProps {
  onLoginSuccess?: (user_id: string) => void
  className?: string
}

export function LoginForm({ onLoginSuccess, className }: LoginFormProps) {
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
    setCredentials((prev) => ({ ...prev, [name]: value }))
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

      if (user.status !== "active") {
        throw new Error("Account is suspended or pending verification")
      }

      if (!verifyPassword(credentials.password, user.password_hash)) {
        throw new Error("Invalid email or password")
      }

      // Successful login
      setSuccessMessage("Login successful! Redirecting...")

      // Store user session (in real app, use secure session management)
      localStorage.setItem(
        "user_session",
        JSON.stringify({
          user_id: user.id,
          email: user.email,
          name: `${user.first_name} ${user.last_name}`,
          role: user.role,
          expires_at: new Date(Date.now() + (credentials.remember_me ? 30 : 1) * 24 * 60 * 60 * 1000).toISOString(),
        }),
      )

      onLoginSuccess?.(user.id)

      setTimeout(() => {
        router.push("/dashboard")
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
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className={cn("text-base", is_dark ? "text-gray-400" : "text-gray-600")}>
          Sign in to your account to continue
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
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className={cn("absolute left-3 top-3 h-5 w-5", is_dark ? "text-gray-400" : "text-gray-500")} />
            <Input
              id="email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
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
              placeholder="Enter your password"
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
              onCheckedChange={(checked) => setCredentials((prev) => ({ ...prev, remember_me: checked as boolean }))}
            />
            <Label htmlFor="remember_me" className="text-sm">
              Remember me for 30 days
            </Label>
          </div>
          <button
            type="button"
            className="text-sm text-[#670D2F] hover:underline"
            onClick={() => router.push("/forgot-password")}
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" disabled={is_loading} className="w-full bg-[#670D2F] hover:bg-[#3A0519] text-white">
          {is_loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className={cn("text-sm", is_dark ? "text-gray-400" : "text-gray-600")}>
          Don&apos;t have an account?{" "}
          <button onClick={() => router.push("/register")} className="text-[#670D2F] hover:underline font-medium">
            Sign up here
          </button>
        </p>
      </div>

      {/* Demo Credentials */}
      <div className="mt-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Demo Credentials:</h4>
        <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <p>
            <strong>Email:</strong> john.doe@example.com
          </p>
          <p>
            <strong>Password:</strong> password123
          </p>
        </div>
      </div>
    </div>
  )
}
