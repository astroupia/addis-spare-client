import type { Metadata } from "next"
import { AdminLoginForm } from "./admin-login-form"

export const metadata: Metadata = {
  title: "Admin Login | Addis Spare Parts",
  description: "Secure admin login for Addis Spare Parts marketplace",
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <AdminLoginForm />
      </div>
    </div>
  )
}
