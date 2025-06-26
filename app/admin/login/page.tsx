import type { Metadata } from "next"
import { AdminLoginForm } from "./admin-login-form"

export const metadata: Metadata = {
  title: "Admin Login | Addis Spare Parts",
  description: "Secure admin login for managing the marketplace",
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        <AdminLoginForm />
      </div>
    </main>
  )
}
