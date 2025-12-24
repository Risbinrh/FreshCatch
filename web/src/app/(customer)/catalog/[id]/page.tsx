'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  Clock,
  ChevronRight,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import { MOCK_PRODUCTS, MOCK_RECIPES } from '@/lib/mock-data';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const product = MOCK_PRODUCTS.find((p) => p.id === params.id) || MOCK_PRODUCTS[0];
  const relatedRecipes = MOCK_RECIPES.filter((r) => r.fish_product?.id === product.id).slice(0, 2);

  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState<'kg' | 'piece'>('kg');
  const [selectedCleaning, setSelectedCleaning] = useState(product.cleaning_options[0]?.id || 'whole');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showViewCart, setShowViewCart] = useState(false);

  const basePrice = unit === 'kg' ? product.price_per_kg : (product.price_per_piece || product.price_per_kg);
  const cleaningOption = product.cleaning_options.find((c) => c.id === selectedCleaning);
  const totalPrice = (basePrice + (cleaningOption?.price_modifier || 0)) * quantity;

  const handleAddToCart = () => {
    // Check if user is logged in
    const user = localStorage.getItem('freshcatch_user');
    if (!user) {
      router.push('/login');
      return;
    }

    if (!cleaningOption) return;

    setIsAdding(true);

    addToCart({
      productId: product.id,
      name: product.name_english,
      nameTamil: product.name_tamil,
      price: basePrice,
      image: product.images?.[0] || '',
      quantity,
      unit,
      cleaningOption: {
        id: cleaningOption.id,
        name: cleaningOption.name,
        name_tamil: cleaningOption.name_tamil,
        price_modifier: cleaningOption.price_modifier,
      },
    });

    // Show success state and view cart button
    setTimeout(() => {
      setIsAdding(false);
      setShowViewCart(true);
    }, 1000);
  };

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category_id === product.category_id && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/catalog" className="hover:text-primary">Catalog</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{product.name_english}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <Card className="overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-sky-50 to-cyan-100 flex items-center justify-center relative">
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name_english}
                      fill
                      className="object-contain p-4"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                      No Image Available
                    </div>
                  )}

                  <Badge className="absolute top-4 left-4 bg-green-500 text-sm px-3 py-1">
                    Fresh Today
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-4 right-4 rounded-full bg-white shadow ${isFavorite ? 'text-red-500' : ''
                      }`}
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </Card>

              {/* Thumbnails */}
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-20 h-20 rounded-lg bg-white border flex items-center justify-center cursor-pointer overflow-hidden relative ${i === 1 ? 'border-primary ring-1 ring-primary' : 'border-slate-200 hover:border-primary/50'
                      }`}
                  >
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={`${product.name_english} view ${i}`}
                        fill
                        className="object-contain p-2"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{product.category?.name_english}</Badge>
                  <Badge
                    className={
                      product.availability_status === 'in_stock'
                        ? 'bg-green-500'
                        : 'bg-orange-500'
                    }
                  >
                    {product.availability_status === 'in_stock' ? 'In Stock' : 'Limited Stock'}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold">{product.name_english}</h1>
                <p className="text-xl text-muted-foreground">{product.name_tamil}</p>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${star <= Math.floor(product.rating || 0)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-slate-300'
                          }`}
                      />
                    ))}
                    <span className="font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    ({product.reviews_count} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="p-4 bg-primary/5 rounded-xl">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">₹{totalPrice}</span>
                  <span className="text-muted-foreground">for {quantity} {unit}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Base price: ₹{product.price_per_kg}/kg
                  {product.price_per_piece && ` | ₹${product.price_per_piece}/piece`}
                </p>
              </div>

              {/* Unit Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">Select Unit</label>
                <div className="flex gap-2">
                  <Button
                    variant={unit === 'kg' ? 'default' : 'outline'}
                    onClick={() => setUnit('kg')}
                  >
                    Per Kg (₹{product.price_per_kg})
                  </Button>
                  {product.price_per_piece && (
                    <Button
                      variant={unit === 'piece' ? 'default' : 'outline'}
                      onClick={() => setUnit('piece')}
                    >
                      Per Piece (₹{product.price_per_piece})
                    </Button>
                  )}
                </div>
              </div>

              {/* Cleaning Options */}
              <div>
                <label className="text-sm font-medium mb-2 block">Cleaning Preference</label>
                <div className="flex flex-wrap gap-2">
                  {product.cleaning_options.map((option) => (
                    <Button
                      key={option.id}
                      variant={selectedCleaning === option.id ? 'default' : 'outline'}
                      onClick={() => setSelectedCleaning(option.id)}
                      className="flex-1 min-w-[100px]"
                    >
                      <div className="text-center">
                        <div>{option.name}</div>
                        {option.price_modifier > 0 && (
                          <div className="text-xs opacity-70">+₹{option.price_modifier}</div>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-sm font-medium mb-2 block">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(0.5, quantity - 0.5))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-16 text-center font-medium">
                      {quantity} {unit}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 0.5)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    className="flex-1 h-14 text-lg"
                    onClick={handleAddToCart}
                    disabled={isAdding || !['in_stock', 'limited'].includes(product.availability_status)}
                  >
                    {isAdding ? (
                      <>
                        <Check className="h-5 w-5 mr-2" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Add to Cart - ₹{totalPrice}
                      </>
                    )}
                  </Button>
                  <Button size="lg" variant="outline" className="h-14">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                {showViewCart && (
                  <Button asChild variant="outline" size="lg" className="w-full h-12">
                    <Link href="/cart">
                      View Cart
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <Truck className="h-6 w-6 mx-auto text-primary mb-1" />
                  <p className="text-xs text-muted-foreground">Free Delivery</p>
                  <p className="text-xs font-medium">Above ₹300</p>
                </div>
                <div className="text-center">
                  <Clock className="h-6 w-6 mx-auto text-primary mb-1" />
                  <p className="text-xs text-muted-foreground">Sunrise Delivery</p>
                  <p className="text-xs font-medium">6 AM - 8 AM</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 mx-auto text-primary mb-1" />
                  <p className="text-xs text-muted-foreground">Quality</p>
                  <p className="text-xs font-medium">100% Fresh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product.reviews_count})</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">{product.description}</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Best Used For</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.best_for?.map((use) => (
                            <Badge key={use} variant="secondary">
                              {use}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Cleaning Options</h4>
                        <ul className="space-y-1">
                          {product.cleaning_options.map((opt) => (
                            <li key={opt.id} className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-500" />
                              {opt.name} ({opt.name_tamil})
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="nutrition" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4">Nutritional Information (per 100g)</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">
                          {product.nutritional_info?.calories}
                        </p>
                        <p className="text-sm text-muted-foreground">Calories</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">
                          {product.nutritional_info?.protein}g
                        </p>
                        <p className="text-sm text-muted-foreground">Protein</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">
                          {product.nutritional_info?.fat}g
                        </p>
                        <p className="text-sm text-muted-foreground">Fat</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">
                          {product.nutritional_info?.omega3}g
                        </p>
                        <p className="text-sm text-muted-foreground">Omega-3</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {[
                        { name: 'Priya S.', rating: 5, comment: 'Very fresh and tasty! Will order again.', date: '2 days ago' },
                        { name: 'Kumar R.', rating: 4, comment: 'Good quality fish. Delivery was on time.', date: '1 week ago' },
                        { name: 'Anitha M.', rating: 5, comment: 'Best seer fish I have ever ordered online!', date: '2 weeks ago' },
                      ].map((review, i) => (
                        <div key={i} className="pb-4 border-b last:border-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                                {review.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium">{review.name}</p>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, j) => (
                                    <Star
                                      key={j}
                                      className={`h-3 w-3 ${j < review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-slate-300'
                                        }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Recipes */}
          {
            relatedRecipes.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Recipes with {product.name_english}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedRecipes.map((recipe) => (
                    <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                        <div className="flex">
                          <div className="relative w-40 h-40 bg-gradient-to-br from-orange-100 to-red-100 flex-shrink-0 overflow-hidden">
                            {recipe.thumbnail ? (
                              <Image
                                src={recipe.thumbnail}
                                alt={recipe.title_english}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-muted-foreground bg-slate-100">
                                No Image
                              </div>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold">{recipe.title_english}</h3>
                            <p className="text-sm text-muted-foreground">{recipe.title_tamil}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span>⏱️ {recipe.cooking_time} mins</span>
                              <span>👥 {recipe.servings} servings</span>
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{recipe.rating}</span>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )
          }

          {/* Related Products */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <Card
                  key={p.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow relative"
                >
                  <Link href={`/catalog/${p.id}`} className="absolute inset-0 z-10">
                    <span className="sr-only">View {p.name_english}</span>
                  </Link>
                  <div className="aspect-square bg-gradient-to-br from-sky-50 to-cyan-50 flex items-center justify-center overflow-hidden relative">
                    {p.images?.[0] ? (
                      <Image
                        src={p.images[0]}
                        alt={p.name_english}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-muted-foreground bg-slate-100">
                        No Image
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-1">{p.name_english}</h3>
                    <p className="text-lg font-bold text-primary mt-1">₹{p.price_per_kg}/kg</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div >
      </main >

      <Footer />
    </div >
  );
}
