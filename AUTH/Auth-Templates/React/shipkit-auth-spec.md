# ShipKit Auth Specification (shipkit-auth-spec.md)

Version: 1.0
Status: Canonical Contract

## Purpose

This specification defines the contract for all ShipKit Auth Templates.

Auth Templates are framework-specific UI and integration layers.
They MUST NOT contain database-specific logic.
They MUST NOT contain provider-specific logic.
They MUST NOT contain auth-engine-specific logic.

Templates are assembly targets.

The ShipKit assembler injects:
- Database Adapter
- Auth Engine
- Providers

into a framework template.

---

## Supported Frameworks

- NextJS
- React
- Remix
- TanStack
- Astro

All frameworks MUST expose identical authentication capabilities.

---

## Assembly Inputs

Template MUST accept:

{{AUTH_ENGINE}}
{{DATABASE_ADAPTER}}
{{PROVIDERS}}
{{ENV_CONFIG}}

These tokens are reserved and MUST NOT be renamed.

---

## Required Routes

Every template MUST implement:

/login
/signup
/forgot-password

Optional:

/verify-email
/reset-password
/profile

---

## Required Components

LoginForm
SignupForm
ForgotPasswordForm

Components MUST be isolated and reusable.

---

## Required Folder Contract

Framework implementations may differ internally, but MUST expose:

src/
├── auth/
│   ├── config.ts
│   ├── providers.ts
│   └── session.ts
│
├── components/
│   └── auth/
│       ├── LoginForm
│       ├── SignupForm
│       └── ForgotPasswordForm
│
├── routes/
│   ├── login
│   ├── signup
│   └── forgot-password
│
└── lib/
    ├── auth.ts
    └── database.ts

Equivalent framework structures are allowed if functionality matches.

---

## Required Exports

Every template MUST export:

createAuthConfig()
createRouteProtection()
getCurrentSession()

Names MUST NOT change.

---

## Required Injection Points

Templates MUST provide:

AUTH_ENGINE_INJECTION
DATABASE_ADAPTER_INJECTION
PROVIDER_REGISTRATION_INJECTION

These markers are used by the ShipKit assembler.

---

## Session Contract

Session object MUST contain:

id
userId
email
createdAt
expiresAt

Optional:

name
image

---

## User Contract

User object MUST contain:

id
email
emailVerified
createdAt
updatedAt

Optional:

name
image

---

## Error Handling

Templates MUST:

- Handle missing session
- Handle invalid credentials
- Handle provider failures
- Handle missing environment variables

No silent failures allowed.

---

## Security Requirements

Templates MUST:

- Never expose secrets client-side
- Protect server-only code
- Support CSRF protection if required by engine
- Support secure cookie configuration
- Support production deployment

---

## Forbidden

Templates MUST NOT:

- Hardcode provider credentials
- Hardcode database URLs
- Hardcode auth engines
- Assume a specific provider exists
- Assume a specific database exists

---

## Validation Checklist

A template is valid only if:

- Compiles without modification after assembly
- Supports all supported databases
- Supports all supported providers
- Supports all supported auth engines
- Exposes all required exports
- Contains all required injection points
