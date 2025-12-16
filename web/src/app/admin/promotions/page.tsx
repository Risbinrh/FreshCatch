'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Tag,
  Gift,
  Percent,
  Calendar,
  Users,
  Copy,
  Edit2,
  Trash2,
  MoreVertical,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const MOCK_COUPONS = [
  {
    code: 'FIRST50',
    type: 'flat',
    value: 50,
    min_order: 300,
    usage: 234,
    max_usage: null,
    status: 'active',
    expiry: '2025-01-31',
  },
  {
    code: 'WEEKEND20',
    type: 'percent',
    value: 20,
    min_order: 500,
    usage: 89,
    max_usage: 200,
    status: 'active',
    expiry: '2024-12-31',
  },
  {
    code: 'NEWYEAR100',
    type: 'flat',
    value: 100,
    min_order: 1000,
    usage: 0,
    max_usage: 500,
    status: 'scheduled',
    expiry: '2025-01-15',
  },
  {
    code: 'DIWALI30',
    type: 'percent',
    value: 30,
    min_order: 800,
    usage: 567,
    max_usage: 600,
    status: 'expired',
    expiry: '2024-11-15',
  },
];

const MOCK_REFERRAL_STATS = {
  total_referrals: 456,
  successful: 389,
  pending: 67,
  total_credits: 19450,
};

export default function AdminPromotionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Promotions</h1>
          <p className="text-muted-foreground">Manage coupons and referral program</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Coupon
        </Button>
      </div>

      <Tabs defaultValue="coupons">
        <TabsList>
          <TabsTrigger value="coupons" className="gap-2">
            <Tag className="h-4 w-4" />
            Coupons
          </TabsTrigger>
          <TabsTrigger value="referrals" className="gap-2">
            <Gift className="h-4 w-4" />
            Referral Program
          </TabsTrigger>
        </TabsList>

        <TabsContent value="coupons" className="space-y-6 mt-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-600">4</p>
                <p className="text-sm text-muted-foreground">Active Coupons</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">890</p>
                <p className="text-sm text-muted-foreground">Total Used</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">₹45,670</p>
                <p className="text-sm text-muted-foreground">Discount Given</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-orange-500">1</p>
                <p className="text-sm text-muted-foreground">Scheduled</p>
              </CardContent>
            </Card>
          </div>

          {/* Coupons Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Coupons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium text-muted-foreground">Code</th>
                      <th className="pb-3 font-medium text-muted-foreground">Discount</th>
                      <th className="pb-3 font-medium text-muted-foreground">Min Order</th>
                      <th className="pb-3 font-medium text-muted-foreground">Usage</th>
                      <th className="pb-3 font-medium text-muted-foreground">Expiry</th>
                      <th className="pb-3 font-medium text-muted-foreground">Status</th>
                      <th className="pb-3 font-medium text-muted-foreground text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {MOCK_COUPONS.map((coupon) => (
                      <tr key={coupon.code} className="hover:bg-slate-50">
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <code className="px-2 py-1 bg-slate-100 rounded text-sm font-mono">
                              {coupon.code}
                            </code>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-1">
                            {coupon.type === 'percent' ? (
                              <>
                                <Percent className="h-4 w-4 text-muted-foreground" />
                                <span>{coupon.value}% off</span>
                              </>
                            ) : (
                              <span>₹{coupon.value} off</span>
                            )}
                          </div>
                        </td>
                        <td className="py-4">₹{coupon.min_order}</td>
                        <td className="py-4">
                          <span>{coupon.usage}</span>
                          {coupon.max_usage && (
                            <span className="text-muted-foreground">
                              /{coupon.max_usage}
                            </span>
                          )}
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {new Date(coupon.expiry).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-4">
                          <Badge
                            className={
                              coupon.status === 'active'
                                ? 'bg-green-500'
                                : coupon.status === 'scheduled'
                                ? 'bg-blue-500'
                                : 'bg-slate-400'
                            }
                          >
                            {coupon.status}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuItem>Deactivate</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-6 mt-6">
          {/* Referral Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">{MOCK_REFERRAL_STATS.total_referrals}</p>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-600">
                  {MOCK_REFERRAL_STATS.successful}
                </p>
                <p className="text-sm text-muted-foreground">Successful</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {MOCK_REFERRAL_STATS.pending}
                </p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-primary">
                  ₹{MOCK_REFERRAL_STATS.total_credits.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">Credits Given</p>
              </CardContent>
            </Card>
          </div>

          {/* Referral Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Referral Program Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Referrer Reward</label>
                  <div className="flex gap-2">
                    <Input value="50" className="w-24" />
                    <span className="flex items-center text-muted-foreground">
                      ₹ per successful referral
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Referee Discount</label>
                  <div className="flex gap-2">
                    <Input value="50" className="w-24" />
                    <span className="flex items-center text-muted-foreground">
                      ₹ off on first order
                    </span>
                  </div>
                </div>
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
