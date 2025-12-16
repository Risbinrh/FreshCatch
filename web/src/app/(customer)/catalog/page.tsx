'use client';

import { useState, useMemo } from 'react';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Heart,
  ShoppingCart,
  SlidersHorizontal,
  X,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { FISH_CATEGORIES } from '@/constants';

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name_english.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name_tamil.includes(searchQuery);
      const matchesCategory = !selectedCategory || product.category_id === selectedCategory;
      const matchesPrice =
        product.price_per_kg >= priceRange[0] && product.price_per_kg <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.price_per_kg - b.price_per_kg;
        case 'price_high':
          return b.price_per_kg - a.price_per_kg;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return (b.reviews_count || 0) - (a.reviews_count || 0);
      }
    });
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              !selectedCategory ? 'bg-primary text-white' : 'hover:bg-slate-100'
            }`}
          >
            All Categories
          </button>
          {FISH_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                selectedCategory === cat.id ? 'bg-primary text-white' : 'hover:bg-slate-100'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name_en}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full"
            />
            <Input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              [0, 300],
              [300, 500],
              [500, 800],
              [800, 2000],
            ].map(([min, max]) => (
              <Button
                key={`${min}-${max}`}
                variant={priceRange[0] === min && priceRange[1] === max ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPriceRange([min, max])}
              >
                ₹{min}-{max}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-semibold mb-3">Availability</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" defaultChecked />
            <span className="text-sm">In Stock</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span className="text-sm">Limited Stock</span>
          </label>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategory(null);
          setPriceRange([0, 2000]);
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header cartItemCount={2} />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Fresh Fish Catalog</h1>

            {/* Search & Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search fish by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {/* Mobile Filter Button */}
                <Sheet open={showFilters} onOpenChange={setShowFilters}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border rounded-lg text-sm bg-white"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>

                {/* View Toggle */}
                <div className="hidden sm:flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory || priceRange[0] > 0 || priceRange[1] < 2000) && (
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedCategory && (
                  <Badge variant="secondary" className="gap-1">
                    {FISH_CATEGORIES.find((c) => c.id === selectedCategory)?.name_en}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSelectedCategory(null)}
                    />
                  </Badge>
                )}
                {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                  <Badge variant="secondary" className="gap-1">
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setPriceRange([0, 2000])}
                    />
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <Card className="sticky top-20">
                <CardContent className="p-4">
                  <FilterContent />
                </CardContent>
              </Card>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                Showing {filteredProducts.length} products
              </p>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => (
                    <Link key={product.id} href={`/catalog/${product.id}`}>
                      <Card className="group overflow-hidden hover:shadow-lg transition-all h-full">
                        <div className="relative aspect-square bg-gradient-to-br from-sky-50 to-cyan-50 flex items-center justify-center">
                          <span className="text-6xl group-hover:scale-110 transition-transform">
                            {product.category_id === 'prawns'
                              ? '🦐'
                              : product.category_id === 'crabs'
                              ? '🦀'
                              : product.category_id === 'squid'
                              ? '🦑'
                              : '🐟'}
                          </span>
                          <Badge
                            className={`absolute top-2 left-2 ${
                              product.availability_status === 'in_stock'
                                ? 'bg-green-500'
                                : product.availability_status === 'limited'
                                ? 'bg-orange-500'
                                : 'bg-red-500'
                            }`}
                          >
                            {product.availability_status === 'in_stock'
                              ? 'In Stock'
                              : product.availability_status === 'limited'
                              ? 'Limited'
                              : 'Out of Stock'}
                          </Badge>
                          <button className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
                            <Heart className="h-4 w-4 text-slate-600" />
                          </button>
                        </div>
                        <CardContent className="p-3">
                          <h3 className="font-semibold line-clamp-1 text-sm">
                            {product.name_english}
                          </h3>
                          <p className="text-xs text-muted-foreground">{product.name_tamil}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{product.rating}</span>
                            <span className="text-xs text-muted-foreground">
                              ({product.reviews_count})
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <p className="font-bold text-primary">
                              ₹{product.price_per_kg}
                              <span className="text-xs font-normal text-muted-foreground">
                                /kg
                              </span>
                            </p>
                            <Button size="sm" className="h-8">
                              <ShoppingCart className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <Link key={product.id} href={`/catalog/${product.id}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-all">
                        <div className="flex">
                          <div className="w-32 h-32 bg-gradient-to-br from-sky-50 to-cyan-50 flex items-center justify-center flex-shrink-0">
                            <span className="text-5xl">
                              {product.category_id === 'prawns'
                                ? '🦐'
                                : product.category_id === 'crabs'
                                ? '🦀'
                                : '🐟'}
                            </span>
                          </div>
                          <CardContent className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold">{product.name_english}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {product.name_tamil}
                                  </p>
                                </div>
                                <Badge
                                  className={
                                    product.availability_status === 'in_stock'
                                      ? 'bg-green-500'
                                      : 'bg-orange-500'
                                  }
                                >
                                  {product.availability_status === 'in_stock'
                                    ? 'In Stock'
                                    : 'Limited'}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm">{product.rating}</span>
                                <span className="text-sm text-muted-foreground">
                                  ({product.reviews_count} reviews)
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xl font-bold text-primary">
                                ₹{product.price_per_kg}
                                <span className="text-sm font-normal text-muted-foreground">
                                  /kg
                                </span>
                              </p>
                              <Button>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add to Cart
                              </Button>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
