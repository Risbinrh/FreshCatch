'use client';

import { useState } from 'react';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Truck,
  Clock,
  ShieldCheck,
  Leaf,
  Star,
  MapPin,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { FISH_CATEGORIES, DELIVERY_SLOTS } from '@/constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { AddToCartDialog } from '@/components/common/AddToCartDialog';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

// Get first 4 products as featured
const FEATURED_PRODUCTS = MOCK_PRODUCTS.slice(0, 4);

export default function HomePage() {
  const { language, t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<typeof FEATURED_PRODUCTS[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddClick = (product: typeof FEATURED_PRODUCTS[0]) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  // Features with bilingual content
  const FEATURES = [
    {
      icon: Leaf,
      title: t('Farm Fresh', 'புதிய மீன்'),
      description: t('Directly sourced from fishermen', 'மீனவர்களிடம் இருந்து நேரடியாக'),
    },
    {
      icon: Clock,
      title: t('Sunrise Delivery', 'சூரிய உதய டெலிவரி'),
      description: t('Get fresh fish by 6 AM', 'காலை 6 மணிக்குள் புதிய மீன்'),
    },
    {
      icon: Truck,
      title: t('Free Delivery', 'இலவச டெலிவரி'),
      description: t('On orders above ₹300', '₹300க்கு மேல் ஆர்டர்களுக்கு'),
    },
    {
      icon: ShieldCheck,
      title: t('Quality Assured', 'தர உத்தரவாதம்'),
      description: t('100% freshness guarantee', '100% புதிய உத்தரவாதம்'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative gradient-ocean text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-2xl">
              <Badge className="bg-white/20 text-white mb-4 hover:bg-white/30">
                🎉 {t('Get ₹50 off on your first order', 'உங்கள் முதல் ஆர்டரில் ₹50 தள்ளுபடி')}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {t('Fresh Fish,', 'புதிய மீன்,')}
                <br />
                {t('Delivered Fresh', 'புதிதாக வழங்கப்படுகிறது')}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                {t(
                  'From the ocean to your kitchen. Get the freshest catch delivered to your doorstep in Chennai.',
                  'கடலில் இருந்து உங்கள் சமையலறைக்கு. சென்னையில் உங்கள் வீட்டு வாசலில் புதிய மீன்களை பெறுங்கள்.'
                )}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/catalog">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    {t('Shop Now', 'இப்போது வாங்கவும்')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/recipes">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white !text-white hover:bg-white/30 hover:!text-white bg-white/10 backdrop-blur-sm font-semibold"
                  >
                    {t('View Recipes', 'சமையல் குறிப்புகள்')}
                  </Button>
                </Link>
              </div>

              {/* Location Selector */}
              <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{t('Delivering to Chennai', 'சென்னைக்கு டெலிவரி')}</span>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 text-xs">
                  {t('Change', 'மாற்று')}
                </Button>
              </div>
            </div>
          </div>

          {/* Wave Decoration */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
            >
              <path
                d="M0 50L48 45.7C96 41.3 192 32.7 288 35.2C384 37.7 480 51.3 576 55.7C672 60 768 55 864 48.3C960 41.7 1056 33.3 1152 35.2C1248 37 1344 49 1392 55L1440 61V101H1392C1344 101 1248 101 1152 101C1056 101 960 101 864 101C768 101 672 101 576 101C480 101 384 101 288 101C192 101 96 101 48 101H0V50Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        {/* Features */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {FEATURES.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{feature.title}</p>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{t('Shop by Category', 'வகை அடிப்படையில் வாங்கவும்')}</h2>
              <Link
                href="/catalog"
                className="text-primary text-sm font-medium hover:underline flex items-center"
              >
                {t('View All', 'அனைத்தும் பார்க்க')}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {FISH_CATEGORIES.map((category) => (
                <Link key={category.id} href={`/catalog?category=${category.id}`}>
                  <Card className="hover:shadow-md hover:border-primary/50 transition-all cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                      <span className="text-3xl mb-2">{category.icon}</span>
                      <h3 className="font-medium text-sm">{language === 'en' ? category.name_en : category.name_ta}</h3>
                      <p className="text-xs text-muted-foreground">{language === 'en' ? category.name_ta : category.name_en}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Today's Fresh Catch */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">{t("Today's Fresh Catch", 'இன்றைய புதிய மீன்கள்')}</h2>
                <p className="text-muted-foreground text-sm">
                  {t('Caught fresh this morning', 'இன்று காலை பிடிக்கப்பட்டது')}
                </p>
              </div>
              <Link
                href="/catalog"
                className="text-primary text-sm font-medium hover:underline flex items-center"
              >
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {FEATURED_PRODUCTS.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-square bg-gradient-to-br from-sky-50 to-cyan-50 flex items-center justify-center">
                    <span className="text-6xl group-hover:scale-110 transition-transform">
                      {product.category_id === 'prawns' ? '🦐' : product.category_id === 'crabs' ? '🦀' : product.category_id === 'squid' ? '🦑' : '🐟'}
                    </span>
                    <Badge className="absolute top-2 left-2 bg-primary">
                      {product.availability_status === 'in_stock' ? 'In Stock' : 'Limited'}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-1">
                      {language === 'en' ? product.name_english : product.name_tamil}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? product.name_tamil : product.name_english}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">{product.rating}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-lg font-bold text-primary">
                        ₹{product.price_per_kg}
                        <span className="text-xs font-normal text-muted-foreground">/kg</span>
                      </p>
                      <Button size="sm" onClick={() => handleAddClick(product)}>
                        {t('Add', 'சேர்')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Slots */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">{t('Choose Your Delivery Time', 'உங்கள் டெலிவரி நேரத்தை தேர்வு செய்யவும்')}</h2>
              <p className="text-muted-foreground">
                {t('We deliver fresh fish at your preferred time slot', 'நீங்கள் விரும்பும் நேரத்தில் புதிய மீன் வழங்குகிறோம்')}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {DELIVERY_SLOTS.map((slot) => (
                <Card
                  key={slot.id}
                  className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
                >
                  <CardContent className="p-6 text-center">
                    <span className="text-3xl mb-3 block">{slot.icon}</span>
                    <h3 className="font-semibold mb-1">{language === 'en' ? slot.name : slot.name_ta}</h3>
                    <p className="text-sm text-primary font-medium">
                      {slot.start_time} - {slot.end_time}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {slot.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recipe Section Preview */}
        <section className="py-12 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <Badge className="bg-orange-500 mb-4">{t('Recipes', 'சமையல் குறிப்புகள்')}</Badge>
                <h2 className="text-3xl font-bold mb-4">
                  {t('Learn to Cook Delicious Fish Dishes', 'சுவையான மீன் உணவுகளை சமைக்க கற்றுக்கொள்ளுங்கள்')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t(
                    'Explore our collection of authentic Tamil fish recipes with step-by-step video tutorials. From traditional Meen Kulambu to modern fusion dishes.',
                    'படிப்படியான வீடியோ வழிகாட்டுதல்களுடன் உண்மையான தமிழ் மீன் சமையல் குறிப்புகளை ஆராயுங்கள். பாரம்பரிய மீன் குழம்பு முதல் நவீன உணவுகள் வரை.'
                  )}
                </p>
                <Link href="/recipes">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    {t('Explore Recipes', 'சமையல் குறிப்புகள் பார்க்க')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <Card className="overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center text-5xl">
                    🍛
                  </div>
                </Card>
                <Card className="overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center text-5xl">
                    🍳
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 gradient-ocean text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t('Ready to Order Fresh Fish?', 'புதிய மீன் ஆர்டர் செய்ய தயாரா?')}
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              {t(
                'Join thousands of happy customers who trust FreshCatch for their daily fish needs. First order? Get ₹50 off!',
                'தினசரி மீன் தேவைகளுக்காக FreshCatch ஐ நம்பும் ஆயிரக்கணக்கான மகிழ்ச்சியான வாடிக்கையாளர்களுடன் சேரவும். முதல் ஆர்டரா? ₹50 தள்ளுபடி பெறுங்கள்!'
              )}
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                {t('Get Started', 'தொடங்குங்கள்')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* Add to Cart Dialog */}
      {selectedProduct && (
        <AddToCartDialog
          product={selectedProduct}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </div>
  );
}
