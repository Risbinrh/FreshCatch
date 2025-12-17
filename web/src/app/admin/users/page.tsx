'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Download,
  UserPlus,
  Users,
  UserCheck,
  Crown,
} from 'lucide-react';

// Mock users data
const MOCK_USERS = [
  {
    id: '1',
    name: 'Priya Sharma',
    phone: '+91 98765 43210',
    email: 'priya@email.com',
    city: 'T. Nagar, Chennai',
    total_orders: 23,
    total_spent: 15670,
    status: 'active',
    joined: '2024-01-15',
    last_order: '2024-12-14',
  },
  {
    id: '2',
    name: 'Rajan Kumar',
    phone: '+91 98765 43211',
    email: 'rajan@email.com',
    city: 'Adyar, Chennai',
    total_orders: 45,
    total_spent: 34500,
    status: 'active',
    joined: '2023-11-20',
    last_order: '2024-12-13',
    is_premium: true,
  },
  {
    id: '3',
    name: 'Lakshmi M',
    phone: '+91 98765 43212',
    email: 'lakshmi@email.com',
    city: 'Velachery, Chennai',
    total_orders: 8,
    total_spent: 4200,
    status: 'active',
    joined: '2024-06-10',
    last_order: '2024-12-10',
  },
  {
    id: '4',
    name: 'Kumar S',
    phone: '+91 98765 43213',
    email: null,
    city: 'Anna Nagar, Chennai',
    total_orders: 3,
    total_spent: 1850,
    status: 'inactive',
    joined: '2024-09-05',
    last_order: '2024-10-20',
  },
  {
    id: '5',
    name: 'Anitha R',
    phone: '+91 98765 43214',
    email: 'anitha@email.com',
    city: 'Porur, Chennai',
    total_orders: 15,
    total_spent: 12300,
    status: 'active',
    joined: '2024-03-22',
    last_order: '2024-12-12',
  },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredUsers = MOCK_USERS.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery) ||
      user.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'active' && user.status === 'active') ||
      (activeTab === 'inactive' && user.status === 'inactive') ||
      (activeTab === 'premium' && user.is_premium);
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage your customer base</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Customers', count: 1247, icon: Users, color: 'bg-blue-500' },
          { label: 'Active', count: 1089, icon: UserCheck, color: 'bg-green-500' },
          { label: 'Premium', count: 156, icon: Crown, color: 'bg-purple-500' },
          { label: 'New This Month', count: 67, icon: UserPlus, color: 'bg-orange-500' },
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.count}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
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
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 border rounded-lg text-sm bg-white">
                <option value="">All Locations</option>
                <option value="chennai">Chennai</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader className="pb-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Customers</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-muted-foreground">Customer</th>
                  <th className="pb-3 font-medium text-muted-foreground">Contact</th>
                  <th className="pb-3 font-medium text-muted-foreground">Location</th>
                  <th className="pb-3 font-medium text-muted-foreground">Orders</th>
                  <th className="pb-3 font-medium text-muted-foreground">Total Spent</th>
                  <th className="pb-3 font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 font-medium text-muted-foreground text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{user.name}</p>
                            {user.is_premium && (
                              <Badge className="bg-purple-500 text-xs">
                                <Crown className="h-3 w-3 mr-1" />
                                Premium
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Joined {new Date(user.joined).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="space-y-1">
                        <p className="text-sm flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          {user.phone}
                        </p>
                        {user.email && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="text-sm flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {user.city}
                      </p>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        <span>{user.total_orders}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="font-medium">₹{user.total_spent.toLocaleString()}</p>
                    </td>
                    <td className="py-4">
                      <Badge
                        className={
                          user.status === 'active' ? 'bg-green-500' : 'bg-slate-400'
                        }
                      >
                        {user.status}
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
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>View Orders</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuItem>Add to Premium</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing 1-{filteredUsers.length} of {filteredUsers.length} customers
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
