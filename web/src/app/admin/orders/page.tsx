'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  Download,
  Phone,
  MapPin,
} from 'lucide-react';
import { MOCK_ORDERS } from '@/lib/mock-data';

const ORDER_STATUS_CONFIG = {
  placed: { label: 'New', color: 'bg-blue-500', icon: Package },
  confirmed: { label: 'Confirmed', color: 'bg-cyan-500', icon: CheckCircle },
  processing: { label: 'Processing', color: 'bg-yellow-500', icon: Clock },
  out_for_delivery: { label: 'Out for Delivery', color: 'bg-orange-500', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-500', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-500', icon: XCircle },
};

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.address.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'active' &&
        ['placed', 'confirmed', 'processing', 'out_for_delivery'].includes(
          order.order_status
        )) ||
      (activeTab === 'completed' && order.order_status === 'delivered') ||
      order.order_status === activeTab;
    return matchesSearch && matchesTab;
  });

  const orderCounts = {
    all: MOCK_ORDERS.length,
    placed: MOCK_ORDERS.filter((o) => o.order_status === 'placed').length,
    processing: MOCK_ORDERS.filter((o) => o.order_status === 'processing').length,
    out_for_delivery: MOCK_ORDERS.filter((o) => o.order_status === 'out_for_delivery')
      .length,
    delivered: MOCK_ORDERS.filter((o) => o.order_status === 'delivered').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Manage and track all orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'New', count: orderCounts.placed, color: 'bg-blue-100 text-blue-700' },
          {
            label: 'Processing',
            count: orderCounts.processing,
            color: 'bg-yellow-100 text-yellow-700',
          },
          {
            label: 'Out for Delivery',
            count: orderCounts.out_for_delivery,
            color: 'bg-orange-100 text-orange-700',
          },
          {
            label: 'Delivered',
            count: orderCounts.delivered,
            color: 'bg-green-100 text-green-700',
          },
          { label: 'Total', count: orderCounts.all, color: 'bg-slate-100 text-slate-700' },
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{stat.count}</p>
              <Badge className={stat.color}>{stat.label}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters & Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID, customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 border rounded-lg text-sm bg-white">
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader className="pb-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All ({orderCounts.all})</TabsTrigger>
              <TabsTrigger value="placed">New ({orderCounts.placed})</TabsTrigger>
              <TabsTrigger value="processing">
                Processing ({orderCounts.processing})
              </TabsTrigger>
              <TabsTrigger value="out_for_delivery">
                Delivering ({orderCounts.out_for_delivery})
              </TabsTrigger>
              <TabsTrigger value="delivered">
                Delivered ({orderCounts.delivered})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-muted-foreground">Order ID</th>
                  <th className="pb-3 font-medium text-muted-foreground">Customer</th>
                  <th className="pb-3 font-medium text-muted-foreground">Items</th>
                  <th className="pb-3 font-medium text-muted-foreground">Delivery</th>
                  <th className="pb-3 font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 font-medium text-muted-foreground">Amount</th>
                  <th className="pb-3 font-medium text-muted-foreground text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredOrders.map((order) => {
                  const status = ORDER_STATUS_CONFIG[order.order_status];
                  const StatusIcon = status.icon;
                  return (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="py-4">
                        <p className="font-medium">#{order.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                            C
                          </div>
                          <div>
                            <p className="text-sm font-medium">Customer</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {order.address.city}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {order.items.slice(0, 2).map((item, i) => (
                              <div
                                key={i}
                                className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white"
                              >
                                <span className="text-sm">🐟</span>
                              </div>
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {order.items.length} items
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="text-sm">{order.delivery_slot.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.delivery_slot.time}
                        </p>
                      </td>
                      <td className="py-4">
                        <Badge className={`${status.color} text-white text-xs gap-1`}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <p className="font-medium">₹{order.total_amount}</p>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            order.payment_status === 'paid'
                              ? 'text-green-600'
                              : 'text-orange-600'
                          }`}
                        >
                          {order.payment_method.toUpperCase()} •{' '}
                          {order.payment_status === 'paid' ? 'Paid' : 'Pending'}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Update Status</DropdownMenuItem>
                              <DropdownMenuItem>Assign Delivery</DropdownMenuItem>
                              <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Cancel Order
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium">No orders found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing 1-{filteredOrders.length} of {filteredOrders.length} orders
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
