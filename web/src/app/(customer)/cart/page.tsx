'use client';

import { useState } from 'react';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Tag,
  ChevronRight,
  Truck,
  Clock,
  ArrowRight,
  Gift,
} from 'lucide-react';
import Link from 'next/link';
import { MOCK_CART } from '@/lib/mock-data';

export default function CartPage() {
  const [cart, setCart] = useState(MOCK_CART);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(cart.coupon_code);

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: Math.max(0.5, item.quantity + delta * 0.5),
              total_price: item.unit_price * Math.max(0.5, item.quantity + delta * 0.5),
            }
          : item
      ),
    }));
  };

  const removeItem = (itemId: string) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== itemId),
    }));
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'FIRST50') {
      setAppliedCoupon('FIRST50');
      setCart((prev) => ({ ...prev, discount_amount: 50 }));
    }
  };

  const subtotal = cart.items.reduce((sum, item) => sum + item.total_price, 0);
  const deliveryCharge = subtotal >= 300 ? 0 : 30;
  const total = subtotal + deliveryCharge - cart.discount_amount;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header cartItemCount={cart.items.length} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

          {cart.items.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">
                  Looks like you haven&apos;t added any fish yet
                </p>
                <Link href="/catalog">
                  <Button>
                    Browse Catalog
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Cart Items ({cart.items.length})
                      </CardTitle>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        Clear All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cart.items.map((item, index) => (
                      <div key={item.id}>
                        {index > 0 && <Separator className="my-4" />}
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-sky-50 to-cyan-50 flex items-center justify-center flex-shrink-0">
                            <span className="text-4xl">
                              {item.product.category_id === 'prawns' ? '🦐' : '🐟'}
                            </span>
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <Link
                                  href={`/catalog/${item.product.id}`}
                                  className="font-semibold hover:text-primary"
                                >
                                  {item.product.name_english}
                                </Link>
                                <p className="text-sm text-muted-foreground">
                                  {item.product.name_tamil}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary" className="text-xs">
                                {item.cleaning_type}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                ₹{item.unit_price}/{item.unit}
                              </span>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              {/* Quantity Control */}
                              <div className="flex items-center border rounded-lg">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, -1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-16 text-center text-sm font-medium">
                                  {item.quantity} {item.unit}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>

                              <p className="font-bold text-lg">₹{item.total_price}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Coupon Section */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="h-5 w-5 text-primary" />
                      <span className="font-medium">Apply Coupon</span>
                    </div>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Gift className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium text-green-800">{appliedCoupon} applied</p>
                            <p className="text-sm text-green-600">You save ₹{cart.discount_amount}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setAppliedCoupon('');
                            setCart((prev) => ({ ...prev, discount_amount: 0 }));
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button onClick={applyCoupon}>Apply</Button>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Try: FIRST50 for ₹50 off on your first order
                    </p>
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
                          <span>Discount</span>
                          <span>-₹{cart.discount_amount}</span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">₹{total}</span>
                    </div>

                    {subtotal < 300 && (
                      <div className="p-3 bg-orange-50 rounded-lg text-sm">
                        <p className="text-orange-800">
                          Add ₹{300 - subtotal} more for FREE delivery!
                        </p>
                        <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: `${(subtotal / 300) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <Link href="/checkout">
                      <Button className="w-full h-12 text-lg">
                        Proceed to Checkout
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>

                    {/* Delivery Info */}
                    <div className="pt-4 space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Truck className="h-4 w-4" />
                        <span>Free delivery on orders above ₹300</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Sunrise delivery available (6 AM - 8 AM)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
