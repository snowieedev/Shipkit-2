# ShipKit Microsoft Authentication Provider

A production-ready, framework-agnostic, and database-agnostic Microsoft OAuth authentication provider for the ShipKit ecosystem.

## Features

- **Strict Validation**: Validates all configuration and environment variables before runtime.
- **Framework Agnostic**: Works with NextJS, React, Remix, TanStack, Astro, etc.
- **Database Agnostic**: Works with MongoDB, PostgreSQL, MySQL, Supabase, etc.
- **Engine Compatible**: Designed to work seamlessly with BetterAuth and Clerk.
- **Secure by Default**: Prevents exposure of raw SDK errors and validates credential presence.

## Requirements

The following environment variables are required:

- `MICROSOFT_CLIENT_ID`
- `MICROSOFT_CLIENT_SECRET`

## Usage

```typescript
import { createProvider } from './Provider/provider';

// Basic usage (loads from environment variables)
const microsoftProvider = createProvider();

// With overrides
const microsoftProviderWithConfig = createProvider({
  callbackUrl: 'https://yourapp.com/api/auth/callback/microsoft'
});
```

## Error Handling

This provider throws structured errors defined in `errors.ts`:

- `OAuthConfigurationError`: Thrown when required environment variables are missing.
- `ProviderConfigurationError`: Thrown when configuration assembly fails.
- `ValidationError`: Thrown when configuration values are invalid.
- `ProviderRegistrationError`: Thrown when the provider creation process fails.
