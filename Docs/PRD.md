# Product Requirements Document (PRD)
# Fresh Fish Marketing Application

---

## 1. Project Overview

### 1.1 Product Name
**FreshCatch** - Fresh Fish Delivery Application

### 1.2 Product Vision
A mobile/web application that connects local fish vendors with customers, enabling fresh fish delivery with zone-based service, multi-language support, and an integrated recipe platform.

### 1.3 Target Audience
- **Primary Users:** Home consumers looking for fresh fish delivery
- **Secondary Users:** Small restaurants, catering services
- **Geography:** Tamil Nadu and surrounding regions (expandable)

### 1.4 Platform
- Mobile App (Android & iOS)
- Web Application (Progressive Web App)

---

## 2. Features & Requirements

### 2.1 Product Catalog - Fish Varieties

#### 2.1.1 Multi-Language Support
| Requirement | Description |
|-------------|-------------|
| Languages | English, Tamil, and Regional languages |
| Content | Fish names, descriptions, cooking suggestions |
| User Preference | Language selection during registration/settings |

#### 2.1.2 Fish Listing Details
Each fish variety should display:
- Fish name (in selected language)
- High-quality images (multiple angles)
- Price per kg / piece
- Availability status (In Stock / Out of Stock / Limited)
- Freshness indicator (Caught date/time)
- Fish type tags (Sea fish, River fish, Prawns, Crabs, etc.)
- Cleaning options (Whole, Cleaned, Cut pieces, Fillet)
- Nutritional information
- Best cooking methods

#### 2.1.3 Categories
```
├── Sea Fish (கடல் மீன்)
│   ├── Seer Fish (வஞ்சிரம்)
│   ├── Pomfret (வாவல்)
│   ├── King Fish (நெய்மீன்)
│   └── ...
├── River Fish (ஆற்று மீன்)
│   ├── Rohu (கெண்டை)
│   ├── Catla (கட்லா)
│   └── ...
├── Prawns & Shrimp (இறால்)
├── Crabs (நண்டு)
├── Squid & Cuttlefish (கணவாய்)
└── Special/Seasonal
```

---

### 2.2 Customer Registration & Profile

#### 2.2.1 Registration Fields
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Full Name | Text | Yes | Min 3 characters |
| Mobile Number (Primary) | Phone | Yes | 10 digits, OTP verification |
| Mobile Number (Alternative) | Phone | No | 10 digits |
| Email | Email | No | Valid email format |
| Full Address | Text | Yes | Min 10 characters |
| Location | GPS/Map | Yes | Select from map/app |
| Preferred Language | Dropdown | Yes | English/Tamil/Others |
| Profile Picture | Image | No | Max 5MB |

#### 2.2.2 Registration Flow
```
┌─────────────────┐
│  Enter Mobile   │
│     Number      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   OTP Verify    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Enter Details  │
│  Name, Email,   │
│  Alt. Mobile    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Add Address    │
│  (Map Select)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Select Zone    │
│  & Language     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Registration   │
│   Complete!     │
└─────────────────┘
```

#### 2.2.3 Social Login Options
- Google Sign-In
- Facebook Login
- Apple ID (iOS)

---

### 2.3 Referral & Discount System

#### 2.3.1 Referral Program
| Feature | Description |
|---------|-------------|
| Referral Code | Unique code for each registered user |
| Referrer Benefit | Discount on next order (e.g., ₹50 off) |
| Referee Benefit | Discount on first order (e.g., ₹30 off) |
| Tracking | Dashboard to track referrals & earnings |
| Limits | Max referrals per month (optional) |

#### 2.3.2 Discount Types
- **Referral Discount:** Applied on next order after successful referral
- **First Order Discount:** New user welcome offer
- **Loyalty Points:** Points per order, redeemable for discounts
- **Festival Offers:** Special occasion discounts
- **Bulk Order Discount:** Orders above certain amount

#### 2.3.3 Referral Flow
```
User A shares referral code
         │
         ▼
User B registers with code
         │
         ▼
User B completes first order
         │
         ▼
User A gets discount credit for next order
User B gets first order discount
```

---

### 2.4 Zone-Based Delivery System

#### 2.4.1 Zone Configuration
| Zone Type | Radius | Delivery Charge | Min Order |
|-----------|--------|-----------------|-----------|
| Zone A (Primary) | 0-5 km | Free | ₹300 |
| Zone B (Secondary) | 5-10 km | ₹30 | ₹400 |
| Zone C (Extended) | 10-15 km | ₹50 | ₹500 |
| Zone D (Outer) | 15-25 km | ₹80 | ₹700 |
| Outside Zones | >25 km | Not Serviceable | - |

#### 2.4.2 Zone Features
- GPS-based automatic zone detection
- Manual pincode entry option
- Zone availability check before order
- Different delivery time slots per zone
- Zone-specific product availability

#### 2.4.3 Zone Limit Notifications
- Alert when address is outside serviceable area
- Suggest nearest serviceable location
- Waitlist for new zone requests

---

### 2.5 Recipe Section

#### 2.5.1 Recipe Content Types
| Content Type | Format | Description |
|--------------|--------|-------------|
| Recipe Videos | MP4/YouTube | Step-by-step cooking videos |
| Recipe Articles | Text + Images | Written recipes with photos |
| Quick Tips | Short clips | 30-60 sec cooking tips |
| Chef Specials | Premium | Expert chef recipes |

#### 2.5.2 Recipe Features
- **Filter by Fish Type:** Show recipes for specific fish
- **Difficulty Level:** Easy, Medium, Hard
- **Cooking Time:** Quick (<30 min), Medium, Long
- **Cuisine Type:** Tamil, Kerala, Bengali, Continental, etc.
- **Diet Tags:** Spicy, Mild, Kids-friendly, Diet-friendly
- **Save Favorites:** Bookmark recipes
- **Share Recipes:** Social media sharing
- **Buy Ingredients:** Direct link to add fish to cart

#### 2.5.3 Recipe Card Layout
```
┌─────────────────────────────────┐
│  [Recipe Video/Image]           │
├─────────────────────────────────┤
│  Recipe Name                    │
│  ⭐ 4.5 | ⏱ 30 mins | 🍽 4 ppl  │
├─────────────────────────────────┤
│  Fish: Seer Fish (வஞ்சிரம்)     │
│  [Add to Cart - ₹450/kg]        │
├─────────────────────────────────┤
│  Ingredients | Steps | Reviews  │
└─────────────────────────────────┘
```

---

### 2.6 Shopping Cart & Checkout Flow

#### 2.6.1 Cart Features
- Add/Remove items
- Quantity adjustment
- Cleaning preference selection
- Save for later
- Apply coupon/referral code
- Price breakdown display

#### 2.6.2 Complete Order Flow
```
┌─────────────────┐
│    BROWSE       │
│  Fish Catalog   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   ADD TO CART   │
│  Select Qty &   │
│  Cleaning Type  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   GO TO CART    │
│  Review Items   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  SELECT ITEMS   │
│  Final Selection│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    CHECKOUT     │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│         VERIFY ADDRESS              │
│  ┌─────────────┐  ┌──────────────┐  │
│  │ Use Saved   │  │ Add New      │  │
│  │ Address     │  │ Address      │  │
│  └─────────────┘  └──────────────┘  │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│      DELIVERY TIME SLOT             │
│  ┌─────────────────────────────┐    │
│  │ 🌅 Sunrise Delivery         │    │
│  │    (6 AM - 8 AM)            │    │
│  │    For early morning cook   │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ 🌞 Morning Delivery         │    │
│  │    (8 AM - 12 PM)           │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ 🌆 Evening Delivery         │    │
│  │    (4 PM - 7 PM)            │    │
│  └─────────────────────────────┘    │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│           PAYMENT                   │
│  ┌──────────┐ ┌──────────┐          │
│  │   UPI    │ │  Card    │          │
│  └──────────┘ └──────────┘          │
│  ┌──────────┐ ┌──────────┐          │
│  │  Wallet  │ │   COD    │          │
│  └──────────┘ └──────────┘          │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────┐
│  ORDER PLACED   │
│  Order ID: #123 │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│        POST-ORDER FEATURES          │
│                                     │
│  📧 Order Confirmation SMS/Email    │
│  📅 Delivery Date Acknowledgment    │
│  🚚 Real-time Order Tracking        │
│  📍 Delivery Partner Location       │
│  📞 Contact Delivery Person         │
│  📝 Delivery Instructions           │
└─────────────────────────────────────┘
```

---

### 2.7 Order Tracking & Delivery

#### 2.7.1 Order Status Flow
```
Order Placed → Confirmed → Processing → Out for Delivery → Delivered
     │             │            │              │              │
     ▼             ▼            ▼              ▼              ▼
  [Email/      [Vendor      [Packing      [Live GPS      [Delivery
   SMS]        Accepted]     Started]      Tracking]      Photo]
```

#### 2.7.2 Tracking Features
| Feature | Description |
|---------|-------------|
| Real-time GPS | Live location of delivery partner |
| ETA Display | Estimated time of arrival |
| Status Updates | Push notifications at each stage |
| Delivery Partner Info | Name, photo, contact number |
| Delivery Instructions | Special instructions for delivery |
| Contactless Delivery | Option for no-contact delivery |
| Delivery Photo | Photo proof of delivery |

#### 2.7.3 Delivery Time Slots
| Slot Name | Time | Description |
|-----------|------|-------------|
| Sunrise Delivery | 6:00 AM - 8:00 AM | For early morning cooking |
| Morning Slot | 8:00 AM - 12:00 PM | Standard morning delivery |
| Afternoon Slot | 12:00 PM - 4:00 PM | Mid-day delivery |
| Evening Slot | 4:00 PM - 7:00 PM | Evening delivery |

---

## 3. Technical Architecture

### 3.1 Technology Stack (Recommended)

#### Frontend
| Platform | Technology |
|----------|------------|
| Web App | Next.js 14 + Tailwind CSS + shadcn/ui |
| Admin Panel | Next.js 14 + Tailwind CSS + shadcn/ui |
| Mobile App | React Native (Phase 2) |

> **Current Focus:** Web & Admin UI development using Next.js 14 with Tailwind CSS and shadcn/ui component library for consistent, modern design system.

#### Backend
| Component | Technology |
|-----------|------------|
| API Server | Node.js (Express) / Python (FastAPI) |
| Database | PostgreSQL (Primary) + Redis (Cache) |
| File Storage | AWS S3 / Cloudinary |
| Search | Elasticsearch (for fish search) |
| Real-time | Socket.io (for tracking) |

#### Third-Party Services
| Service | Provider Options |
|---------|------------------|
| Payment Gateway | Razorpay / PayTM / PhonePe |
| SMS Gateway | MSG91 / Twilio |
| Push Notifications | Firebase Cloud Messaging |
| Maps & Location | Google Maps API |
| Analytics | Google Analytics / Mixpanel |

### 3.2 Database Schema (Core Tables)

```
Users
├── id (PK)
├── name
├── mobile_primary
├── mobile_alternative
├── email
├── password_hash
├── referral_code
├── referred_by
├── preferred_language
├── created_at
└── updated_at

Addresses
├── id (PK)
├── user_id (FK)
├── full_address
├── landmark
├── latitude
├── longitude
├── zone_id (FK)
├── is_default
└── address_type (Home/Work/Other)

Zones
├── id (PK)
├── zone_name
├── center_lat
├── center_lng
├── radius_km
├── delivery_charge
├── min_order_amount
├── is_active
└── delivery_slots (JSON)

Fish_Products
├── id (PK)
├── name_english
├── name_tamil
├── name_regional
├── category_id (FK)
├── description
├── price_per_kg
├── price_per_piece
├── images (JSON)
├── cleaning_options (JSON)
├── availability_status
├── nutritional_info (JSON)
└── is_active

Orders
├── id (PK)
├── user_id (FK)
├── address_id (FK)
├── order_status
├── delivery_slot
├── delivery_date
├── subtotal
├── delivery_charge
├── discount_amount
├── total_amount
├── payment_method
├── payment_status
├── special_instructions
├── created_at
└── updated_at

Order_Items
├── id (PK)
├── order_id (FK)
├── product_id (FK)
├── quantity
├── unit (kg/piece)
├── cleaning_type
├── unit_price
└── total_price

Recipes
├── id (PK)
├── title_english
├── title_tamil
├── fish_product_id (FK)
├── video_url
├── content
├── difficulty_level
├── cooking_time
├── servings
├── cuisine_type
├── ingredients (JSON)
├── steps (JSON)
└── is_active

Referrals
├── id (PK)
├── referrer_id (FK)
├── referee_id (FK)
├── referral_code_used
├── discount_amount
├── status (pending/credited)
└── created_at
```

---

## 4. User Interface Screens

### 4.1 Customer App Screens

```
📱 Customer App
├── 🏠 Home
│   ├── Search Bar
│   ├── Categories Carousel
│   ├── Today's Fresh Catch (Featured)
│   ├── Popular Items
│   ├── Recipe Suggestions
│   └── Offers Banner
│
├── 🐟 Fish Catalog
│   ├── Category Filter
│   ├── Sort Options
│   ├── Fish Grid/List View
│   └── Fish Detail Page
│
├── 📖 Recipes
│   ├── Recipe Categories
│   ├── Video Recipes
│   ├── Written Recipes
│   └── Recipe Detail Page
│
├── 🛒 Cart
│   ├── Cart Items List
│   ├── Quantity Editor
│   ├── Coupon Input
│   ├── Price Summary
│   └── Checkout Button
│
├── 📦 Orders
│   ├── Active Orders (with tracking)
│   ├── Past Orders
│   ├── Order Detail Page
│   └── Reorder Option
│
├── 👤 Profile
│   ├── Personal Info
│   ├── Saved Addresses
│   ├── Referral Section
│   ├── Wallet/Credits
│   ├── Language Settings
│   ├── Notifications Settings
│   └── Help & Support
│
└── 🔔 Notifications
    ├── Order Updates
    ├── Offers & Promotions
    └── New Arrivals
```

### 4.2 Admin Panel Screens

```
💻 Admin Panel
├── 📊 Dashboard
│   ├── Today's Orders
│   ├── Revenue Stats
│   ├── Active Deliveries
│   └── Low Stock Alerts
│
├── 🐟 Product Management
│   ├── Add/Edit Fish
│   ├── Category Management
│   ├── Inventory Management
│   └── Price Updates
│
├── 📦 Order Management
│   ├── New Orders
│   ├── Processing Orders
│   ├── Delivery Assignment
│   └── Order History
│
├── 👥 User Management
│   ├── Customer List
│   ├── Delivery Partners
│   └── Admin Users
│
├── 🗺️ Zone Management
│   ├── Zone Configuration
│   ├── Delivery Charges
│   └── Coverage Map
│
├── 🎁 Promotions
│   ├── Coupon Management
│   ├── Referral Settings
│   └── Banner Management
│
├── 📖 Recipe Management
│   ├── Add/Edit Recipes
│   ├── Video Upload
│   └── Recipe Categories
│
└── 📈 Reports
    ├── Sales Reports
    ├── Customer Reports
    ├── Delivery Reports
    └── Product Reports
```

---

## 5. API Endpoints (Core)

### 5.1 Authentication APIs
```
POST   /api/auth/send-otp          # Send OTP to mobile
POST   /api/auth/verify-otp        # Verify OTP
POST   /api/auth/register          # Complete registration
POST   /api/auth/login             # Login
POST   /api/auth/social-login      # Google/Facebook login
POST   /api/auth/refresh-token     # Refresh JWT token
POST   /api/auth/logout            # Logout
```

### 5.2 Product APIs
```
GET    /api/products               # List all fish products
GET    /api/products/:id           # Get product details
GET    /api/products/category/:id  # Products by category
GET    /api/products/search        # Search products
GET    /api/categories             # List categories
```

### 5.3 Cart & Order APIs
```
GET    /api/cart                   # Get user cart
POST   /api/cart/add               # Add item to cart
PUT    /api/cart/update            # Update cart item
DELETE /api/cart/remove/:id        # Remove from cart
POST   /api/cart/apply-coupon      # Apply coupon code

POST   /api/orders                 # Create new order
GET    /api/orders                 # Get user orders
GET    /api/orders/:id             # Get order details
GET    /api/orders/:id/track       # Get tracking info
PUT    /api/orders/:id/cancel      # Cancel order
```

### 5.4 User APIs
```
GET    /api/user/profile           # Get profile
PUT    /api/user/profile           # Update profile
GET    /api/user/addresses         # Get saved addresses
POST   /api/user/addresses         # Add new address
PUT    /api/user/addresses/:id     # Update address
DELETE /api/user/addresses/:id     # Delete address
GET    /api/user/referrals         # Get referral info
```

### 5.5 Recipe APIs
```
GET    /api/recipes                # List recipes
GET    /api/recipes/:id            # Get recipe details
GET    /api/recipes/fish/:id       # Recipes for specific fish
GET    /api/recipes/search         # Search recipes
POST   /api/recipes/favorite       # Add to favorites
```

### 5.6 Zone APIs
```
POST   /api/zones/check            # Check zone by coordinates
GET    /api/zones/delivery-slots   # Get available slots
```

---

## 6. Non-Functional Requirements

### 6.1 Performance
| Metric | Target |
|--------|--------|
| Page Load Time | < 3 seconds |
| API Response Time | < 500ms |
| App Size | < 50MB |
| Concurrent Users | 10,000+ |

### 6.2 Security
- JWT-based authentication
- OTP verification for mobile
- HTTPS for all communications
- PCI DSS compliance for payments
- Data encryption at rest and transit
- Rate limiting on APIs

### 6.3 Scalability
- Horizontal scaling capability
- CDN for static assets
- Database read replicas
- Microservices architecture (future)

### 6.4 Availability
- 99.9% uptime target
- Auto-failover mechanisms
- Regular backups
- Disaster recovery plan

---

## 7. Future Enhancements (Phase 2)

| Feature | Description |
|---------|-------------|
| Subscription Model | Weekly/Monthly fish subscription boxes |
| B2B Portal | Separate portal for restaurants/hotels |
| Multi-Vendor | Platform for multiple fish vendors |
| AI Recommendations | Personalized fish suggestions |
| Voice Search | Tamil voice search capability |
| Chatbot | AI chatbot for customer support |
| Loyalty Program | Tiered loyalty rewards |
| Fish Freshness Blockchain | Traceability from catch to delivery |

---

## 8. Success Metrics (KPIs)

| Metric | Target (Month 6) |
|--------|------------------|
| Registered Users | 10,000+ |
| Monthly Active Users | 5,000+ |
| Daily Orders | 200+ |
| Average Order Value | ₹500+ |
| Customer Retention Rate | 40%+ |
| Delivery Success Rate | 98%+ |
| App Rating | 4.5+ stars |
| Customer Satisfaction | 90%+ |

---

## 9. Project Milestones

| Phase | Deliverables |
|-------|--------------|
| Phase 1 - MVP | User registration, Product catalog, Basic ordering, Zone delivery |
| Phase 2 - Enhancement | Recipe section, Referral system, Advanced tracking |
| Phase 3 - Scale | Multi-language, Performance optimization, Marketing tools |
| Phase 4 - Growth | Subscription, B2B, AI features |

---

## 10. Appendix

### 10.1 Glossary
| Term | Definition |
|------|------------|
| Zone | Geographic delivery area with specific rules |
| Sunrise Delivery | Early morning delivery slot (6-8 AM) |
| Cleaning Options | Fish preparation types (whole, cleaned, fillet) |
| COD | Cash on Delivery |

### 10.2 References
- Original requirements document (handwritten notes)
- Competitor analysis: FreshToHome, Licious, TenderCuts

---

*Document Version: 1.0*
*Created: December 2024*
*Last Updated: December 2024*
