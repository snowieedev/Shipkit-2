# ShipKit BetterAuth Engine

This package implements the canonical ShipKit Authentication Engine for BetterAuth. It adheres strictly to the requirements defined in:
- `shipkit-auth-engine-spec.md`
- `shipkit-provider-spec.md`
- `shipkit-database-spec.md`
- `shipkit-assembly-spec.md`
- `shipkit-env-spec.md`

## Architecture

This engine operates entirely independent of any frontend UI or framework logic. It relies heavily on ShipKit's Assembly concepts to dynamically inject the correct database adapters and providers.

### Core Modules
- `core/` - The central class managing state and logic (`createAuth`, `signIn`, `signOut`).
- `session/` - Manages secure sessions, UUID generation (or fallbacks), and session expiration.
- `adapters/` - The database adapter registry.
- `providers/` - The provider registry.
- `validation/` - Strict payload and environment validation to prevent insecure deployments.
- `errors/` - Standard ShipKit format errors.
- `types/` - Shared TypeScript definitions for Engine objects.
- `exports/` - The unified external API exposing exactly what `shipkit-auth-engine-spec.md` mandates.

## Environment configuration
This engine requires the following environment variables:
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `SESSION_SECRET`

See `shipkit-env-spec.md` for full details.
