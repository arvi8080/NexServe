# 401 Unauthorized Fix - Implementation Plan

## Root Causes
1. Global `/api/v1` auth middleware blocks public endpoints (`/home`, `/countries`, `/cities`, `/payment-gateways`)
2. `/auth/refresh` requires a valid access token (refresh loop)
3. Public endpoints missing on backend
4. Login response shape mismatch (`data.user` vs `res.user`)
5. Refresh token never stored in localStorage
6. Notification API path mismatches
7. Frontend API calls don't unwrap `{ success, data }` responses

## Backend Tasks
- [x] 1. Remove global auth middleware from `app.ts` (routes self-protect)
- [x] 2. Make `/auth/refresh` public in `auth.routes.ts`
- [x] 3. Create public module (`/home`, `/countries`, `/states`, `/cities`, `/payment-gateways`)
- [x] 4. Register public routes in `routes/index.ts`
- [x] 5. Create customer module (`/customer/dashboard`, `/customer/wishlist`)

## Frontend Tasks
- [ ] 6. Add refresh token helpers to `utils/storage.ts`
- [ ] 7. Map backend response shape in `api/auth.ts`
- [ ] 8. Store refresh token in `context/AuthContext.tsx`
- [ ] 9. Add `refreshToken` to `AuthResponse` in `types/index.ts`
- [ ] 10. Fix refresh flow + unwrap responses in `api/axiosInstance.ts`
- [ ] 11. Fix notification paths + unwrap in `api/notification.ts`
- [ ] 12. Unwrap responses in `api/country.api.ts` and `api/home.api.ts`

## Follow-up
- [ ] Build frontend & backend, run dev servers, verify no 401s

