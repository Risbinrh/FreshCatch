'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  ChevronRight,
  RefreshCcw,
  Phone,
} from 'lucide-react';
import Link from 'next/link';
import { MOCK_ORDERS } from '@/lib/mock-data';

const ORDER_STATUS_CONFIG = {
  placed: { label: 'Order Placed', color: 'bg-blue-500', icon: Package },
  confirmed: { label: 'Confirmed', color: 'bg-cyan-500', icon: CheckCircle },
  processing: { label: 'Processing', color: 'bg-yellow-500', icon: Clock },
  out_for_delivery: { label: 'Out for Delivery', color: 'bg-orange-500', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-500', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-500', icon: Package },
};

export default function OrdersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active')
      return ['placed', 'confirmed', 'processing', 'out_for_delivery'].includes(order.order_status);
    if (activeTab === 'completed') return order.order_status === 'delivered';
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">My Orders</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredOrders.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h2 className="text-lg font-semibold mb-2">No orders found</h2>
                    <p className="text-muted-foreground mb-4">
                      You haven&apos;t placed any orders yet
                    </p>
                    <Link href="/catalog">
                      <Button>Start Shopping</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                filteredOrders.map((order) => {
                  const statusConfig = ORDER_STATUS_CONFIG[order.order_status];
                  const StatusIcon = statusConfig.icon;

                  return (
                    <Card key={order.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        {/* Order Header */}
                        <div className="flex items-center justify-between p-4 bg-slate-50 border-b">
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="font-semibold">Order #{order.id}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.created_at).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </p>
                            </div>
                          </div>
                          <Badge className={`${statusConfig.color} text-white`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig.label}
                          </Badge>
                        </div>

                        {/* Order Items */}
                        <div className="p-4">
                          <div className="flex gap-4">
                            {/* Product Images */}
                            <div className="flex -space-x-2">
                              {order.items.slice(0, 3).map((item, i) => (
                                <div
                                  key={i}
                                  className="h-16 w-16 rounded-lg bg-gradient-to-br from-sky-50 to-cyan-50 flex items-center justify-center border-2 border-white"
                                >
                                  <span className="text-2xl">
                                    {item.product?.category_id === 'prawns' ? '🦐' : '🐟'}
                                  </span>
                                </div>
                              ))}
                              {order.items.length > 3 && (
                                <div className="h-16 w-16 rounded-lg bg-slate-100 flex items-center justify-center border-2 border-white">
                                  <span className="text-sm font-medium">
                                    +{order.items.length - 3}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Order Details */}
                            <div className="flex-1">
                              <p className="font-medium">
                                {order.items.map((item) => item.product?.name_english).filter(Boolean).join(', ')}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {order.items.length} items • {order.items.reduce((sum, item) => sum + item.quantity, 0)} kg
                              </p>

                              {/* Delivery Info */}
                              <div className="flex items-center gap-4 mt-2 text-sm">
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  <span>{order.delivery_slot.time}</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <MapPin className="h-4 w-4" />
                                  <span>{order.address?.city}</span>
                                </div>
                              </div>
                            </div>

                            {/* Price & Actions */}
                            <div className="text-right">
                              <p className="text-lg font-bold text-primary">
                                ₹{order.total_amount}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {order.payment_method.toUpperCase()}
                              </p>
                            </div>
                          </div>

                          {/* Live Tracking for Active Orders */}
                          {order.order_status === 'out_for_delivery' && order.delivery_partner && (
                            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
                                    {order.delivery_partner.name.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-medium">{order.delivery_partner.name}</p>
                                    <p className="text-sm text-green-700">
                                      Arriving in {order.tracking?.eta}
                                    </p>
                                  </div>
                                </div>
                                <Button variant="outline" size="sm" className="gap-1">
                                  <Phone className="h-4 w-4" />
                                  Call
                                </Button>
                              </div>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex items-center justify-between mt-4 pt-4 border-t">
                            <div className="flex gap-2">
                              {order.order_status === 'delivered' && (
                                <Button variant="outline" size="sm" className="gap-1">
                                  <RefreshCcw className="h-4 w-4" />
                                  Reorder
                                </Button>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-1"
                              onClick={() => router.push(`/orders/${order.id}`)}
                            >
                              View Details
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
