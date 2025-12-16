# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**FreshCatch** is a fresh fish delivery application targeting Tamil Nadu and surrounding regions. The project consists of a Next.js 14 web application (customer-facing and admin panel) built with TypeScript, Tailwind CSS, and shadcn/ui components. A mobile app using React Native is planned for Phase 2.

The application connects local fish vendors with customers, enabling fresh fish delivery with:
- Zone-based delivery service (4 zones with varying delivery charges and minimum orders)
- Multi-language support (English and Tamil)
- Product catalog with fish varieties, cleaning options, and nutritional info
- Recipe platform with video/written recipes
- Referral and discount system
- Real-time order tracking
- Multiple delivery time slots (Sunrise, Morning, Afternoon, Evening)

## Development Commands

All commands should be run from the `web/` directory unless otherwise specified:

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Project Structure

```
FreshCatch/
├── Docs/
│   └── PRD.md              # Complete Product Requirements Document
└── web/                    # Next.js application
    ├── src/
    │   ├── app/            # Next.js App Router pages
    │   │   ├── (auth)/     # Authentication pages (login, register)
    │   │   ├── (customer)/ # Customer-facing pages (catalog, cart, checkout, orders, profile, recipes)
    │   │   ├── admin/      # Admin panel pages (dashboard, products, orders, users, zones, recipes, promotions)
    │   │   ├── layout.tsx  # Root layout
    │   │   └── page.tsx    # Homepage
    │   ├── components/
    │   │   ├── common/     # Reusable components (CategoryCard, ProductCard, RecipeCard)
    │   │   ├── layout/     # Layout components (Header, Footer, AdminSidebar)
    │   │   └── ui/         # shadcn/ui components
    │   ├── lib/
    │   │   ├── utils.ts    # Utility functions (cn helper for Tailwind)
    │   │   └── mock-data.ts # Mock data for development/demo
    │   ├── types/
    │   │   └── index.ts    # TypeScript type definitions
    │   └── constants/
    │       └── index.ts    # App constants
    └── components.json     # shadcn/ui configuration
```

## Architecture & Key Concepts

### Route Organization

Next.js 14 App Router with route groups:
- `(auth)` - Authentication routes, no shared layout with main app
- `(customer)` - Customer-facing routes, shares customer layout with Header/Footer
- `admin` - Admin panel routes, uses AdminSidebar layout

Dynamic routes use `[id]` folders (e.g., `/catalog/[id]` for product details).

### Multi-Language Architecture

The app supports English and Tamil:
- All user-facing content has both `name_english` and `name_tamil` fields
- User preference stored in `preferred_language` field ('en' | 'ta')
- Constants include bilingual labels (e.g., `label` and `label_ta`)
- Content types: fish names, categories, recipes, UI labels

### Zone-Based Delivery System

Four delivery zones (A-D) with GPS-based detection:
- Zone A (0-5km): Free delivery, ₹300 min order
- Zone B (5-10km): ₹30 delivery, ₹400 min order
- Zone C (10-15km): ₹50 delivery, ₹500 min order
- Zone D (15-25km): ₹80 delivery, ₹700 min order

Each zone can have custom delivery slots and product availability.

### Product Model

Fish products include:
- Multi-language names (English, Tamil, optional regional)
- Price per kg AND/OR price per piece
- Cleaning options with price modifiers (whole, cleaned, cut pieces, fillet)
- Availability status: 'in_stock' | 'out_of_stock' | 'limited'
- Nutritional information (calories, protein, fat, omega3)
- Freshness date/time
- Category: sea, river, prawns, crabs, squid, special

### Order Flow

Order statuses: placed → confirmed → processing → out_for_delivery → delivered

Key features:
- Users select delivery time slot during checkout (4 options: Sunrise 6-8AM, Morning 8-12PM, Afternoon 12-4PM, Evening 4-7PM)
- Address verification checks zone eligibility
- Real-time GPS tracking when out for delivery
- Multiple payment methods: UPI, card, wallet, COD

### Recipe System

Recipes are linked to fish products with:
- Video URL and thumbnail
- Difficulty level: easy | medium | hard
- Cooking time in minutes
- Ingredients list (with `is_fish` flag to enable "Add to Cart")
- Step-by-step instructions
- Cuisine type tags (Tamil, Kerala, Bengali, Goan, Continental)
- Rating and reviews

## Type System

All TypeScript interfaces are in `src/types/index.ts`:
- `User` - User profiles with referral codes
- `Address` - GPS coordinates, zone assignment
- `FishProduct` - Fish with multi-language support
- `Order` - Complete order with status tracking
- `Recipe` - Recipe with ingredients and steps
- `Cart` - Shopping cart with items
- `ApiResponse<T>` - Standard API response wrapper

## Mock Data

`src/lib/mock-data.ts` contains comprehensive demo data:
- `MOCK_PRODUCTS` - 12 fish varieties with full details
- `MOCK_ORDERS` - Sample orders in different statuses
- `MOCK_RECIPES` - 6 recipes with ingredients and steps
- `MOCK_USER` - User profile with addresses and referrals
- `MOCK_CART` - Cart with items
- `ADMIN_STATS` - Dashboard statistics

Use this mock data for development and UI demos until the backend API is connected.

## Design System

Using shadcn/ui with the "new-york" style:
- Base color: neutral
- Icon library: lucide-react
- Path aliases configured: `@/components`, `@/lib`, `@/types`, etc.
- Tailwind CSS with custom gradient utilities (e.g., `gradient-ocean`)

UI components are in `src/components/ui/` and follow shadcn conventions.

## Constants

All app constants are centralized in `src/constants/index.ts`:
- `FISH_CATEGORIES` - 6 main categories with icons and Tamil names
- `DELIVERY_SLOTS` - 4 time slots with icons
- `ZONE_CONFIG` - Zone delivery rules
- `ORDER_STATUSES` - Status labels and colors
- `PAYMENT_METHODS` - Payment options
- `CUSTOMER_NAV_ITEMS` - Customer navigation
- `ADMIN_NAV_ITEMS` - Admin panel navigation

When adding new constants, add them to this file.

## Important Patterns

### Bilingual Content Handling
Always provide both English and Tamil versions for user-facing content. Example:
```typescript
{
  name_english: "Seer Fish",
  name_tamil: "வஞ்சிரம்",
  description: "Premium quality...",
  description_tamil: "உயர்தர..."
}
```

### Price Calculation
Products can have `price_per_kg` and/or `price_per_piece`. Cleaning options add a `price_modifier` to the base price. Always calculate final price as: `base_price + cleaning_option.price_modifier`.

### Zone Validation
Before checkout, verify the delivery address falls within a serviceable zone using GPS coordinates. Show zone-specific minimum order requirements and delivery charges.

### Cleaning Options
Each fish product has specific cleaning options available (not all fish support all options). Display only the available options from `product.cleaning_options`.

## Backend Integration (Future)

The PRD specifies:
- Backend: Node.js (Express) or Python (FastAPI)
- Database: PostgreSQL + Redis
- Storage: AWS S3 / Cloudinary
- Real-time: Socket.io
- Payments: Razorpay / PayTM / PhonePe
- SMS: MSG91 / Twilio
- Maps: Google Maps API

API endpoints are documented in `Docs/PRD.md` sections 5.1-5.6. When integrating the backend, replace mock data imports with actual API calls.

## Reference Documentation

The complete product requirements are in `Docs/PRD.md`, including:
- Complete feature specifications
- Database schema
- API endpoint definitions
- UI/UX mockups
- Success metrics and KPIs
- Technical stack details
- Phase 2 enhancements

Refer to this document for detailed requirements when implementing features.

## Authentication & Route Protection

The application requires users to login before accessing any pages (except login/register).

**Implementation:**
- Middleware (`src/middleware.ts`) protects all routes except `/login`, `/register`, `/terms`, `/privacy`
- Authentication uses cookies (not just localStorage) for server-side validation
- Users without valid `freshcatch_user` cookie are redirected to `/login`
- On successful login/registration, both localStorage and cookie are set
- Cookie expires after 7 days
- Logout clears both localStorage and cookie, redirects to `/login`

**Login Methods:**
- Quick Demo Login (Customer or Admin)
- OTP-based authentication (phone + 6-digit OTP)
- Social login (Google/Facebook - demo only)

## Development Guidelines

- The app structure uses TypeScript strict mode - maintain type safety
- Use the existing type definitions in `src/types/index.ts`
- Follow the established pattern of bilingual content (English + Tamil)
- Leverage mock data from `src/lib/mock-data.ts` for development
- Add new UI components via shadcn/ui CLI when needed
- All fish prices are in Indian Rupees (₹)
- Date handling: Use Date objects, display in local timezone
- The target audience is Tamil Nadu residents - cultural context matters for recipe content and UI copy
- When adding new protected routes, they are automatically protected by middleware
- Public routes must be added to the `publicRoutes` array in `src/middleware.ts`
