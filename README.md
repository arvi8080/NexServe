# 🌸 GlowHome — Luxury On-Demand Beauty, Cleaning & Home Services Marketplace

[![Production Frontend](https://img.shields.io/badge/Vercel-Frontend%20Live-black?logo=vercel)](https://glowhome.vercel.app/)
[![Production Backend](https://img.shields.io/badge/Render-Backend%20Live-informational?logo=render)](https://nexserve-back.onrender.com/)
[![Swagger Docs](https://img.shields.io/badge/OpenAPI-Swagger%20UI-green?logo=swagger)](https://nexserve-back.onrender.com/api-docs)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5.2-lightgrey?logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?logo=prisma)](https://www.prisma.io/)

**GlowHome** is an enterprise-grade, multi-country doorstep home services marketplace built to the standard of **Urban Company**, **Airbnb**, **Uber**, and **Amazon**. GlowHome connects certified, background-checked beauty, spa, cleaning, and maintenance professionals directly with customers, delivering 100% sealed mono-dose hygiene experiences right at their doorstep.

---

## 🌐 Live Production Links

- **Frontend Marketplace Application**: [https://glowhome.vercel.app/](https://glowhome.vercel.app/)
- **Backend API Gateway**: [https://nexserve-back.onrender.com/](https://nexserve-back.onrender.com/)
- **Interactive Swagger API Docs**: [https://nexserve-back.onrender.com/api-docs](https://nexserve-back.onrender.com/api-docs)
- **API Health Endpoint**: [https://nexserve-back.onrender.com/health](https://nexserve-back.onrender.com/health)

---

## ✨ Key Platform Features

### 🇮🇳 🇳🇵 1. Multi-Country Region Pricing Architecture
- Supports independent currencies (**INR ₹** in India and **NPR रु** in Nepal) with zero automatic currency conversion bugs.
- Country selector dropdown updates local pricing, tax rules (GST vs VAT), state/city dropdowns, and regional payment options.

### 🏷️ 2. Dynamic Urban Company Pricing Engine
- **Master Service Catalog (`Service`)**: Created and governed exclusively by platform Admins with strict `minPrice` and `maxPrice` caps.
- **Vendor Offering (`VendorService`)**: Independent pricing configured per vendor per region. Vendors can adjust price, discount, and duration within Admin-defined range caps.

### 🛡️ 3. 5-Stage Vendor Verification & Trust Management
- **Verification Workflow**: `Registration` ➔ `Document Upload` ➔ `Identity Verification` ➔ `Background Clearance` ➔ `Skill Audit` ➔ `Bank Verification` ➔ `Admin Review` ➔ `Approved`.
- **0–100 Trust Score Algorithm**: Evaluates Govt ID, Police Verification, Skill Diploma, Bank Account Encryption, and Customer Ratings.
- **Verification Gate**: Unapproved (`PENDING` or `REJECTED`) vendors are restricted from receiving bookings, toggling live availability, or requesting wallet payouts.

### 🔒 4. Enterprise 5-Role Access Control (RBAC)
Strict backend authorization and IDOR protection enforced across 5 roles:
- **`GUEST`**: Public treatment catalog, Home, Services, About, Contact, Login, Register.
- **`CUSTOMER`**: Customer Dashboard, Bookings, Wallet, Notifications, Reviews, Address Book, Support Desk, Settings.
- **`VENDOR (PENDING)`**: Profile, Upload Credentials, Verification Center, Support.
- **`VENDOR (APPROVED)`**: Vendor Dashboard, My Services, Availability, Earnings, Vendor Wallet, Reviews.
- **`ADMIN`**: Admin Dashboard, Vendor Approvals, Analytics, ERP, Branch Management.
- **`SUPER_ADMIN`**: Full platform control (System config, Feature Flags, Commission Rules, Security Matrix, Global Audit Logs).

### 🚀 5. Lean MVP Launch Strategy
- **Direct Vendor Payment**: Supports `Cash`, `PhonePe`, `Google Pay`, `Paytm`, `eSewa`, `Khalti`, and `Fonepay` directly to vendor accounts. Controlled via `ENABLE_PLATFORM_PAYMENT=false`.
- **Manual Locality Selection**: Manual `Country` ➔ `State` ➔ `City` ➔ `Area` dropdown selection without Google Maps API dependencies (`ENABLE_GOOGLE_MAPS=false`).

---

## 📂 Project Architecture

```
NexServe/
├── backend/                  # Express + TypeScript + Prisma ORM REST API
│   ├── prisma/               # Database schema & migrations (PostgreSQL)
│   ├── src/
│   │   ├── config/           # Environment validation (Zod) & database clients
│   │   ├── common/           # RBAC middleware, JWT auth, error handlers, utils
│   │   ├── docs/             # Swagger OpenAPI spec definitions
│   │   ├── modules/          # Auth, User, Vendor, Admin, Customer, Service, Booking, Payment...
│   │   ├── routes/           # Central API v1 router
│   │   ├── socket/           # Real-time WebSocket connection manager
│   │   └── server.ts         # Server entry point (Host: 0.0.0.0, PORT: 5000)
│   ├── Dockerfile            # Multi-stage production container setup
│   └── package.json
│
├── frontend/                 # React 19 + TypeScript + Vite + TailwindCSS Single Page App
│   ├── src/
│   │   ├── api/              # Axios API client services with JWT interceptors
│   │   ├── components/       # UI components (Button, Modal, Badge, Navbar, Footer, Sidebar...)
│   │   ├── context/          # Auth, Toast, Country, and Theme contexts
│   │   ├── layouts/          # Auth, Customer, Vendor, and Admin dashboard layouts
│   │   ├── middleware/       # Client-side RBAC authorization engine
│   │   ├── pages/            # Public, Auth, Customer, Vendor, and Admin view pages
│   │   ├── routes/           # Protected React Router v6 definitions
│   │   └── types/            # TypeScript interfaces & models
│   ├── Dockerfile            # Frontend production build & Nginx container
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.x` or `v22.x`
- **npm**: `v10.x`+
- **PostgreSQL**: PostgreSQL database (Neon Cloud, Railway, or Local instance)

### 1. Environment Setup

#### Backend Environment (`backend/.env`)
Copy `backend/.env.example` to `backend/.env`:
```env
DATABASE_URL="postgresql://username:password@ep-sample-host.us-east-1.aws.neon.tech/glowhome?sslmode=require"
PORT=5000
HOST=0.0.0.0
JWT_ACCESS_SECRET=GlowHome_Access_Secret_Key_2026_123456789
JWT_REFRESH_SECRET=GlowHome_Refresh_Secret_Key_2026_987654321
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

#### Frontend Environment (`frontend/.env`)
Copy `frontend/.env.example` to `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
PLATFORM_NAME=GlowHome
PLATFORM_WEBSITE=http://localhost:5173
PLATFORM_SUPPORT_EMAIL=glowhome.help@gmail.com
ENABLE_PLATFORM_PAYMENT=false
PAYMENT_MODE=direct
ENABLE_GOOGLE_MAPS=false
DEFAULT_COMMISSION=0
```

---

### 2. Installation & Running Locally

#### Run Backend Server
```bash
cd backend
npm install
npx prisma generate
npm run dev
# Server running on http://localhost:5000
```

#### Run Frontend Application
```bash
cd frontend
npm install
npm run dev
# Client app running on http://localhost:5173
```

---

### 3. Production Build & Verification

```bash
# Build Backend
cd backend
npm run build

# Build Frontend
cd frontend
npm run build
```

---

## 🛠️ Tech Stack & Libraries

- **Frontend**: React 19, TypeScript, Vite 8, TailwindCSS, Framer Motion, Lucide React, Axios, React Router v6.
- **Backend**: Node.js, Express 5, TypeScript, Prisma ORM 6, Zod, Socket.IO, JWT, Helmet, CORS, Swagger UI.
- **Database**: PostgreSQL on Neon Cloud.
- **Deployment**: Vercel (Frontend), Render (Backend), Docker Containerization.

---

## 📞 Support & Community

- **Platform Support Email**: [glowhome.help@gmail.com](mailto:glowhome.help@gmail.com)
- **Support Hotline**: `+91 1800 200 8899`
- **Documentation**: [https://nexserve-back.onrender.com/api-docs](https://nexserve-back.onrender.com/api-docs)

---

© 2026 **GlowHome Technologies Inc.** All rights reserved.
