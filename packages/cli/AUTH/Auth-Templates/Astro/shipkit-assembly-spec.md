# ShipKit Assembly Specification (shipkit-assembly-spec.md)

Version: 1.0
Status: Canonical Assembly Contract

## Purpose

Defines exactly how ShipKit assembles:

- Auth Templates
- Auth Engines
- Providers
- Database Adapters

This specification is the single source of truth for assembly behavior.

---

## Assembly Inputs

Required:

Framework
Database
Auth Engine
Providers[]

Example:

NextJS
Supabase
BetterAuth
Google, GitHub, Email

---

## Assembly Order

MUST be executed in this exact order:

STEP 1
Load Template

STEP 2
Load Database Adapter

STEP 3
Inject Database Adapter

STEP 4
Load Auth Engine

STEP 5
Inject Auth Engine

STEP 6
Load Providers

STEP 7
Register Providers

STEP 8
Merge Environment Variables

STEP 9
Merge Dependencies

STEP 10
Run Validation

STEP 11
Generate Output

No other order is allowed.

---

## Placeholder Contract

Reserved placeholders:

{{AUTH_ENGINE}}
{{DATABASE_ADAPTER}}
{{PROVIDERS}}
{{ENV_CONFIG}}

Placeholders MUST be unique.

Placeholders MUST NOT be renamed.

---

## Injection Markers

Templates MUST expose:

AUTH_ENGINE_INJECTION
DATABASE_ADAPTER_INJECTION
PROVIDER_REGISTRATION_INJECTION

Assembler injects code only into these markers.

---

## Dependency Merge Contract

Assembler MUST:

1. Collect dependencies
2. Remove duplicates
3. Resolve version conflicts
4. Generate final package list

Highest compatible version wins.

---

## Environment Merge Contract

Assembler MUST:

1. Collect env requirements
2. Remove duplicates
3. Sort alphabetically
4. Generate final .env.example

---

## Conflict Resolution

If two modules export same symbol:

Assembly MUST fail.

No automatic renaming.

---

## Validation Rules

Assembly MUST fail if:

- Missing injection marker
- Missing export
- Missing required env variable
- Missing provider registration
- Invalid schema contract
- Unsupported combination

---

## Output Requirements

Generated project MUST:

- Compile successfully
- Pass type checks
- Support production deployment
- Include all selected providers
- Include selected database
- Include selected auth engine

---

## Compatibility Matrix

Every module MUST be compatible with:

All Templates
All Providers
All Databases
All Auth Engines

Otherwise assembly is invalid.

---

## Assembly Manifest

Assembler MUST generate:

shipkit.manifest.json

Contains:

framework
database
authEngine
providers
generatedAt
version

---

## Deterministic Generation

Same inputs MUST produce same output.

No randomness allowed.
