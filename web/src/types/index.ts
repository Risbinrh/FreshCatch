// User Types
export interface User {
  id: string;
  name: string;
  mobile_primary: string;
  mobile_alternative?: string;
  email?: string;
  referral_code: string;
  referred_by?: string;
  preferred_language: 'en' | 'ta';
  profile_picture?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Address {
  id?: string;
  user_id?: string;
  full_address: string;
  landmark?: string;
  city?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  zone_id?: string;
  is_default?: boolean;
  address_type?: 'home' | 'work' | 'other';
}

// Zone Types
export interface Zone {
  id: string;
  zone_name: string;
  center_lat: number;
  center_lng: number;
  radius_km: number;
  delivery_charge: number;
  min_order_amount: number;
  is_active: boolean;
  delivery_slots: DeliverySlot[];
}

export interface DeliverySlot {
  id?: string;
  name: string;
  name_ta?: string;
  start_time?: string;
  end_time?: string;
  time?: string;
  icon?: string;
}

// Product Types
export interface FishProduct {
  id: string;
  name_english: string;
  name_tamil: string;
  name_regional?: string;
  category_id: string;
  category?: Category;
  description: string;
  description_tamil?: string;
  price_per_kg: number;
  price_per_piece?: number;
  images: string[];
  cleaning_options: CleaningOption[];
  availability_status: 'in_stock' | 'out_of_stock' | 'limited';
  nutritional_info?: NutritionalInfo;
  freshness_date?: Date;
  fish_type: 'sea' | 'river' | 'prawns' | 'crabs' | 'squid' | 'special';
  is_active: boolean;
}

export interface Category {
  id: string;
  name_english: string;
  name_tamil: string;
  icon?: string;
  parent_id?: string;
  is_active?: boolean;
}

export interface CleaningOption {
  id: string;
  name: string;
  name_tamil: string;
  price_modifier: number; // Additional cost
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  fat: number;
  omega3: number;
}

// Cart Types
export interface CartItem {
  id: string;
  product_id: string;
  product: FishProduct;
  quantity: number;
  unit: 'kg' | 'piece';
  cleaning_type: string;
  unit_price: number;
  total_price: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  delivery_charge: number;
  discount_amount: number;
  total: number;
  coupon_code?: string;
}

// Order Types
export interface Order {
  id: string;
  user_id: string;
  address_id?: string;
  address?: Address;
  order_status: OrderStatus;
  delivery_slot: DeliverySlot;
  delivery_date: Date;
  items: OrderItem[];
  subtotal: number;
  delivery_charge: number;
  discount_amount: number;
  total_amount: number;
  payment_method: PaymentMethod;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  special_instructions?: string;
  delivery_partner?: {
    name: string;
    phone: string;
    photo?: string;
  };
  tracking?: {
    current_lat: number;
    current_lng: number;
    eta: string;
  };
  created_at: Date;
  updated_at?: Date;
}

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id?: string;
  product?: FishProduct;
  quantity: number;
  unit: 'kg' | 'piece';
  cleaning_type: string;
  unit_price?: number;
  total_price: number;
}

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'processing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'upi' | 'card' | 'wallet' | 'cod';

// Recipe Types
export interface Recipe {
  id: string;
  title_english: string;
  title_tamil: string;
  fish_product_id?: string;
  fish_product?: FishProduct;
  video_url?: string;
  thumbnail?: string;
  content: string;
  content_tamil?: string;
  difficulty_level: 'easy' | 'medium' | 'hard';
  cooking_time: number; // in minutes
  servings: number;
  cuisine_type: string;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tags?: string[];
  rating: number;
  reviews_count: number;
  is_active: boolean;
}

export interface RecipeIngredient {
  name: string;
  name_tamil?: string;
  quantity: string;
  is_fish: boolean;
}

export interface RecipeStep {
  step_number: number;
  instruction: string;
  instruction_tamil?: string;
  image?: string;
  duration?: number;
}

// Referral Types
export interface Referral {
  id: string;
  referrer_id: string;
  referee_id: string;
  referral_code_used: string;
  discount_amount: number;
  status: 'pending' | 'credited';
  created_at: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}
