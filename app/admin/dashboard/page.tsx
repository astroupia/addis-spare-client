import type { Metadata } from "next"
import { AdminDashboardClient } from "./admin-dashboard-client"

export const metadata: Metadata = {
  title: "Admin Dashboard | Addis Spare Parts",
  description: "Admin dashboard for managing users, products, and orders",
}

export default function AdminDashboardPage() {
  return <AdminDashboardClient />
}
