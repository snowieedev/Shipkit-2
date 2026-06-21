# ShipKit Provider Specification (shipkit-provider-spec.md)

Version: 1.0
Status: Canonical Contract

## Purpose

Defines the contract for all authentication providers used by ShipKit.

Supported Providers:
- Email + Password
- Google
- GitHub
- Microsoft

Future providers MUST follow this specification.

---

## Core Principle

Providers are independent modules.

Providers MUST NOT:
- Depend on a specific framework
- Depend on a specific database
- Contain UI
- Contain routing logic

Providers MUST only expose authentication configuration and registration logic.

---

## Required Folder Structure

Provider/
├── provider.ts
├── config.ts
├── env.ts
├── types.ts
└── README.md

---

## Required Export

Every provider MUST export:

createProvider()

Example:

export function createProvider()

Names MUST NOT change.

---

## Provider Object Contract

Every provider MUST return:

{
  id,
  name,
  type,
  enabled,
  config
}

---

## Required Provider Fields

id

Unique identifier.

Examples:

google
github
microsoft
email

---

name

Human readable name.

Examples:

Google
GitHub
Microsoft
Email

---

type

Allowed:

oauth
credentials

---

enabled

Boolean

---

config

Provider specific configuration object.

---

## Environment Contract

Providers MUST NOT read environment variables directly.

Providers MUST receive configuration through:

createProvider(config)

---

## OAuth Contract

OAuth providers MUST support:

clientId
clientSecret
callbackUrl

Required for:

- Google
- GitHub
- Microsoft

---

## Email Provider Contract

Email provider MUST support:

email
password

Optional:

emailVerification
passwordReset

---

## Registration Contract

Providers MUST register through:

registerProvider(provider)

Provider MUST work with:

- Better Auth
- Clerk

No engine-specific provider code allowed.

---

## Error Contract

Providers MUST return:

{
  code,
  message,
  details?
}

Never expose raw SDK errors.

---

## Security Requirements

Providers MUST:

- Validate configuration
- Reject invalid credentials
- Never expose secrets
- Support production deployment

---

## Compatibility Requirements

Providers MUST be compatible with:

- All ShipKit Templates
- All ShipKit Databases
- All ShipKit Auth Engines

---

## Forbidden

Providers MUST NOT:

- Create routes
- Render UI
- Connect to databases
- Manage sessions
- Store user records

---

## Validation Checklist

A provider is valid only if:

- Exposes createProvider()
- Supports contract-defined fields
- Supports production deployment
- Supports ShipKit registration flow
- Contains no framework-specific code
