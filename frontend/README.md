# 🌸 GlowHome — Frontend Marketplace & Dashboard Application

The React 19 + TypeScript + Vite + TailwindCSS frontend application for **GlowHome**, providing luxury doorstep salon, spa, cleaning, and maintenance service booking.

---

## 🌐 Live Production Application
- **Frontend App**: [https://glowhome.vercel.app/](https://glowhome.vercel.app/)

---

## 🛠️ Tech Stack & Architecture
- **Framework**: React 19, Vite 8, TypeScript 5.9
- **Styling**: TailwindCSS, Glassmorphism, CSS Custom Tokens
- **Icons & Motion**: Lucide React, Framer Motion
- **HTTP Client**: Axios with JWT Interceptors (`axiosInstance.ts`)
- **State & Context**: AuthContext, ToastContext, CountryContext (INR ₹ vs NPR रु), ThemeContext

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 🔒 Client-Side RBAC & Authorization
- **`GUEST`**: Treatment catalog, Home, Services, About, Contact.
- **`CUSTOMER`**: Customer Portal Overview, Bookings, Wishlist, Wallet, Notifications, Reviews, Address Book, Profile, Support, Settings.
- **`VENDOR`**: Vendor Operations Center, My Services, Availability, Earnings, Vendor Profile, Verification Hub.
- **`ADMIN`**: Admin Analytics, Vendor Approvals, Branch Manager, ERP, Security Matrix.
