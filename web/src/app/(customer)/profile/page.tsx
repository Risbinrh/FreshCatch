'use client';

import { useState } from 'react';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  User,
  MapPin,
  Gift,
  Wallet,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  Edit2,
  Plus,
  Copy,
  Share2,
  Check,
  Phone,
  Mail,
  Globe,
  Trash2,
} from 'lucide-react';
import { MOCK_USER } from '@/lib/mock-data';
import { LANGUAGES } from '@/constants';

export default function ProfilePage() {
  const [user] = useState(MOCK_USER);
  const [copied, setCopied] = useState(false);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(user.referral_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Profile Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.profile_picture} />
                    <AvatarFallback className="text-2xl bg-primary text-white">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">{user.mobile_primary}</p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3">
                    <Badge variant="secondary" className="gap-1">
                      <Wallet className="h-3 w-3" />
                      ₹{user.wallet_balance} Credits
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      🛒 {user.total_orders} Orders
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="info" className="space-y-6">
            <TabsList className="w-full justify-start overflow-auto">
              <TabsTrigger value="info" className="gap-2">
                <User className="h-4 w-4" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="addresses" className="gap-2">
                <MapPin className="h-4 w-4" />
                Addresses
              </TabsTrigger>
              <TabsTrigger value="referrals" className="gap-2">
                <Gift className="h-4 w-4" />
                Referrals
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name
                      </label>
                      <Input value={user.name} readOnly />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Primary Mobile
                      </label>
                      <Input value={user.mobile_primary} readOnly />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Alternative Mobile
                      </label>
                      <Input value={user.mobile_alternative || 'Not added'} readOnly />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </label>
                      <Input value={user.email || 'Not added'} readOnly />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Preferred Language
                      </label>
                      <Input value={LANGUAGES[user.preferred_language]} readOnly />
                    </div>
                  </div>
                  <Button className="mt-4">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Update Information
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Saved Addresses</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Address
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.addresses.map((address) => (
                    <div
                      key={address.id}
                      className="p-4 border rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="capitalize">
                                {address.address_type}
                              </Badge>
                              {address.is_default && (
                                <Badge className="bg-green-500">Default</Badge>
                              )}
                            </div>
                            <p className="font-medium mt-1">{address.full_address}</p>
                            <p className="text-sm text-muted-foreground">
                              {address.landmark && `${address.landmark} • `}
                              {address.city} - {address.pincode}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Referrals Tab */}
            <TabsContent value="referrals">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Referral Code Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Referral Code</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg mb-4">
                      <p className="text-3xl font-bold tracking-wider text-primary">
                        {user.referral_code}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" onClick={copyReferralCode}>
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Code
                          </>
                        )}
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                    <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm">
                      <p className="font-medium mb-1">How it works:</p>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Share your code with friends</li>
                        <li>• They get ₹50 off on first order</li>
                        <li>• You get ₹50 credit when they order</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Referral Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Referral History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">
                          {user.referrals.length}
                        </p>
                        <p className="text-sm text-muted-foreground">Total Referrals</p>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">
                          ₹{user.referrals.filter((r) => r.status === 'credited').length * 50}
                        </p>
                        <p className="text-sm text-muted-foreground">Total Earned</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {user.referrals.map((referral, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                              {referral.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{referral.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(referral.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Badge
                            className={
                              referral.status === 'credited' ? 'bg-green-500' : 'bg-yellow-500'
                            }
                          >
                            {referral.status === 'credited' ? `+₹${referral.earned}` : 'Pending'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div className="text-left">
                          <p className="font-medium">Notifications</p>
                          <p className="text-sm text-muted-foreground">
                            Manage push and email notifications
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">On</Badge>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <div className="text-left">
                          <p className="font-medium">Language</p>
                          <p className="text-sm text-muted-foreground">
                            Change app language
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {LANGUAGES[user.preferred_language]}
                      </Badge>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-muted-foreground" />
                        <div className="text-left">
                          <p className="font-medium">Help & Support</p>
                          <p className="text-sm text-muted-foreground">
                            Get help with your orders
                          </p>
                        </div>
                      </div>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-destructive">
                      <div className="flex items-center gap-3">
                        <LogOut className="h-5 w-5" />
                        <div className="text-left">
                          <p className="font-medium">Logout</p>
                          <p className="text-sm opacity-70">Sign out from your account</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
