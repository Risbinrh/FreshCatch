'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ShoppingBag,
  Users,
  IndianRupee,
  TrendingUp,
  Package,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Truck,
  CheckCircle,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import { ADMIN_STATS, MOCK_ORDERS } from '@/lib/mock-data';

const STAT_CARDS = [
  {
    title: "Today's Orders",
    value: ADMIN_STATS.today.orders,
    change: '+12%',
    trend: 'up',
    icon: ShoppingBag,
    color: 'bg-blue-500',
  },
  {
    title: "Today's Revenue",
    value: `₹${ADMIN_STATS.today.revenue.toLocaleString()}`,
    change: '+8%',
    trend: 'up',
    icon: IndianRupee,
    color: 'bg-green-500',
  },
  {
    title: 'New Customers',
    value: ADMIN_STATS.today.new_customers,
    change: '+23%',
    trend: 'up',
    icon: Users,
    color: 'bg-purple-500',
  },
  {
    title: 'Avg Order Value',
    value: `₹${ADMIN_STATS.today.avg_order_value}`,
    change: '-3%',
    trend: 'down',
    icon: TrendingUp,
    color: 'bg-orange-500',
  },
];

const ORDER_STATUS_CONFIG = {
  placed: { label: 'New', color: 'bg-blue-500', icon: Package },
  confirmed: { label: 'Confirmed', color: 'bg-cyan-500', icon: CheckCircle },
  processing: { label: 'Processing', color: 'bg-yellow-500', icon: Clock },
  out_for_delivery: { label: 'Delivering', color: 'bg-orange-500', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-500', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-500', icon: AlertTriangle },
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Download Report</Button>
          <Button>
            <ShoppingBag className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div
                  className={`flex items-center text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.change}
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 font-medium text-muted-foreground">Order ID</th>
                    <th className="pb-3 font-medium text-muted-foreground">Items</th>
                    <th className="pb-3 font-medium text-muted-foreground">Customer</th>
                    <th className="pb-3 font-medium text-muted-foreground">Status</th>
                    <th className="pb-3 font-medium text-muted-foreground">Amount</th>
                    <th className="pb-3 font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {MOCK_ORDERS.map((order) => {
                    const status = ORDER_STATUS_CONFIG[order.order_status];
                    return (
                      <tr key={order.id} className="hover:bg-slate-50">
                        <td className="py-3 font-medium">#{order.id}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {order.items.slice(0, 2).map((item, i) => (
                                <div
                                  key={i}
                                  className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white overflow-hidden"
                                >
                                  {item.product.images?.[0] ? (
                                    <Image
                                      src={item.product.images[0]}
                                      alt={item.product.name_english}
                                      width={32}
                                      height={32}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <span className="text-sm">🐟</span>
                                  )}
                                </div>
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {order.items.length} items
                            </span>
                          </div>
                        </td>
                        <td className="py-3">
                          <div>
                            <p className="font-medium text-sm">Customer</p>
                            <p className="text-xs text-muted-foreground">
                              {order.address?.city}
                            </p>
                          </div>
                        </td>
                        <td className="py-3">
                          <Badge className={`${status.color} text-white text-xs`}>
                            {status.label}
                          </Badge>
                        </td>
                        <td className="py-3 font-medium">₹{order.total_amount}</td>
                        <td className="py-3">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats & Alerts */}
        <div className="space-y-6">
          {/* Order Status Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'New Orders', count: 8, color: 'bg-blue-500' },
                { label: 'Processing', count: 12, color: 'bg-yellow-500' },
                { label: 'Out for Delivery', count: 15, color: 'bg-orange-500' },
                { label: 'Delivered Today', count: 23, color: 'bg-green-500' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${item.color}`} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <span className="font-semibold">{item.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Low Stock Alert */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-orange-800">
                <AlertTriangle className="h-5 w-5" />
                Low Stock Alert
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ADMIN_STATS.low_stock.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-white rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {item.product.images?.[0] ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name_english}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xl">🐟</span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.product.name_english}</p>
                      <p className="text-xs text-muted-foreground">
                        Only {item.stock} kg left
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Restock
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Selling Products */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Selling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ADMIN_STATS.top_products.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {item.product.images?.[0] ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name_english}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xl">🐟</span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.product.name_english}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.sold} sold this week
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">#{index + 1}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
