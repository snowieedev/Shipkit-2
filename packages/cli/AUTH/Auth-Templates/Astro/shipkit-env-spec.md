# ShipKit Environment Specification (shipkit-env-spec.md)

Version: 1.0
Status: Canonical Environment Contract

## Purpose

Defines all environment variables used by ShipKit.

No module may invent custom environment variable names.

---

## Core Rules

Environment variable names:

- MUST be UPPERCASE
- MUST use underscores
- MUST match this specification exactly

---

## Database Variables

Universal:

DATABASE_URL

---

MongoDB:

MONGODB_URI

---

Supabase:

SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

---

PostgreSQL:

POSTGRES_URL

---

MySQL:

MYSQL_URL

---

## Auth Engine Variables

Better Auth:

BETTER_AUTH_SECRET
BETTER_AUTH_URL

---

Clerk:

CLERK_SECRET_KEY
CLERK_PUBLISHABLE_KEY

---

## Provider Variables

Google:

GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

---

GitHub:

GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET

---

Microsoft:

MICROSOFT_CLIENT_ID
MICROSOFT_CLIENT_SECRET

---

## Email Variables

SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASSWORD
SMTP_FROM

---

## Session Variables

SESSION_SECRET

---

## Environment Categories

Required:
Must exist.

Optional:
May exist.

Secret:
Must never be exposed client-side.

Public:
May be exposed if framework allows.

---

## Validation Rules

Assembly MUST fail if:

- Required variable missing
- Variable name modified
- Secret variable exposed publicly

---

## Generated Files

Assembler MUST generate:

.env.example

Containing all required variables.

---

## Forbidden

Modules MUST NOT:

- Create custom env names
- Hardcode credentials
- Read undefined variables
- Duplicate existing variables

---

## Compatibility

All templates
All providers
All databases
All auth engines

MUST follow this specification.
