// app/dashboard/page.tsx
import type { Metadata } from "next"
import DashboardClient from "./dashboard-client" // direct import with no dynamic()

export const metadata: Metadata = {
  title: "Dashboard | Addis Spare Parts",
  description: "Manage your account, orders, and preferences",
}

export default function DashboardPage() {
  return <DashboardClient />
}
