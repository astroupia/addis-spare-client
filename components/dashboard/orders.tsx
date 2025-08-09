"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck } from "lucide-react";
import { OrderHistory } from "@/types/auth";
import Image from "next/image";

interface OrdersProps {
  orders: OrderHistory[];
  formatDate: (date: string) => string;
  getStatusColor: (status: string) => string;
}

export default function Orders({ orders, formatDate, getStatusColor }: OrdersProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{order.order_number}</h3>
                  <p className="text-sm text-gray-500">
                    Ordered on {formatDate(order.order_date)} • {order.items_count} items
                  </p>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  <p className="text-xl font-bold mt-1">${order.total_amount.toFixed(2)}</p>
                </div>
              </div>

              {order.tracking_number && (
                <div className="flex items-center space-x-2 mb-4 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Tracking: {order.tracking_number}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-2 rounded bg-gray-50 dark:bg-gray-800"
                  >
                    <Image
                      width={48}
                      height={48}
                      src={item.image_url || "/placeholder.png"}
                      alt={item.product_name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.product_name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} • ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
