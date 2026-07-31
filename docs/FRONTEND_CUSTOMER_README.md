Frontend customer scaffolding
===========================

What was added
- `components/CustomerContext.tsx` — client-side customer context with `register`, `login`, `logout`, and localStorage persistence for demo flows.
- `data/mockCustomers.ts` — demo customer fixtures.
- `app/register/page.tsx` and `app/login/page.tsx` — simple register/login forms that call `CustomerContext` methods.
- `app/api/auth/route.ts` and `app/api/customers/route.ts` — lightweight API stubs for demo purposes.
- `app/layout.tsx` — wrapped app with `CustomerProvider`.
- Adjusted `components/BookingPaymentFlow.tsx` and `components/InAppChat.tsx` to use `CustomerContext` where useful.
- Header in `app/page.tsx` now shows login/register or the logged-in customer's name and logout.

Notes on production
- Authentication, password hashing, email verification, session tokens, and secure cookies must be implemented on a backend service.
- Payments/escrow should be integrated with a payment provider and verified via webhooks.
- Chat and booking persistence must be stored server-side for reliability and audit.

How to test locally
1. Start dev server:
```bash
npm install
npm run dev
```
2. Open `http://localhost:3000` and try: register or sign in with a demo email from `data/mockCustomers.ts` (e.g. `aisha@example.com`).
3. Test booking flow: pick an artisan, click `Book Artisan`, and confirm reservation. The booking UI will show confirmation and include the demo customer info in the booking payload.
