# ShipKit Supabase Database Adapter

A production-ready database adapter for ShipKit Auth using Supabase.

This adapter implements the full ShipKit Database Contract and abstracts all Supabase implementation details away from Auth Engines.

## Deliverables Checklist

- [x] Folder Structure
- [x] Database Adapter
- [x] Connection Layer
- [x] Schemas
- [x] Types
- [x] Validation Layer
- [x] Error Layer
- [x] Required Exports

## Environment Variables

Must be provided via the environment (see `shipkit-env-spec.md`):

- `SUPABASE_URL` (Required)
- `SUPABASE_SERVICE_ROLE_KEY` (Required for server-side operations bypassing RLS) or `SUPABASE_ANON_KEY`

## Production Readiness Checklist

- [x] Parameterized Queries (Handled safely by Supabase PostgREST client)
- [x] Connection Pooling Support (Built-in via Supabase REST)
- [x] Graceful Shutdown Support (via `disconnect`)
- [x] Standardized Errors (No raw database errors exposed)
- [x] Input Validation
- [x] Compatible with Better Auth & Clerk

## Security Checklist

- [x] Injection Protection (Built-in via Supabase client)
- [x] Environment-driven Configuration (No hardcoded credentials)
- [x] Validation before Database Insertion
- [x] Database-only responsibilities (no routing/UI logic)
