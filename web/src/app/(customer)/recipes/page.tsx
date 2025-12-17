'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Play,
  Clock,
  Users,
  Star,
  Filter,
  BookOpen,
  ChefHat,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { MOCK_RECIPES } from '@/lib/mock-data';
import type { Recipe } from '@/types';

const DIFFICULTY_CONFIG = {
  easy: { label: 'Easy', color: 'bg-green-500' },
  medium: { label: 'Medium', color: 'bg-yellow-500' },
  hard: { label: 'Hard', color: 'bg-red-500' },
};

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const cuisines = Array.from(new Set(MOCK_RECIPES.map((r) => r.cuisine_type)));

  const filteredRecipes = useMemo(() => {
    return MOCK_RECIPES.filter((recipe) => {
      const matchesSearch =
        recipe.title_english.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.title_tamil.includes(searchQuery);
      const matchesDifficulty =
        !selectedDifficulty || recipe.difficulty_level === selectedDifficulty;
      const matchesCuisine = !selectedCuisine || recipe.cuisine_type === selectedCuisine;
      return matchesSearch && matchesDifficulty && matchesCuisine;
    });
  }, [searchQuery, selectedDifficulty, selectedCuisine]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-500 to-red-500 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <Badge className="bg-white/20 text-white mb-4">
                <ChefHat className="h-3 w-3 mr-1" />
                {MOCK_RECIPES.length}+ Recipes
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Delicious Fish Recipes
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Learn to cook authentic Tamil Nadu fish dishes with our step-by-step
                video tutorials and detailed recipes.
              </p>

              {/* Search */}
              <div className="relative max-w-lg">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white text-foreground"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <div className="bg-white border-b sticky top-16 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>

              {/* Difficulty Filter */}
              <div className="flex gap-2">
                {Object.entries(DIFFICULTY_CONFIG).map(([key, config]) => (
                  <Button
                    key={key}
                    variant={selectedDifficulty === key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() =>
                      setSelectedDifficulty(selectedDifficulty === key ? null : key)
                    }
                  >
                    {config.label}
                  </Button>
                ))}
              </div>

              <div className="h-4 w-px bg-slate-200" />

              {/* Cuisine Filter */}
              <div className="flex gap-2 flex-wrap">
                {cuisines.map((cuisine) => (
                  <Button
                    key={cuisine}
                    variant={selectedCuisine === cuisine ? 'default' : 'outline'}
                    size="sm"
                    onClick={() =>
                      setSelectedCuisine(selectedCuisine === cuisine ? null : cuisine)
                    }
                  >
                    {cuisine}
                  </Button>
                ))}
              </div>

              {(selectedDifficulty || selectedCuisine) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedDifficulty(null);
                    setSelectedCuisine(null);
                  }}
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing {filteredRecipes.length} recipes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => {
              const difficulty = DIFFICULTY_CONFIG[recipe.difficulty_level];
              const isPlaying = playingVideoId === recipe.id;

              return (
                <div key={recipe.id}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-all h-full">
                    {/* Recipe Image/Video */}
                    <div className="relative aspect-video bg-gradient-to-br from-orange-100 to-red-100 overflow-hidden">
                      {isPlaying && recipe.video_url ? (
                        /* Video Player */
                        <div className="relative w-full h-full">
                          <iframe
                            src={recipe.video_url}
                            title={recipe.title_english}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                          {/* Close button */}
                          <button
                            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center z-30 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlayingVideoId(null);
                            }}
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ) : (
                        /* Thumbnail with Play Button */
                        <>
                          <Link href={`/recipes/${recipe.id}`}>
                            {/* Thumbnail Image */}
                            {recipe.thumbnail && (
                              <Image
                                src={recipe.thumbnail}
                                alt={recipe.title_english}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            )}
                          </Link>

                          {/* Play Button Overlay */}
                          {recipe.video_url && (
                            <div
                              className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all flex items-center justify-center cursor-pointer z-10"
                              onClick={(e) => {
                                e.preventDefault();
                                setPlayingVideoId(recipe.id);
                              }}
                            >
                              <div className="h-16 w-16 rounded-full bg-white hover:bg-red-600 hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-xl group/play">
                                <Play className="h-8 w-8 text-red-600 group-hover/play:text-white ml-1 transition-colors" />
                              </div>
                            </div>
                          )}

                          {/* Badges */}
                          <Badge className={`absolute top-3 left-3 ${difficulty.color} text-white z-20`}>
                            {difficulty.label}
                          </Badge>

                          <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1 z-20">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {recipe.rating}
                          </div>
                        </>
                      )}
                    </div>

                    <Link href={`/recipes/${recipe.id}`}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                          {recipe.title_english}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {recipe.title_tamil}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {recipe.cooking_time} mins
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {recipe.servings} servings
                          </div>
                        </div>

                        {/* Fish Info */}
                        {recipe.fish_product && (
                          <div className="flex items-center justify-between pt-3 border-t">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">🐟</span>
                              <div>
                                <p className="text-xs text-muted-foreground">Made with</p>
                                <p className="text-sm font-medium">
                                  {recipe.fish_product.name_english}
                                </p>
                              </div>
                            </div>
                            <Badge variant="secondary">
                              ₹{recipe.fish_product.price_per_kg}/kg
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Link>
                  </Card>
                </div>
              );
            })}
          </div>

          {filteredRecipes.length === 0 && (
            <Card className="text-center py-16">
              <CardContent>
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-lg font-semibold mb-2">No recipes found</h2>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDifficulty(null);
                    setSelectedCuisine(null);
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
