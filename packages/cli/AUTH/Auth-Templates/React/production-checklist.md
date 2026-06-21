# ShipKit Auth Template - Production Readiness Checklist

Before deploying this Auth Template or using it in assembly, verify the following:

## Core Assembly
- [x] All required placeholders are present: `{{AUTH_ENGINE}}`, `{{DATABASE_ADAPTER}}`, `{{PROVIDERS}}`, `{{ENV_CONFIG}}`
- [x] All required injection markers exist exactly as spelled: `AUTH_ENGINE_INJECTION`, `DATABASE_ADAPTER_INJECTION`, `PROVIDER_REGISTRATION_INJECTION`
- [x] `src/auth/config.ts` exports `authConfig`
- [x] `src/auth/providers.ts` exports `providers`
- [x] `src/auth/session.ts` exports `getSession`
- [x] `src/lib/auth.ts` exports `createAuthConfig`, `createRouteProtection`, `getCurrentSession`

## Security
- [x] Forms do not log sensitive data (passwords, tokens) to the console in production
- [x] Passwords are obfuscated in UI via `PasswordInput`
- [x] Client-side validation uses `zod` before submitting requests
- [x] Secrets are NEVER hardcoded in the template
- [x] Environment variable placeholders are correctly formatted in `.env.example`

## UX & UI
- [x] Support for Light Mode
- [x] Support for Dark Mode
- [x] Responsive layout (Mobile, Tablet, Desktop)
- [x] No horizontal scrolling on mobile screens
- [x] Loading states exist on all async actions (buttons show spinners)
- [x] Error states display inline or clearly without breaking layout
- [x] Password strength indicator provides immediate feedback
- [x] Premium styling (using Tailwind CSS, Shadcn conventions)
