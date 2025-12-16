'use client';

import { useState } from 'react';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Clock,
  CreditCard,
  Smartphone,
  Wallet,
  Banknote,
  Check,
  Plus,
  ChevronRight,
  Shield,
  Edit2,
} from 'lucide-react';
import Link from 'next/link';
import { MOCK_CART, MOCK_USER } from '@/lib/mock-data';
import { DELIVERY_SLOTS } from '@/constants';

export default function CheckoutPage() {
  const [selectedAddress, setSelectedAddress] = useState(MOCK_USER.addresses[0].id);
  const [selectedSlot, setSelectedSlot] = useState('morning');
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [deliveryDate, setDeliveryDate] = useState('today');

  const cart = MOCK_CART;
  const subtotal = cart.items.reduce((sum, item) => sum + item.total_price, 0);
  const deliveryCharge = subtotal >= 300 ? 0 : 30;
  const total = subtotal + deliveryCharge - cart.discount_amount;

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
    { id: 'wallet', name: 'Wallet', icon: Wallet, description: 'Paytm, Amazon Pay' },
    { id: 'cod', name: 'Cash on Delivery', icon: Banknote, description: 'Pay when you receive' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                  <Check className="h-4 w-4" />
                </div>
                <span className="ml-2 font-medium">Cart</span>
              </div>
              <div className="w-12 h-0.5 bg-primary mx-2" />
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                  2
                </div>
                <span className="ml-2 font-medium">Checkout</span>
              </div>
              <div className="w-12 h-0.5 bg-slate-200 mx-2" />
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
                  3
                </div>
                <span className="ml-2 text-muted-foreground">Payment</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Delivery Address</CardTitle>
                    </div>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add New
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {MOCK_USER.addresses.map((address) => (
                    <div
                      key={address.id}
                      onClick={() => setSelectedAddress(address.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedAddress === address.id
                          ? 'border-primary bg-primary/5'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div
                            className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                              selectedAddress === address.id
                                ? 'border-primary'
                                : 'border-slate-300'
                            }`}
                          >
                            {selectedAddress === address.id && (
                              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {address.address_type}
                              </Badge>
                              {address.is_default && (
                                <Badge className="text-xs bg-green-500">Default</Badge>
                              )}
                            </div>
                            <p className="font-medium mt-1">{address.full_address}</p>
                            <p className="text-sm text-muted-foreground">
                              {address.landmark} • {address.city} - {address.pincode}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Delivery Time */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Delivery Time</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Date Selection */}
                  <div>
                    <p className="text-sm font-medium mb-2">Select Date</p>
                    <div className="flex gap-2">
                      {[
                        { id: 'today', label: 'Today', date: new Date().toLocaleDateString() },
                        {
                          id: 'tomorrow',
                          label: 'Tomorrow',
                          date: new Date(Date.now() + 86400000).toLocaleDateString(),
                        },
                      ].map((d) => (
                        <Button
                          key={d.id}
                          variant={deliveryDate === d.id ? 'default' : 'outline'}
                          onClick={() => setDeliveryDate(d.id)}
                          className="flex-1"
                        >
                          <div className="text-center">
                            <div className="font-medium">{d.label}</div>
                            <div className="text-xs opacity-70">{d.date}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slot Selection */}
                  <div>
                    <p className="text-sm font-medium mb-2">Select Time Slot</p>
                    <div className="grid grid-cols-2 gap-3">
                      {DELIVERY_SLOTS.map((slot) => (
                        <div
                          key={slot.id}
                          onClick={() => setSelectedSlot(slot.id)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                            selectedSlot === slot.id
                              ? 'border-primary bg-primary/5'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{slot.icon}</span>
                            <div>
                              <p className="font-medium text-sm">{slot.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {slot.start_time} - {slot.end_time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Payment Method</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedPayment === method.id
                          ? 'border-primary bg-primary/5'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                            selectedPayment === method.id
                              ? 'border-primary'
                              : 'border-slate-300'
                          }`}
                        >
                          {selectedPayment === method.id && (
                            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                          )}
                        </div>
                        <method.icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items Summary */}
                  <div className="space-y-3">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span>{item.product.name_english}</span>
                          <Badge variant="secondary" className="text-xs">
                            {item.quantity} {item.unit}
                          </Badge>
                        </div>
                        <span>₹{item.total_price}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className={deliveryCharge === 0 ? 'text-green-600' : ''}>
                        {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                      </span>
                    </div>
                    {cart.discount_amount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount (FIRST50)</span>
                        <span>-₹{cart.discount_amount}</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">₹{total}</span>
                  </div>

                  {/* Delivery Info Summary */}
                  <div className="p-3 bg-slate-50 rounded-lg text-sm space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {MOCK_USER.addresses.find((a) => a.id === selectedAddress)?.full_address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {deliveryDate === 'today' ? 'Today' : 'Tomorrow'},{' '}
                        {DELIVERY_SLOTS.find((s) => s.id === selectedSlot)?.start_time} -{' '}
                        {DELIVERY_SLOTS.find((s) => s.id === selectedSlot)?.end_time}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full h-12 text-lg">
                    Place Order - ₹{total}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Secure payment powered by Razorpay</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
