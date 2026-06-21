# ShipKit Email Provider

Production-ready Email authentication provider for the ShipKit ecosystem.

## Features

- Email & Password Authentication
- Email Verification Hooks
- Password Reset Hooks
- SMTP Configuration
- Framework Agnostic
- Database Agnostic
- Compatible with BetterAuth and Clerk

## Usage

```typescript
import { createProvider, registerProvider } from './provider';

// 1. Create the provider (automatically reads SMTP configuration from environment)
const emailProvider = createProvider();

// 2. Register with your Auth Engine
registerProvider(emailProvider);
```

## Environment Variables

Must be defined in your `.env` file (see `shipkit-env-spec.md`):

- `SMTP_HOST` (Required)
- `SMTP_PORT` (Required)
- `SMTP_USER` (Required)
- `SMTP_PASSWORD` (Optional)
- `SMTP_FROM` (Required)

## Security Requirements

- Never exposes credentials to the client.
- Performs runtime validation of all configuration options.
- Protects credentials by only reading from `process.env`.
- Includes secure defaults.

## Production Readiness

- ✓ Follows `shipkit-provider-spec.md`
- ✓ Follows `shipkit-auth-engine-spec.md`
- ✓ Follows `shipkit-env-spec.md`
- ✓ Exposes `createProvider()`
- ✓ Compatible with BetterAuth
- ✓ Compatible with Clerk
- ✓ Framework agnostic
- ✓ Database agnostic
