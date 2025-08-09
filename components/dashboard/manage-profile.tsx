import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, User, Bell } from "lucide-react"
import type { User as UserType } from "@/types/auth"

export function ManageProfileInformation({ user }: { user: UserType }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Personal Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <p>{user.first_name} {user.last_name}</p>
          </div>
          <div>
            <Label>Email Address</Label>
            <p>{user.email}</p>
          </div>
          {user.phone && (
            <div>
              <Label>Phone Number</Label>
              <p>{user.phone}</p>
            </div>
          )}
          <div>
            <Label>Account Status</Label>
            <Badge className="ml-2 bg-green-100 text-green-800">{user.status}</Badge>
          </div>
          <Button variant="outline" className="w-full">
            <Settings className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Language</Label>
            <p>{user.preferences?.language?.toUpperCase() ?? "N/A"}</p>
          </div>
          <div>
            <Label>Currency</Label>
            <p>{user.preferences?.currency ?? "N/A"}</p>
          </div>
          <div>
            <Label>Theme</Label>
            <p className="capitalize">{user.preferences?.theme ?? "N/A"}</p>
          </div>
          <div>
            <Label>Notifications</Label>
            <div className="space-y-2 mt-2">
              {["email", "sms", "push"].map((type) => (
                <div key={type} className="flex justify-between">
                  <span className="text-sm capitalize">{type}</span>
                  <Badge
                    className={
                      user.preferences?.notifications?.[type as keyof typeof user.preferences.notifications]
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {user.preferences?.notifications?.[type as keyof typeof user.preferences.notifications]
                      ? "On"
                      : "Off"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <Settings className="h-4 w-4 mr-2" />
            Update Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium">{children}</label>
}
