'use client';

import { useParams } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  ChevronLeft,
  Copy,
  Download,
  RefreshCcw,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';
import { MOCK_ORDERS } from '@/lib/mock-data';

export default function OrderDetailPage() {
  const params = useParams();
  const order = MOCK_ORDERS.find((o) => o.id === params.id) || MOCK_ORDERS[0];

  const ORDER_TIMELINE = [
    {
      status: 'placed',
      label: 'Order Placed',
      description: 'Your order has been placed successfully',
      time: '10:30 AM',
      completed: true,
    },
    {
      status: 'confirmed',
      label: 'Order Confirmed',
      description: 'Seller has confirmed your order',
      time: '10:35 AM',
      completed: ['confirmed', 'processing', 'out_for_delivery', 'delivered'].includes(order.order_status),
    },
    {
      status: 'processing',
      label: 'Processing',
      description: 'Your order is being prepared',
      time: '11:00 AM',
      completed: ['processing', 'out_for_delivery', 'delivered'].includes(order.order_status),
    },
    {
      status: 'out_for_delivery',
      label: 'Out for Delivery',
      description: 'Order is on the way',
      time: '3:30 PM',
      completed: ['out_for_delivery', 'delivered'].includes(order.order_status),
    },
    {
      status: 'delivered',
      label: 'Delivered',
      description: 'Order delivered successfully',
      time: '4:15 PM',
      completed: order.order_status === 'delivered',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link href="/orders" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Orders
          </Link>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Order Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-xl font-bold">Order #{order.id}</h1>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-muted-foreground">
                        Placed on{' '}
                        {new Date(order.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <Badge
                      className={`text-white ${
                        order.order_status === 'delivered'
                          ? 'bg-green-500'
                          : order.order_status === 'out_for_delivery'
                          ? 'bg-orange-500'
                          : 'bg-blue-500'
                      }`}
                    >
                      {order.order_status === 'out_for_delivery'
                        ? 'Out for Delivery'
                        : order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Live Tracking */}
              {order.order_status === 'out_for_delivery' && order.delivery_partner && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold text-lg">
                          {order.delivery_partner.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold">{order.delivery_partner.name}</p>
                          <p className="text-sm text-green-700">Delivery Partner</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-1">
                          <Phone className="h-4 w-4" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <MessageCircle className="h-4 w-4" />
                          Chat
                        </Button>
                      </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="h-48 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <Truck className="h-12 w-12 text-green-600 mx-auto mb-2" />
                        <p className="font-semibold text-green-800">
                          Arriving in {order.tracking?.eta}
                        </p>
                        <p className="text-sm text-green-600">Live tracking enabled</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-600" />
                        <span>Order is 2.5 km away</span>
                      </div>
                      <Button variant="link" className="text-green-700 p-0">
                        View on Map
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Order Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-0">
                    {ORDER_TIMELINE.map((step, index) => (
                      <div key={step.status} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              step.completed
                                ? 'bg-green-500 text-white'
                                : 'bg-slate-200 text-slate-400'
                            }`}
                          >
                            {step.completed ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : (
                              <Clock className="h-4 w-4" />
                            )}
                          </div>
                          {index < ORDER_TIMELINE.length - 1 && (
                            <div
                              className={`w-0.5 h-12 ${
                                step.completed ? 'bg-green-500' : 'bg-slate-200'
                              }`}
                            />
                          )}
                        </div>
                        <div className="pb-8">
                          <p className={`font-medium ${!step.completed && 'text-muted-foreground'}`}>
                            {step.label}
                          </p>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                          {step.completed && (
                            <p className="text-xs text-muted-foreground mt-1">{step.time}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {index > 0 && <Separator className="my-4" />}
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-sky-50 to-cyan-50 flex items-center justify-center">
                          <span className="text-3xl">
                            {item.product?.category_id === 'prawns' ? '🦐' : '🐟'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product?.name_english}</h4>
                          <p className="text-sm text-muted-foreground">{item.product?.name_tamil}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {item.cleaning_type}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {item.quantity} {item.unit}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{item.total_price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4">
              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{order.address?.full_address}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.address?.landmark}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.address?.city} - {order.address?.pincode}
                  </p>
                </CardContent>
              </Card>

              {/* Delivery Slot */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Delivery Slot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{order.delivery_slot.name}</p>
                  <p className="text-sm text-muted-foreground">{order.delivery_slot.time}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {new Date(order.delivery_date).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })}
                  </p>
                </CardContent>
              </Card>

              {/* Payment Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{order.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className={order.delivery_charge === 0 ? 'text-green-600' : ''}>
                      {order.delivery_charge === 0 ? 'FREE' : `₹${order.delivery_charge}`}
                    </span>
                  </div>
                  {order.discount_amount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-₹{order.discount_amount}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{order.total_amount}</span>
                  </div>
                  <div className="pt-2">
                    <Badge variant="secondary">
                      {order.payment_method.toUpperCase()} •{' '}
                      {order.payment_status === 'paid' ? 'Paid' : 'Pending'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-2">
                {order.order_status === 'delivered' && (
                  <Button className="w-full gap-2">
                    <RefreshCcw className="h-4 w-4" />
                    Reorder
                  </Button>
                )}
                <Button variant="outline" className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Download Invoice
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Need Help?
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
