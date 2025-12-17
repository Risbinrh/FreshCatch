'use client';

import { useState } from 'react';
import Image from 'next/image';
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
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { language, t } = useLanguage();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  // Function to get emoji based on product name or default to fish
  const getProductEmoji = (item: any) => {
    if (!item.name && !item.nameTamil) return '🐟';
    const name = (item.name || '').toLowerCase();
    const nameTamil = item.nameTamil || '';
    if (name.includes('prawn') || nameTamil.includes('இறால்')) return '🦐';
    if (name.includes('crab') || nameTamil.includes('நண்டு')) return '🦀';
    if (name.includes('squid') || nameTamil.includes('கணவாய்')) return '🦑';
    return '🐟';
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'FIRST50') {
      setAppliedCoupon('FIRST50');
      setDiscountAmount(50);
      setCouponCode('');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon('');
    setDiscountAmount(0);
  };

  const deliveryCharge = subtotal >= 300 ? 0 : 30;
  const total = subtotal + deliveryCharge - discountAmount;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">
            {t('Shopping Cart', 'கூடை')}
          </h1>

          {items.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  {t('Your cart is empty', 'உங்கள் கூடை காலியாக உள்ளது')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t("Looks like you haven't added any fish yet", 'நீங்கள் இன்னும் மீன் சேர்க்கவில்லை')}
                </p>
                <Link href="/catalog">
                  <Button>
                    {t('Browse Catalog', 'பட்டியலை பார்க்கவும்')}
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
                        {t('Cart Items', 'கூடை பொருட்கள்')} ({itemCount})
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={clearCart}
                      >
                        {t('Clear All', 'அனைத்தையும் நீக்கு')}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {items.map((item, index) => (
                      <div key={item.id}>
                        {index > 0 && <Separator className="my-4" />}
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-sky-50 to-cyan-50 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-contain p-2"
                              />
                            ) : (
                              <span className="text-4xl">{getProductEmoji(item)}</span>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <Link
                                  href={`/catalog/${item.productId}`}
                                  className="font-semibold hover:text-primary"
                                >
                                  {language === 'en' ? item.name : item.nameTamil}
                                </Link>
                                <p className="text-sm text-muted-foreground">
                                  {language === 'en' ? item.nameTamil : item.name}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary" className="text-xs">
                                {language === 'en' ? item.cleaningOption.name : item.cleaningOption.name_tamil}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                ₹{item.price + item.cleaningOption.price_modifier}/{item.unit}
                              </span>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              {/* Quantity Control */}
                              <div className="flex items-center border rounded-lg">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity - 0.5)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-16 text-center text-sm font-medium">
                                  {item.quantity} {item.unit === 'kg' ? 'kg' : 'pc'}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity + 0.5)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>

                              <p className="font-bold text-lg">₹{item.totalPrice.toFixed(2)}</p>
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
                      <span className="font-medium">{t('Apply Coupon', 'கூப்பன் பயன்படுத்தவும்')}</span>
                    </div>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Gift className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium text-green-800">{appliedCoupon} {t('applied', 'பயன்படுத்தப்பட்டது')}</p>
                            <p className="text-sm text-green-600">{t('You save', 'நீங்கள் சேமிக்கிறீர்கள்')} ₹{discountAmount}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeCoupon}
                        >
                          {t('Remove', 'நீக்கு')}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          placeholder={t('Enter coupon code', 'கூப்பன் குறியீட்டை உள்ளிடவும்')}
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        />
                        <Button onClick={applyCoupon}>{t('Apply', 'பயன்படுத்து')}</Button>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      {t('Try: FIRST50 for ₹50 off on your first order', 'முயற்சிக்கவும்: FIRST50 முதல் ஆர்டருக்கு ₹50 தள்ளுபடி')}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="space-y-4">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>{t('Order Summary', 'ஆர்டர் சுருக்கம்')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t('Subtotal', 'துணை மொத்தம்')}</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t('Delivery', 'டெலிவரி')}</span>
                        <span className={deliveryCharge === 0 ? 'text-green-600' : ''}>
                          {deliveryCharge === 0 ? t('FREE', 'இலவசம்') : `₹${deliveryCharge}`}
                        </span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>{t('Discount', 'தள்ளுபடி')}</span>
                          <span>-₹{discountAmount}</span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                      <span>{t('Total', 'மொத்தம்')}</span>
                      <span className="text-primary">₹{total.toFixed(2)}</span>
                    </div>

                    {subtotal < 300 && (
                      <div className="p-3 bg-orange-50 rounded-lg text-sm">
                        <p className="text-orange-800">
                          {t(`Add ₹${(300 - subtotal).toFixed(0)} more for FREE delivery!`, `இலவச டெலிவரிக்கு மேலும் ₹${(300 - subtotal).toFixed(0)} சேர்க்கவும்!`)}
                        </p>
                        <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full transition-all"
                            style={{ width: `${Math.min((subtotal / 300) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <Link href="/checkout">
                      <Button className="w-full h-12 text-lg">
                        {t('Proceed to Checkout', 'செக்அவுட் செல்லவும்')}
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>

                    {/* Delivery Info */}
                    <div className="pt-4 space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Truck className="h-4 w-4" />
                        <span>{t('Free delivery on orders above ₹300', '₹300க்கு மேல் ஆர்டருக்கு இலவச டெலிவரி')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{t('Sunrise delivery available (6 AM - 8 AM)', 'சூரிய உதய டெலிவரி கிடைக்கும் (காலை 6 - 8)')}</span>
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
