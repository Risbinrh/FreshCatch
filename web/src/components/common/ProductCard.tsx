'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FishProduct } from '@/types';

interface ProductCardProps {
  product: FishProduct;
  language?: 'en' | 'ta';
  onAddToCart?: (product: FishProduct) => void;
  onFavorite?: (product: FishProduct) => void;
  isFavorite?: boolean;
}

export function ProductCard({
  product,
  language = 'en',
  onAddToCart,
  onFavorite,
  isFavorite = false,
}: ProductCardProps) {
  const name = language === 'en' ? product.name_english : product.name_tamil;

  const availabilityConfig = {
    in_stock: { label: 'In Stock', labelTa: 'கையிருப்பில்', color: 'bg-green-500' },
    out_of_stock: { label: 'Out of Stock', labelTa: 'கையிருப்பில் இல்லை', color: 'bg-red-500' },
    limited: { label: 'Limited', labelTa: 'குறைவான கையிருப்பு', color: 'bg-orange-500' },
  };

  const availability = availabilityConfig[product.availability_status];

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        {/* Product Image */}
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            <span className="text-4xl">🐟</span>
          </div>
        )}

        {/* Availability Badge */}
        <Badge
          className={cn(
            'absolute top-2 left-2 text-white text-xs',
            availability.color
          )}
        >
          {language === 'en' ? availability.label : availability.labelTa}
        </Badge>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white',
            isFavorite ? 'text-red-500' : 'text-slate-600'
          )}
          onClick={() => onFavorite?.(product)}
        >
          <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
        </Button>

        {/* Freshness Badge */}
        {product.freshness_date && (
          <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            {language === 'en' ? 'Fresh Today' : 'இன்று புதியது'}
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-lg line-clamp-1 mb-1">{name}</h3>

        {/* Fish Type Tag */}
        <p className="text-sm text-muted-foreground mb-2">
          {product.category?.name_english || product.fish_type}
        </p>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-lg font-bold text-primary">
              ₹{product.price_per_kg}
              <span className="text-sm font-normal text-muted-foreground">/kg</span>
            </p>
            {product.price_per_piece && (
              <p className="text-xs text-muted-foreground">
                ₹{product.price_per_piece}/piece
              </p>
            )}
          </div>

          <Button
            size="sm"
            onClick={() => onAddToCart?.(product)}
            disabled={product.availability_status === 'out_of_stock'}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {language === 'en' ? 'Add' : 'சேர்'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
