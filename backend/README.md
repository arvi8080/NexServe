# 🌸 GlowHome — Backend REST API Engine & Microservices

The Node.js + Express 5 + TypeScript + Prisma ORM backend service powering **GlowHome**.

---

## 🌐 Live Production Endpoints
- **API Gateway**: [https://nexserve-back.onrender.com/](https://nexserve-back.onrender.com/)
- **Swagger Documentation**: [https://nexserve-back.onrender.com/api-docs](https://nexserve-back.onrender.com/api-docs)
- **Health Check**: [https://nexserve-back.onrender.com/health](https://nexserve-back.onrender.com/health)
- **V1 API Gateway**: [https://nexserve-back.onrender.com/api/v1](https://nexserve-back.onrender.com/api/v1)

---

## 🛠️ Tech Stack & Architecture
- **Runtime**: Node.js v20/v22, Express 5, TypeScript 5.9
- **ORM & Database**: Prisma ORM 6 with PostgreSQL (Neon Cloud)
- **Authentication**: 256-bit JWT Access & Refresh Tokens (`bcrypt`, `jsonwebtoken`)
- **Validation**: Zod schema validation
- **Documentation**: Swagger UI / OpenAPI 3.0.3
- **Security**: Helmet, CORS, Express Rate Limit, HPP, Sanitizers

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run development server
npm run dev

# Compile TypeScript for production
npm run build
```
