'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Play, Star, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Recipe } from '@/types';
import { RECIPE_DIFFICULTY } from '@/constants';

interface RecipeCardProps {
  recipe: Recipe;
  language?: 'en' | 'ta';
  onAddFishToCart?: (recipe: Recipe) => void;
}

export function RecipeCard({
  recipe,
  language = 'en',
  onAddFishToCart,
}: RecipeCardProps) {
  const title = language === 'en' ? recipe.title_english : recipe.title_tamil;
  const difficulty = RECIPE_DIFFICULTY[recipe.difficulty_level];

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        {/* Thumbnail */}
        {recipe.thumbnail ? (
          <Image
            src={recipe.thumbnail}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400 bg-gradient-to-br from-orange-100 to-red-100">
            <span className="text-5xl">🍳</span>
          </div>
        )}

        {/* Video Play Button */}
        {recipe.video_url && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="h-6 w-6 text-primary ml-1" />
            </div>
          </div>
        )}

        {/* Difficulty Badge */}
        <Badge
          className={cn(
            'absolute top-2 left-2 text-white text-xs',
            difficulty.color === 'green' && 'bg-green-500',
            difficulty.color === 'yellow' && 'bg-yellow-500',
            difficulty.color === 'red' && 'bg-red-500'
          )}
        >
          {language === 'en' ? difficulty.label : difficulty.label_ta}
        </Badge>

        {/* Rating */}
        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          {recipe.rating.toFixed(1)}
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title */}
        <Link href={`/recipes/${recipe.id}`}>
          <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors mb-2">
            {title}
          </h3>
        </Link>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {recipe.cooking_time} {language === 'en' ? 'mins' : 'நிமிடம்'}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {recipe.servings} {language === 'en' ? 'servings' : 'பேர்'}
          </div>
        </div>

        {/* Fish Product Link */}
        {recipe.fish_product && (
          <div className="flex items-center justify-between pt-3 border-t">
            <div>
              <p className="text-xs text-muted-foreground">
                {language === 'en' ? 'Fish:' : 'மீன்:'}
              </p>
              <p className="text-sm font-medium">
                {language === 'en'
                  ? recipe.fish_product.name_english
                  : recipe.fish_product.name_tamil}
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAddFishToCart?.(recipe)}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              ₹{recipe.fish_product.price_per_kg}/kg
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
