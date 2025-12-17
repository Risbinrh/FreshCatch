import Image from 'next/image';
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
import { MOCK_PRODUCTS, MOCK_RECIPES } from '@/lib/mock-data';

// Get featured products and recipes from mock data
const FEATURED_PRODUCTS = MOCK_PRODUCTS.slice(0, 4);
const FEATURED_RECIPES = MOCK_RECIPES.slice(0, 2);

// Features
const FEATURES = [
  {
    icon: Leaf,
    title: 'Farm Fresh',
    description: 'Directly sourced from fishermen',
  },
  {
    icon: Clock,
    title: 'Sunrise Delivery',
    description: 'Get fresh fish by 6 AM',
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'On orders above ₹300',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assured',
    description: '100% freshness guarantee',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative gradient-ocean text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-2xl">
              <Badge className="bg-white/20 text-white mb-4 hover:bg-white/30">
                🎉 Get ₹50 off on your first order
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Fresh Fish,
                <br />
                Delivered Fresh
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                From the ocean to your kitchen. Get the freshest catch delivered
                to your doorstep in Chennai.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/catalog">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/recipes">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/20"
                  >
                    View Recipes
                  </Button>
                </Link>
              </div>

              {/* Location Selector */}
              <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Delivering to Chennai</span>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 text-xs">
                  Change
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
              <h2 className="text-2xl font-bold">Shop by Category</h2>
              <Link
                href="/catalog"
                className="text-primary text-sm font-medium hover:underline flex items-center"
              >
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {FISH_CATEGORIES.map((category) => (
                <Link key={category.id} href={`/catalog?category=${category.id}`}>
                  <Card className="hover:shadow-md hover:border-primary/50 transition-all cursor-pointer">
                    <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                      <span className="text-3xl mb-2">{category.icon}</span>
                      <h3 className="font-medium text-sm">{category.name_en}</h3>
                      <p className="text-xs text-muted-foreground">{category.name_ta}</p>
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
                <h2 className="text-2xl font-bold">Today&apos;s Fresh Catch</h2>
                <p className="text-muted-foreground text-sm">
                  Caught fresh this morning
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
                <Link key={product.id} href={`/catalog/${product.id}`}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-gradient-to-br from-sky-50 to-cyan-50 overflow-hidden">
                      {product.images?.[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name_english}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-6xl">🐟</span>
                        </div>
                      )}
                      <Badge className="absolute top-2 left-2 bg-primary">
                        {product.availability_status === 'in_stock' ? 'Fresh Today' : 'Limited'}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold line-clamp-1">{product.name_english}</h3>
                      <p className="text-sm text-muted-foreground">{product.name_tamil}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">{product.rating}</span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-lg font-bold text-primary">
                          ₹{product.price_per_kg}
                          <span className="text-xs font-normal text-muted-foreground">/kg</span>
                        </p>
                        <Button size="sm">Add</Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Slots */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Choose Your Delivery Time</h2>
              <p className="text-muted-foreground">
                We deliver fresh fish at your preferred time slot
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
                    <h3 className="font-semibold mb-1">{slot.name}</h3>
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
                <Badge className="bg-orange-500 mb-4">Recipes</Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Learn to Cook Delicious Fish Dishes
                </h2>
                <p className="text-muted-foreground mb-6">
                  Explore our collection of authentic Tamil fish recipes with
                  step-by-step video tutorials. From traditional Meen Kulambu to
                  modern fusion dishes.
                </p>
                <Link href="/recipes">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Explore Recipes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                {FEATURED_RECIPES.map((recipe) => (
                  <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                      <div className="aspect-square bg-gradient-to-br from-orange-100 to-red-100 overflow-hidden">
                        {recipe.thumbnail ? (
                          <img
                            src={recipe.thumbnail}
                            alt={recipe.title_english}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-5xl">
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
        <section className="py-16 gradient-ocean text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Order Fresh Fish?
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Join thousands of happy customers who trust FreshCatch for their
              daily fish needs. First order? Get ₹50 off!
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
