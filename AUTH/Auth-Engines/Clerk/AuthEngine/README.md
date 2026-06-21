# ShipKit Authentication Engine - Clerk

This package provides a framework-agnostic implementation of the Clerk authentication engine for ShipKit.

## Security Checklist

- [x] Environment variables strictly validated.
- [x] `CLERK_SECRET_KEY` and other secrets are never exposed publicly.
- [x] Provider registration rejects invalid configurations.
- [x] Database adapter methods are validated before use.
- [x] Sessions are formatted to securely exclude Clerk-specific sensitive internals, adhering to ShipKit's standard schema.
- [x] Errors are sanitized to prevent exposing raw SDK or provider errors.
- [x] Required methods (`verifyEmail`, `resetPassword`) perform token presence validation.

## Production Readiness Checklist

- [x] **Framework Agnostic**: No dependencies on React, Next.js, Remix, Astro, etc.
- [x] **Standard Errors**: Fully implements ShipKit's structured `{ code, message, details? }` error shapes.
- [x] **Provider Independent**: Exposes `registerProvider()` to support standard ShipKit Providers.
- [x] **Database Independent**: Exposes `registerDatabaseAdapter()` to support standard ShipKit Databases.
- [x] **Environment Compliant**: Respects `shipkit-env-spec.md` for variable consumption.
- [x] **Assembly Ready**: Exports `AUTH_ENGINE_EXPORT` and adheres to standard naming conventions for the ShipKit assembler.
