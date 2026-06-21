# ShipKit Google Provider

A production-ready, framework and database agnostic Google authentication provider for the ShipKit ecosystem.

## Overview

This provider connects to the ShipKit Auth Engine (such as BetterAuth or Clerk). It handles configuration and validation of Google OAuth credentials without dictating session logic, database adapters, or UI routing.

## Setup

Ensure your environment defines:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

## Usage

```typescript
import { createProvider } from './provider';
import { createGoogleConfig } from './config';
import { validateGoogleEnv } from './env';

// 1. Validate environment
const env = validateGoogleEnv(process.env);

// 2. Create config
const config = createGoogleConfig(env, 'http://localhost:3000/api/auth/callback/google');

// 3. Instantiate provider
const provider = createProvider(config);

// 4. Register with Auth Engine
// authEngine.registerProvider(provider);
```

## Security Checklist
- [x] Secret Validation: Ensures `GOOGLE_CLIENT_SECRET` is present.
- [x] Environment Validation: Validates environment variables before runtime.
- [x] Credential Protection: Does not expose secrets publicly.
- [x] Secure Defaults: Requires explicit configuration, no insecure defaults.
- [x] No hardcoded values: All values read from environment.
- [x] No credential exposure: Errors do not leak raw SDK details.

## Production Readiness Checklist
- [x] Follows `shipkit-provider-spec.md`
- [x] Follows `shipkit-auth-engine-spec.md`
- [x] Follows `shipkit-env-spec.md`
- [x] Exposes `createProvider()`
- [x] Compatible with BetterAuth and Clerk
- [x] Framework agnostic
- [x] Database agnostic
