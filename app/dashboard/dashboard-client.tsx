"use client"

import { useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthHeader from "@/components/dashboard/log-into-account";
import { ViewOrderHistory } from "@/components/dashboard/view-order-history";
import { ManageProfileInformation } from "@/components/dashboard/manage-profile";
import { ReviewsTab } from "@/components/dashboard/reviews";
import SavedItems from "@/components/dashboard/saved";
import type { User, OrderHistory, SavedItem } from "@/types/auth";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Heart, Shield, Star, LogOut } from "lucide-react";
import Orders from "@/components/dashboard/orders";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function DashboardClient() {
  const [user, setUser] = useState<User | null>(null);
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [activeTab, setActiveTab] = useState("overview");

  const handleUserLoad = useCallback(
    (userData: User, orders: OrderHistory[], saved: SavedItem[]) => {
      setUser(userData);
      setOrderHistory(orders);
      setSavedItems(saved);
    },
    []
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const { isLoading, handleLogout } = AuthHeader({ onLoadUser: handleUserLoad });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#670D2F] border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {user.avatar_url ? (
                <Image
                  width={64}
                  height={64}
                  src={user.avatar_url}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-white dark:ring-gray-700 shadow-lg"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#670D2F] to-[#3A0519] text-white flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-gray-700">
                  <span className="text-xl font-bold">
                    {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                  </span>
                </div>
              )}
              <span
                className={cn(
                  "absolute bottom-0 right-0 w-4 h-4 rounded-full ring-2 ring-white dark:ring-gray-800",
                  user.status === "active"
                    ? "bg-green-500"
                    : user.status === "suspended" || user.status === "pending"
                    ? "bg-red-500"
                    : "bg-gray-400"
                )}
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold">
                Welcome back, <span className="text-red-950">{user.first_name}!</span>
              </h2>
            </div>
          </div>

          <Button onClick={handleLogout} variant="outline" className="flex items-center space-x-2">
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{orderHistory.length}</p>
                  <p className="text-sm text-gray-500">Total Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/20">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{savedItems.length}</p>
                  <p className="text-sm text-gray-500">Saved Items</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{user.two_factor_enabled ? "ON" : "OFF"}</p>
                  <p className="text-sm text-gray-500">2FA Security</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{user.role.toUpperCase()}</p>
                  <p className="text-sm text-gray-500">Account Type</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="saved">Saved Items</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
         </TabsList>

          <TabsContent value="overview">
            <ViewOrderHistory
              user={user}
              order_history={orderHistory}
              saved_items={savedItems}
              formatDate={formatDate}
              getStatusColor={getStatusColor}
              setActiveTab={setActiveTab}
            />
          </TabsContent>

          <TabsContent value="orders">
            <Orders
              orders={orderHistory}
              formatDate={formatDate}
              getStatusColor={getStatusColor}
            />
          </TabsContent>

          <TabsContent value="saved">
            <SavedItems savedItems={savedItems} formatDate={formatDate} />
          </TabsContent>

          <TabsContent value="profile">
            <ManageProfileInformation user={user} />
          </TabsContent>


          <TabsContent value="reviews">
             <ReviewsTab />
           </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
