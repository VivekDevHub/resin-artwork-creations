# RESIN ARTWORK CREATIONS
### *By Mahima Choukse — Handcrafted Luxury in Indore, India*

A complete, production-style, responsive full-stack e-commerce web boutique built for **Resin Artwork Creations**. This platform delivers a luxury handmade-art boutique experience with custom commissions, personalized flower preservation, real-time inventory management, Cash on Delivery, Razorpay online payments with zero-cost demo simulation, and an integrated admin portal.

---

## Brand Identity & Aesthetic

- **Brand Name**: Resin Artwork Creations
- **Founder & Artist**: Mahima Choukse
- **Studio Location**: Indore, Madhya Pradesh, India
- **Core Craft**: High-gloss epoxy resin wall art, geode clocks, preserved wedding garland (*varmala*) frames, scented soy wax candles, artisanal hampers, cold-pressed soaps, and couple hand castings.
- **Visual Design System**:
  - **Blush Pink**: `#F8DDE5`
  - **Soft Pink**: `#F4B6C2`
  - **Rose Accent**: `#D81B60`
  - **Deep Burgundy**: `#7A1738`
  - **Warm Cream**: `#FFF9F5`
  - **Metallic Gold**: `#C9A227` / `#DFBA3C`
  - **Dark Base**: `#2B1B20`
- **Typography**: *Cormorant Garamond* & *Playfair Display* for luxury serif headings, *Poppins* for body text, and *Great Vibes* script for bespoke artisan accents.

---

## Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom boutique design tokens, glassmorphism blur and smooth transitions
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **HTTP Client**: Axios with token injection interceptors
- **State Management**: React Context API (`AuthContext`, `CartContext`, `WishlistContext`, `ToastContext`)
- **Visual Celebration**: Canvas Confetti for order confirmation

### Backend
- **Runtime**: Node.js & Express.js (ES Modules)
- **Database**: MongoDB & Mongoose
- **Security**: JWT Authentication, bcryptjs password hashing, Helmet security headers, CORS, Express rate limiting
- **Payment Gateway**: Razorpay Node SDK with built-in `DEMO_PAYMENT_MODE` simulator
- **Logging**: Morgan HTTP logger

---

## Key Features

### 🛍️ Client & Customer Storefront
1. **Curated Hero Showcase**: Incorporates high-resolution brand banners, tagline badges, and interactive CTAs.
2. **8 Artisan Categories**: Resin Art, Resin Gifts, Scented Candles, Gift Hampers, Clocks, Handmade Soaps, Hand Casting, Personalized Gifts.
3. **20+ Demo Products**: Pre-seeded with authentic photography, prices, original strike-through discounts, material specifications, and care instructions.
4. **Interactive Product Cards**: Image hover transitions, instant Quick View modal, wishlist heart toggle, and fast Add to Bag button.
5. **Shop Catalog**: Multi-criteria filters by category, price range, and star rating, with flexible sorting (Featured, Price, Newest, Popular).
6. **Product Detail Page**: Multi-angle image gallery, custom name/quote personalization input, verified patron review submission, and related pieces.
7. **Slide-Over Cart Drawer & Cart Page**: Real-time totals, free shipping progress bar (Free shipping above ₹999), and coupon code validator (`WELCOME10`, `MAHIMA15`, `FESTIVE20`).
8. **Checkout Flow**: Support for **Cash on Delivery (COD)** and **Online Payment (Razorpay)** with built-in instant simulator when live gateway credentials are not present.
9. **Order Timeline Tracking**: 5-stage progress stepper (`Confirmed` → `Processing` → `Shipped` → `Out for Delivery` → `Delivered`) with courier notes and dispatch timestamps.
10. **Bespoke Custom Orders**: Commission intake form for wedding garland preservation, custom clocks, and name plaques, with instant WhatsApp handoff.
11. **Mobile Bottom Navigation**: Fixed bottom bar on mobile screens with badges for live cart and wishlist counts.
12. **Floating WhatsApp Assistance**: 1-click customer connection directly to Mahima Choukse.

### 🛡️ Administrative Portal (`/admin`)
1. **Executive Dashboard**: Real-time metrics for total revenue, total orders, catalog count, customer directory, and 6-month monthly revenue trends.
2. **Product Catalog Manager**: Add, edit, and delete products, update price and stock, change category, and toggle `Featured` / `Best Seller` badges.
3. **Fulfillment & Order Management**: Filter orders by status, inspect customer and shipping addresses, update status phases, and append courier tracking notes.
4. **Custom Inquiries Review**: Review custom commission requests, set formal quotes (₹), view client reference photos, and update inquiry statuses.
5. **Promotions & Coupons**: Create and manage discount codes, set max discount caps, and enforce minimum order values.
6. **Patron Directory**: View customer profiles, emails, phones, and locations.

---

## Credentials (Demo)

### 👑 Admin Account
- **URL**: `http://localhost:5174/admin/login`
- **Email**: `admin@resinartwork.com`
- **Password**: `Admin@123`
*(A 1-click test button is also provided directly on the login screen for quick evaluation)*

### 👤 Customer Account
- **URL**: `http://localhost:5174/login`
- **Email**: `priya.sharma@example.com`
- **Password**: `Customer@123`

---

## Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Local instance running at `mongodb://127.0.0.1:27017` or MongoDB Atlas URI)

### 2. Installation
Clone the repository and install all dependencies:

```bash
# In the project root directory
npm install
npm --prefix backend install
npm --prefix frontend install
```

### 3. Environment Variables Setup

#### Backend (`backend/.env`):
```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/resin_art_db
JWT_SECRET=super_secret_resin_art_jwt_key_2026_luxury_boutique
RAZORPAY_KEY_ID=rzp_test_resinart2026
RAZORPAY_KEY_SECRET=rzp_secret_resinart2026
CLIENT_URL=http://localhost:5174
DEMO_PAYMENT_MODE=true
NODE_ENV=development
```

#### Frontend (`frontend/.env`):
```env
VITE_API_URL=/api
VITE_RAZORPAY_KEY_ID=rzp_test_resinart2026
VITE_WHATSAPP_NUMBER=+919329028062
```

### 4. Seed the Database
Populate 20 products, 8 categories, 10 orders, customer accounts, coupons, and custom order inquiries:

```bash
npm run seed
```

### 5. Run the Application
Launch both backend and frontend concurrently:

```bash
npm run dev
```

- **Frontend**: `http://localhost:5174` (or `http://localhost:5173`)
- **Backend API**: `http://localhost:5001/api`
- **API Health Check**: `http://localhost:5001/api/health`

Alternatively, you can run them in separate terminals:
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

---

## Testing Payment Flows

### 💵 Cash on Delivery (COD)
1. Add any creation to your bag.
2. Proceed to checkout and select **Cash on Delivery**.
3. Click **Place Order**. You will immediately receive order confirmation with unique ID `RAC-2026-XXXXXX` and status `COD`.

### 💳 Online Payment (Razorpay & Demo Mode)
1. In checkout, select **Online Payment (Razorpay)**.
2. Because `DEMO_PAYMENT_MODE=true` is enabled, a simulation modal will appear confirming test mode.
3. Click **Simulate Successful Payment**. The order will be cryptographically verified and recorded as `Paid`.
4. *To switch to live Razorpay payments, provide your actual `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `backend/.env` and set `DEMO_PAYMENT_MODE=false`.*

---

## Deployment Guide

### Frontend Deployment (Vercel)
1. Import the repository into [Vercel](https://vercel.com).
2. Set **Root Directory** to `frontend`.
3. Set **Framework Preset** to `Vite`.
4. Add Environment Variable:
   - `VITE_API_URL`: Your deployed backend URL (e.g. `https://resin-art-backend.onrender.com/api`).
5. Deploy.

### Backend Deployment (Render or Railway)
1. Create a new **Web Service** on [Render](https://render.com) or [Railway](https://railway.app).
2. Set **Root Directory** to `backend`.
3. Set **Build Command**: `npm install`.
4. Set **Start Command**: `npm start`.
5. Configure Environment Variables:
   - `PORT`: `5001` (or automatic from cloud provider)
   - `MONGO_URI`: Your MongoDB Atlas connection string (e.g. `mongodb+srv://...`)
   - `JWT_SECRET`: Secure random string
   - `CLIENT_URL`: Your Vercel frontend URL
   - `DEMO_PAYMENT_MODE`: `true` (or `false` with real Razorpay keys)
6. Once deployed, run the seed command on the server or connect locally to seed the Atlas cluster:
   `MONGO_URI="mongodb+srv://..." npm run seed`.

---

## Project Structure

```text
resin-art-creation/
├── package.json               # Root scripts for concurrently running & seeding
├── README.md
├── src/assets/                # Original brand assets (logo.png, banners)
├── backend/
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   └── src/
│       ├── server.js          # Express server with Helmet, CORS & route mounting
│       ├── config/            # Mongoose DB connection
│       ├── models/            # User, Product, Category, Order, Review, Wishlist, CustomOrder, Coupon
│       ├── controllers/       # Auth, Product, Order, Payment, CustomOrder, Analytics
│       ├── routes/            # REST API endpoints
│       ├── middleware/        # JWT Protect, Admin Role, Error Handlers
│       └── utils/             # Database seeder (npm run seed)
└── frontend/
    ├── package.json
    ├── vite.config.js         # Vite dev server with proxy to :5001
    ├── tailwind.config.js     # Luxury design tokens (blush, burgundy, gold)
    ├── index.html             # Google Fonts, meta tags & Razorpay checkout script
    ├── public/assets/         # Brand logo and desktop/mobile banners
    └── src/
        ├── App.jsx            # All 22 routes, Protected & Admin guards
        ├── main.jsx           # Context providers wrapper
        ├── index.css          # Design system classes, glassmorphism, scrollbars
        ├── context/           # Auth, Cart, Wishlist, Toast
        ├── services/          # Axios API client with interceptors
        ├── layouts/           # RootLayout & AdminLayout
        ├── components/
        │   ├── common/        # Navbar, BottomNavigation, Footer, CartDrawer, ProductCard, RatingStars, QuickViewModal
        │   └── home/          # Hero, Categories, BestSellers, WhyChooseUs, CustomCTA, Reviews, SocialGallery, FAQ
        └── pages/
            ├── Home, Shop, ProductDetails, Categories, About, CustomOrders, Contact, Wishlist, Cart, Checkout, OrderSuccess
            ├── Login, Register, Account, Orders, OrderDetails, NotFound
            └── admin/         # AdminDashboard, AdminProducts, AdminOrders, AdminCustomers, AdminCustomOrders, AdminAnalytics
```

---

## License & Credits

Artisan concepts, photography curations, and brand identity designed for **Resin Artwork Creations by Mahima Choukse**, Indore, Madhya Pradesh, India.
