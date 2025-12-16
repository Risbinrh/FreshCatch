'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CleaningOption {
  id: string;
  name: string;
  name_tamil: string;
  price_modifier: number;
}

interface CartItem {
  id: string; // Unique cart item ID
  productId: string;
  name: string;
  nameTamil: string;
  price: number;
  image: string;
  quantity: number;
  unit: 'kg' | 'piece';
  cleaningOption: CleaningOption;
  totalPrice: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (item: Omit<CartItem, 'id' | 'totalPrice'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemByProduct: (productId: string, cleaningOptionId: string) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('freshcatch_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart:', error);
        setItems([]);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('freshcatch_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (newItem: Omit<CartItem, 'id' | 'totalPrice'>) => {
    setItems((currentItems) => {
      // Check if item with same product and cleaning option already exists
      const existingItemIndex = currentItems.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          item.cleaningOption.id === newItem.cleaningOption.id
      );

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...currentItems];
        const existingItem = updatedItems[existingItemIndex];
        const newQuantity = existingItem.quantity + newItem.quantity;
        const basePrice = newItem.price + newItem.cleaningOption.price_modifier;

        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          totalPrice: basePrice * newQuantity,
        };
        return updatedItems;
      } else {
        // Add new item
        const basePrice = newItem.price + newItem.cleaningOption.price_modifier;
        const cartItem: CartItem = {
          ...newItem,
          id: `${newItem.productId}-${newItem.cleaningOption.id}-${Date.now()}`,
          totalPrice: basePrice * newItem.quantity,
        };
        return [...currentItems, cartItem];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === itemId) {
          const basePrice = item.price + item.cleaningOption.price_modifier;
          return {
            ...item,
            quantity,
            totalPrice: basePrice * quantity,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemByProduct = (productId: string, cleaningOptionId: string) => {
    return items.find(
      (item) =>
        item.productId === productId &&
        item.cleaningOption.id === cleaningOptionId
    );
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemByProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
