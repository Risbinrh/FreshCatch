'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface CleaningOption {
  id: string;
  name: string;
  name_tamil: string;
  price_modifier: number;
}

interface Product {
  id: string;
  name: string;
  nameTa: string;
  price: number;
  image: string;
  cleaningOptions?: CleaningOption[];
}

interface AddToCartDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddToCartDialog({ product, open, onOpenChange }: AddToCartDialogProps) {
  const { addToCart } = useCart();
  const { language, t } = useLanguage();

  const defaultCleaningOptions: CleaningOption[] = [
    { id: 'whole', name: 'Whole', name_tamil: 'முழுமையாக', price_modifier: 0 },
    { id: 'cleaned', name: 'Cleaned', name_tamil: 'சுத்தம்', price_modifier: 20 },
  ];

  const cleaningOptions = product.cleaningOptions || defaultCleaningOptions;

  const [selectedCleaning, setSelectedCleaning] = useState<CleaningOption>(cleaningOptions[0]);
  const [quantity, setQuantity] = useState(0.5);
  const [unit, setUnit] = useState<'kg' | 'piece'>('kg');

  const finalPrice = product.price + selectedCleaning.price_modifier;
  const totalPrice = finalPrice * quantity;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      nameTamil: product.nameTa,
      price: product.price,
      image: product.image,
      quantity,
      unit,
      cleaningOption: selectedCleaning,
    });
    onOpenChange(false);
    // Reset form
    setQuantity(0.5);
    setSelectedCleaning(cleaningOptions[0]);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => Math.round((prev + 0.5) * 10) / 10);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(0.5, Math.round((prev - 0.5) * 10) / 10));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{language === 'en' ? product.name : product.nameTa}</DialogTitle>
          <DialogDescription>
            {t('Select quantity and cleaning option', 'அளவு மற்றும் சுத்தம் செய்யும் விருப்பத்தை தேர்ந்தெடுக்கவும்')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Cleaning Options */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              {t('Cleaning Option', 'சுத்தம் செய்யும் விருப்பம்')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {cleaningOptions.map((option) => (
                <Button
                  key={option.id}
                  type="button"
                  variant={selectedCleaning.id === option.id ? 'default' : 'outline'}
                  className="h-auto py-3 px-4 flex flex-col items-start"
                  onClick={() => setSelectedCleaning(option)}
                >
                  <span className="font-medium">{language === 'en' ? option.name : option.name_tamil}</span>
                  {option.price_modifier > 0 && (
                    <span className="text-xs opacity-80">+₹{option.price_modifier}/kg</span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Unit Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              {t('Unit', 'அலகு')}
            </label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={unit === 'kg' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => setUnit('kg')}
              >
                {t('Per Kg', 'கிலோ')}
              </Button>
              <Button
                type="button"
                variant={unit === 'piece' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => setUnit('piece')}
              >
                {t('Per Piece', 'துண்டு')}
              </Button>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              {t('Quantity', 'அளவு')}
            </label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 0.5}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center">
                <span className="text-2xl font-bold">{quantity}</span>
                <span className="text-sm text-muted-foreground ml-2">{unit === 'kg' ? 'kg' : 'pc'}</span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-slate-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t('Base Price', 'அடிப்படை விலை')}</span>
              <span>₹{product.price}/{unit === 'kg' ? 'kg' : 'pc'}</span>
            </div>
            {selectedCleaning.price_modifier > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t('Cleaning Charge', 'சுத்தம் கட்டணம்')}</span>
                <span>₹{selectedCleaning.price_modifier}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>{t('Total', 'மொத்தம்')}</span>
              <span className="text-primary">₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleAddToCart} className="w-full" size="lg">
            <ShoppingCart className="mr-2 h-5 w-5" />
            {t('Add to Cart', 'கூடையில் சேர்க்கவும்')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
