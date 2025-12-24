// App Constants
export const APP_NAME = 'FreshCatch';
export const APP_TAGLINE = 'Fresh Fish, Delivered Fresh';
export const APP_TAGLINE_TA = 'புதிய மீன், புதிதாக வழங்கப்படுகிறது';

// Languages
export const LANGUAGES = {
  en: 'English',
  ta: 'தமிழ்',
} as const;

export type Language = keyof typeof LANGUAGES;

// Delivery Slots
export const DELIVERY_SLOTS = [
  {
    id: 'sunrise',
    name: 'Sunrise Delivery',
    name_ta: 'சூரிய உதய டெலிவரி',
    start_time: '06:00',
    end_time: '08:00',
    icon: '🌅',
    description: 'For early morning cooking',
  },
  {
    id: 'morning',
    name: 'Morning Delivery',
    name_ta: 'காலை டெலிவரி',
    start_time: '08:00',
    end_time: '12:00',
    icon: '🌞',
    description: 'Standard morning delivery',
  },
  {
    id: 'afternoon',
    name: 'Afternoon Delivery',
    name_ta: 'மதிய டெலிவரி',
    start_time: '12:00',
    end_time: '16:00',
    icon: '☀️',
    description: 'Mid-day delivery',
  },
  {
    id: 'evening',
    name: 'Evening Delivery',
    name_ta: 'மாலை டெலிவரி',
    start_time: '16:00',
    end_time: '19:00',
    icon: '🌆',
    description: 'Evening delivery',
  },
] as const;

// Zone Configuration
export const ZONE_CONFIG = [
  {
    type: 'A',
    name: 'Primary Zone',
    radius_km: 5,
    delivery_charge: 0,
    min_order: 300,
  },
  {
    type: 'B',
    name: 'Secondary Zone',
    radius_km: 10,
    delivery_charge: 30,
    min_order: 400,
  },
  {
    type: 'C',
    name: 'Extended Zone',
    radius_km: 15,
    delivery_charge: 50,
    min_order: 500,
  },
  {
    type: 'D',
    name: 'Outer Zone',
    radius_km: 25,
    delivery_charge: 80,
    min_order: 700,
  },
] as const;

// Fish Categories
export const FISH_CATEGORIES = [
  {
    id: 'sea',
    name_en: 'Sea Fish',
    name_ta: 'கடல் மீன்',
    icon: '🐟',
  },
  {
    id: 'river',
    name_en: 'River Fish',
    name_ta: 'ஆற்று மீன்',
    icon: '🐠',
  },
  {
    id: 'prawns',
    name_en: 'Prawns & Shrimp',
    name_ta: 'இறால்',
    icon: '🦐',
  },
  {
    id: 'crabs',
    name_en: 'Crabs',
    name_ta: 'நண்டு',
    icon: '🦀',
  },
  {
    id: 'squid',
    name_en: 'Squid & Cuttlefish',
    name_ta: 'கணவாய்',
    icon: '🦑',
  },
  {
    id: 'special',
    name_en: 'Special/Seasonal',
    name_ta: 'சிறப்பு/பருவகால',
    icon: '⭐',
  },
] as const;

// Cleaning Options
export const CLEANING_OPTIONS = [
  {
    id: 'whole',
    name: 'Whole',
    name_ta: 'முழுமையாக',
    price_modifier: 0,
  },
  {
    id: 'cleaned',
    name: 'Cleaned',
    name_ta: 'சுத்தம் செய்யப்பட்ட',
    price_modifier: 20,
  },
  {
    id: 'cut_pieces',
    name: 'Cut Pieces',
    name_ta: 'துண்டுகள்',
    price_modifier: 30,
  },
  {
    id: 'fillet',
    name: 'Fillet',
    name_ta: 'ஃபில்லட்',
    price_modifier: 50,
  },
] as const;

// Order Statuses
export const ORDER_STATUSES = {
  placed: { label: 'Order Placed', label_ta: 'ஆர்டர் செய்யப்பட்டது', color: 'blue' },
  confirmed: { label: 'Confirmed', label_ta: 'உறுதிப்படுத்தப்பட்டது', color: 'cyan' },
  processing: { label: 'Processing', label_ta: 'செயலாக்கம்', color: 'yellow' },
  out_for_delivery: { label: 'Out for Delivery', label_ta: 'டெலிவரிக்கு புறப்பட்டது', color: 'orange' },
  delivered: { label: 'Delivered', label_ta: 'வழங்கப்பட்டது', color: 'green' },
  cancelled: { label: 'Cancelled', label_ta: 'ரத்து செய்யப்பட்டது', color: 'red' },
} as const;

// Payment Methods
export const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI', icon: '📱' },
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'wallet', name: 'Wallet', icon: '👛' },
  { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
] as const;

// Recipe Difficulty
export const RECIPE_DIFFICULTY = {
  easy: { label: 'Easy', label_ta: 'எளிது', color: 'green' },
  medium: { label: 'Medium', label_ta: 'நடுத்தரம்', color: 'yellow' },
  hard: { label: 'Hard', label_ta: 'கடினம்', color: 'red' },
} as const;

// Cuisine Types
export const CUISINE_TYPES = [
  { id: 'tamil', name: 'Tamil', name_ta: 'தமிழ்' },
  { id: 'kerala', name: 'Kerala', name_ta: 'கேரளா' },
  { id: 'bengali', name: 'Bengali', name_ta: 'வங்காளம்' },
  { id: 'goan', name: 'Goan', name_ta: 'கோவா' },
  { id: 'continental', name: 'Continental', name_ta: 'கான்டினென்டல்' },
] as const;

// Navigation Items - Customer
export const CUSTOMER_NAV_ITEMS = [
  { href: '/', label: 'Home', label_ta: 'முகப்பு', icon: 'Home' },
  { href: '/catalog', label: 'Fish Catalog', label_ta: 'மீன் பட்டியல்', icon: 'Fish' },
  { href: '/recipes', label: 'Recipes', label_ta: 'சமையல் குறிப்புகள்', icon: 'Book' },
  { href: '/orders', label: 'My Orders', label_ta: 'என் ஆர்டர்கள்', icon: 'Package' },
  { href: '/profile', label: 'Profile', label_ta: 'சுயவிவரம்', icon: 'User' },
] as const;

// Navigation Items - Admin
export const ADMIN_NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/admin/products', label: 'Products', icon: 'Fish' },
  { href: '/admin/orders', label: 'Orders', icon: 'ShoppingBag' },
  { href: '/admin/users', label: 'Users', icon: 'Users' },
  { href: '/admin/zones', label: 'Zones', icon: 'Map' },
  { href: '/admin/recipes', label: 'Recipes', icon: 'Book' },
  { href: '/admin/promotions', label: 'Promotions', icon: 'Tag' },
] as const;
