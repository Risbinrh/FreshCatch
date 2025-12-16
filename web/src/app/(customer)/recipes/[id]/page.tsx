'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Play,
  Clock,
  Users,
  Star,
  Heart,
  Share2,
  Printer,
  ShoppingCart,
  ChevronLeft,
  Check,
  ChefHat,
} from 'lucide-react';
import Link from 'next/link';
import { MOCK_RECIPES, MOCK_PRODUCTS } from '@/lib/mock-data';

const DIFFICULTY_CONFIG = {
  easy: { label: 'Easy', labelTa: 'எளிது', color: 'bg-green-500' },
  medium: { label: 'Medium', labelTa: 'நடுத்தரம்', color: 'bg-yellow-500' },
  hard: { label: 'Hard', labelTa: 'கடினம்', color: 'bg-red-500' },
};

export default function RecipeDetailPage() {
  const params = useParams();
  const recipe = MOCK_RECIPES.find((r) => r.id === params.id) || MOCK_RECIPES[0];
  const [isFavorite, setIsFavorite] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const difficulty = DIFFICULTY_CONFIG[recipe.difficulty_level];

  const toggleStep = (stepNum: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNum) ? prev.filter((s) => s !== stepNum) : [...prev, stepNum]
    );
  };

  const relatedRecipes = MOCK_RECIPES.filter((r) => r.id !== recipe.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Back Button */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <Link
              href="/recipes"
              className="inline-flex items-center text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Recipes
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Video Section */}
              <Card className="overflow-hidden">
                <div className="relative aspect-video bg-gradient-to-br from-orange-100 to-red-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl">🍛</span>
                  </div>
                  {recipe.video_url && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button size="lg" className="rounded-full h-20 w-20 bg-white text-orange-500 hover:bg-white/90">
                        <Play className="h-10 w-10 ml-1" />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>

              {/* Recipe Info */}
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${difficulty.color} text-white`}>
                        {difficulty.label}
                      </Badge>
                      <Badge variant="secondary">{recipe.cuisine_type}</Badge>
                    </div>
                    <h1 className="text-3xl font-bold">{recipe.title_english}</h1>
                    <p className="text-xl text-muted-foreground">{recipe.title_tamil}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={isFavorite ? 'text-red-500' : ''}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Printer className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-6 mt-6 p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Cooking Time</p>
                      <p className="font-semibold">{recipe.cooking_time} mins</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Servings</p>
                      <p className="font-semibold">{recipe.servings} people</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <div>
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <p className="font-semibold">
                        {recipe.rating} ({recipe.reviews_count} reviews)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChefHat className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Difficulty</p>
                      <p className="font-semibold">{difficulty.label}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-6 text-muted-foreground">{recipe.content}</p>
              </div>

              {/* Ingredients */}
              <Card>
                <CardHeader>
                  <CardTitle>Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          ingredient.is_fish ? 'bg-primary/5 border border-primary/20' : 'bg-slate-50'
                        }`}
                      >
                        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-lg">
                          {ingredient.is_fish ? '🐟' : '🥄'}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{ingredient.name}</p>
                          <p className="text-sm text-muted-foreground">{ingredient.quantity}</p>
                        </div>
                        {ingredient.is_fish && (
                          <Button size="sm" variant="outline" className="gap-1">
                            <ShoppingCart className="h-3 w-3" />
                            Buy
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Steps */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Instructions</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {completedSteps.length} of {recipe.steps.length} completed
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    {recipe.steps.map((step) => (
                      <li
                        key={step.step_number}
                        className={`flex gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
                          completedSteps.includes(step.step_number)
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-slate-50 hover:bg-slate-100'
                        }`}
                        onClick={() => toggleStep(step.step_number)}
                      >
                        <div
                          className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-semibold ${
                            completedSteps.includes(step.step_number)
                              ? 'bg-green-500 text-white'
                              : 'bg-primary text-white'
                          }`}
                        >
                          {completedSteps.includes(step.step_number) ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            step.step_number
                          )}
                        </div>
                        <div>
                          <p
                            className={
                              completedSteps.includes(step.step_number)
                                ? 'text-muted-foreground line-through'
                                : ''
                            }
                          >
                            {step.instruction}
                          </p>
                          {step.duration && (
                            <p className="text-sm text-muted-foreground mt-1">
                              ⏱️ {step.duration} minutes
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Buy Fish Card */}
              {recipe.fish_product && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg">Buy the Fish</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-sky-50 to-cyan-50 flex items-center justify-center">
                        <span className="text-3xl">🐟</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{recipe.fish_product.name_english}</h4>
                        <p className="text-sm text-muted-foreground">
                          {recipe.fish_product.name_tamil}
                        </p>
                        <p className="font-bold text-primary">
                          ₹{recipe.fish_product.price_per_kg}/kg
                        </p>
                      </div>
                    </div>
                    <Link href={`/catalog/${recipe.fish_product.id}`}>
                      <Button className="w-full">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Nutrition Info */}
              {recipe.fish_product?.nutritional_info && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Nutrition Facts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Per 100g of fish</p>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Calories</span>
                        <span className="font-semibold">
                          {recipe.fish_product.nutritional_info.calories}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span>Protein</span>
                        <span className="font-semibold">
                          {recipe.fish_product.nutritional_info.protein}g
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span>Fat</span>
                        <span className="font-semibold">
                          {recipe.fish_product.nutritional_info.fat}g
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span>Omega-3</span>
                        <span className="font-semibold">
                          {recipe.fish_product.nutritional_info.omega3}g
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Related Recipes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">More Recipes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedRecipes.map((r) => (
                    <Link key={r.id} href={`/recipes/${r.id}`}>
                      <div className="flex gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">🍳</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm line-clamp-1">{r.title_english}</h4>
                          <p className="text-xs text-muted-foreground">{r.title_tamil}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span>⏱️ {r.cooking_time}m</span>
                            <span>⭐ {r.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
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
