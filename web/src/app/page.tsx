'use client';

import { useState, useEffect } from 'react';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  ChevronRight,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { DELIVERY_SLOTS } from '@/constants';
import { useLanguage } from '@/contexts/LanguageContext';
import { AddToCartDialog } from '@/components/common/AddToCartDialog';
import { MOCK_PRODUCTS, MOCK_RECIPES } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';

// Display only marine fish (4 rows × 5 columns)
const FEATURED_PRODUCTS = MOCK_PRODUCTS.slice(0, 20); // First 20 products (marine fish only)
const FEATURED_RECIPES = MOCK_RECIPES.slice(0, 4);

export default function HomePage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<typeof FEATURED_PRODUCTS[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel slides data
  const carouselSlides = [
    {
      id: 1,
      title: t('Premium Sea Fish', 'பிரீமியம் கடல் மீன்'),
      subtitle: t('Catch of the Day', 'இன்றைய பிடிப்பு'),
      description: t('Experience the finest selection of marine fish, delivered straight from the boat to your kitchen.', 'சிறந்த கடல் மீன்களை அனுபவிக்கவும், படகிலிருந்து உங்கள் சமையலறைக்கு நேரடியாக விநியோகிக்கப்படுகிறது.'),
      buttonText: t('Shop Sea Fish', 'கடல் மீன் வாங்க'),
      image: '/images/emperor_fish_creative.png',
      bgColor: 'bg-gradient-to-r from-rose-950 to-slate-900',
      accentColor: 'text-rose-400',
    },
    {
      id: 2,
      title: t('Fresh Prawns & Crabs', 'புதிய இறால் & நண்டு'),
      subtitle: t('Shellfish Delicacies', 'சிப்பிமீன் உணவுகள்'),
      description: t('Juicy, succulent prawns and crabs cleaned to perfection for your favorite curries.', 'உங்கள் பிடித்த குழம்புகளுக்கு சரியாக சுத்தம் செய்யப்பட்ட சுவையான இறால் மற்றும் நண்டுகள்.'),
      buttonText: t('Order Shellfish', 'சிப்பிமீன் ஆர்டர்'),
      image: '/images/tiger_prawns_creative.png',
      bgColor: 'bg-gradient-to-r from-orange-950 to-red-950',
      accentColor: 'text-orange-400',
    },
    {
      id: 3,
      title: t('Sunrise Delivery', 'சூரிய உதய டெலிவரி'),
      subtitle: t('Guaranteed Freshness', 'புத்துணர்ச்சி உத்தரவாதம்'),
      description: t('Order before 10 PM and get fresh fish delivered by 8 AM the next morning.', 'இரவு 10 மணிக்குள் ஆர்டர் செய்யுங்கள் மற்றும் மறுநாள் காலை 8 மணிக்குள் புதிய மீன்களைப் பெறுங்கள்.'),
      buttonText: t('Start Ordering', 'ஆர்டர் செய்யத் தொடங்குங்கள்'),
      image: '/images/black_pomfret_creative.png',
      bgColor: 'bg-gradient-to-r from-slate-950 to-zinc-900',
      accentColor: 'text-zinc-400',
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [carouselSlides.length]);

  const handleAddClick = (product: typeof FEATURED_PRODUCTS[0]) => {
    // Check if user is logged in
    const user = localStorage.getItem('freshcatch_user');
    if (!user) {
      router.push('/login');
      return;
    }
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Carousel Section */}
        <section className="py-8 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="relative h-[280px] md:h-[340px] overflow-hidden rounded-3xl shadow-2xl bg-slate-900">
              {carouselSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                  {/* Full Background Image */}
                  <div className={`absolute inset-0 custom-fade-in ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    } transition-all duration-1000`}>
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover object-center"
                      priority={index === 0}
                    />
                    {/* Gradient Overlay for Text Readability - Transparent Left -> Opaque Right */}
                    <div className={`absolute inset-0 bg-gradient-to-l from-[#0f172a] via-[#0f172a]/80 to-transparent opacity-90`} />
                  </div>

                  {/* Content Container */}
                  <div className="relative h-full container mx-auto px-4">
                    <div className="flex h-full items-center justify-end">

                      {/* Text Content - Floating Right */}
                      <div className={`relative z-20 w-full md:w-1/2 px-4 md:pr-0 flex flex-col justify-center items-center md:items-end text-center md:text-right text-white transform transition-all duration-700 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        <Badge className={`mb-2 w-fit mx-auto md:ml-auto md:mr-0 ${slide.accentColor} bg-black/30 backdrop-blur-sm border-white/10 px-3 py-1 text-[10px] uppercase tracking-wider`}>
                          {slide.subtitle}
                        </Badge>
                        <h2 className="text-2xl md:text-4xl font-bold mb-2 leading-none tracking-tight drop-shadow-lg">
                          {slide.title}
                        </h2>
                        <p className="text-base md:text-lg text-slate-100 mb-4 max-w-sm ml-auto drop-shadow-md font-medium">
                          {slide.description}
                        </p>
                        <Button
                          asChild
                          size="lg"
                          className="bg-white text-slate-900 hover:bg-slate-200 font-bold px-6 h-10 text-sm rounded-full w-fit mx-auto md:ml-auto md:mr-0 shadow-xl transition-all hover:scale-105"
                        >
                          <Link href="/catalog">
                            {slide.buttonText}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation Dots */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {carouselSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 rounded-full ${index === currentSlide
                      ? 'w-10 h-2 bg-white'
                      : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Grid */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Marine Fish - Cleaned Options Available</h2>
              </div>
              <Button asChild variant="outline" className="gap-2">
                <Link href="/catalog">
                  {t('View All', 'அனைத்தும் பார்க்க')}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {FEATURED_PRODUCTS.map((product) => (
                <Card
                  key={product.id}
                  className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 h-full flex flex-col"
                >
                  <Link href={`/catalog/${product.id}`} className="absolute inset-0 z-10">
                    <span className="sr-only">View {product.name_english}</span>
                  </Link>
                  <div className="relative h-32 md:h-40 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden rounded-t-lg">
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name_english}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-7xl">
                          {product.category_id === 'prawns' ? '🦐' : product.category_id === 'crabs' ? '🦀' : product.category_id === 'squid' ? '🦑' : '🐟'}
                        </span>
                      </div>
                    )}
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white border-0 shadow-lg">
                      <span className="text-xs font-bold">FRESH</span>
                    </Badge>
                  </div>
                  <CardContent className="p-3 md:p-4 flex flex-col flex-grow">
                    <div>
                      <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1">
                        {language === 'en' ? product.name_english : product.name_tamil}
                      </h3>
                      {language === 'en' && product.name_tamil && (
                        <span className="text-xs text-muted-foreground block font-normal mb-2">
                          {product.name_tamil}
                        </span>
                      )}

                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-lg md:text-xl font-bold text-primary">
                          ₹{Math.round(product.price_per_kg * 0.85)}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.price_per_kg}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">/500g</p>
                    </div>

                    {/* Add to Cart Button - positioned at bottom */}
                    <div className="mt-auto pt-3 pb-5 relative z-20">
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddClick(product);
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Shellfish Products Section */}
        <section className="py-12 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {t('Shell Fish - Cleaned Options Available', 'ஷெல் மீன் - சுத்தம் செய்யப்பட்ட விருப்பங்கள்')}
              </h2>
              <p className="text-muted-foreground">
                {t('Fresh prawns, crabs, and more with cleaning options', 'புதிய இறால், நண்டு மற்றும் பல சுத்தம் விருப்பங்களுடன்')}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {MOCK_PRODUCTS.slice(20, 30).map((product) => (
                <Card key={product.id} className="group relative overflow-hidden h-full hover:shadow-lg transition-shadow flex flex-col">
                  <Link href={`/catalog/${product.id}`} className="absolute inset-0 z-10">
                    <span className="sr-only">View {product.name_english}</span>
                  </Link>
                  <div className="relative h-32 md:h-40 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden rounded-t-lg">
                    <Image
                      src={product.images[0]}
                      alt={product.name_english}
                      fill
                      className="object-cover"
                    />
                    {product.availability_status === 'limited' && (
                      <Badge className="absolute top-2 right-2 bg-orange-500">Limited</Badge>
                    )}
                  </div>
                  <CardContent className="p-3 md:p-4 flex flex-col flex-grow">
                    <div>
                      <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1">
                        {language === 'en' ? product.name_english : product.name_tamil}
                      </h3>

                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs md:text-sm font-medium">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews_count})</span>
                      </div>

                      <p className="text-lg md:text-xl font-bold text-primary">
                        ₹{product.price_per_kg}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">/kg</p>
                    </div>

                    {/* Add to Cart Button - positioned at bottom */}
                    <div className="mt-auto pt-3 pb-5 relative z-20">
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddClick(product);
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Freshwater Fish Products Section */}
        <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {t('Freshwater Fish - Cleaned Options Available', 'நன்னீர் மீன் - சுத்தம் செய்யப்பட்ட விருப்பங்கள்')}
              </h2>
              <p className="text-muted-foreground">
                {t('Fresh river fish with cleaning options', 'புதிய நதி மீன் சுத்தம் விருப்பங்களுடன்')}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {MOCK_PRODUCTS.slice(30, 40).map((product) => (
                <Card key={product.id} className="group relative overflow-hidden h-full hover:shadow-lg transition-shadow flex flex-col">
                  <Link href={`/catalog/${product.id}`} className="absolute inset-0 z-10">
                    <span className="sr-only">View {product.name_english}</span>
                  </Link>
                  <div className="relative h-32 md:h-40 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden rounded-t-lg">
                    <Image
                      src={product.images[0]}
                      alt={product.name_english}
                      fill
                      className="object-cover"
                    />
                    {product.availability_status === 'limited' && (
                      <Badge className="absolute top-2 right-2 bg-orange-500">Limited</Badge>
                    )}
                  </div>
                  <CardContent className="p-3 md:p-4 flex flex-col flex-grow">
                    <div>
                      <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1">
                        {language === 'en' ? product.name_english : product.name_tamil}
                      </h3>

                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs md:text-sm font-medium">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews_count})</span>
                      </div>

                      <p className="text-lg md:text-xl font-bold text-primary">
                        ₹{product.price_per_kg}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">/kg</p>
                    </div>

                    {/* Add to Cart Button - positioned at bottom */}
                    <div className="mt-auto pt-3 pb-5 relative z-20">
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddClick(product);
                        }}
                      >
                        Add to Cart
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
                <Button asChild className="bg-orange-500 hover:bg-orange-600">
                  <Link href="/recipes">
                    {t('Explore Recipes', 'சமையல் குறிப்புகள் பார்க்க')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                {FEATURED_RECIPES.map((recipe) => (
                  <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                      <div className="relative h-32 md:h-40 bg-gradient-to-br from-orange-100 to-red-100 overflow-hidden">
                        {recipe.thumbnail ? (
                          <Image
                            src={recipe.thumbnail}
                            alt={recipe.title_english}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-4xl md:text-5xl">
                            🍳
                          </div>
                        )}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}

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
