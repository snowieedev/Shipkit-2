# ShipKit Database Specification (shipkit-database-spec.md)

Version: 1.0
Status: Canonical Contract

## Purpose

Defines the contract for all database adapters used by ShipKit Auth.

Supported Databases:

- MongoDB
- PostgreSQL
- MySQL
- Supabase

Future databases MUST follow this specification.

---

## Core Principle

Database adapters abstract database implementation details.

Auth Engines MUST interact through the adapter contract only.

---

## Required Folder Structure

Database/
├── adapter.ts
├── schema.ts
├── connection.ts
├── types.ts
└── README.md

---

## Required Exports

Every adapter MUST export:

connect()
disconnect()

createUser()
updateUser()
deleteUser()

createSession()
deleteSession()

createAccount()
deleteAccount()

Names MUST NOT change.

---

## Connection Contract

connect()

Must establish database connection.

disconnect()

Must safely close database connection.

---

## User Schema Contract

Every database MUST support:

id
email
emailVerified
createdAt
updatedAt

Optional:

name
image

---

## Session Schema Contract

Every database MUST support:

id
userId
expiresAt
createdAt

---

## Account Schema Contract

Every database MUST support:

id
userId
providerId
providerAccountId

createdAt
updatedAt

---

## Verification Schema Contract

Every database MUST support:

id
identifier
token
expiresAt

---

## Adapter Interface

Auth Engines interact ONLY through adapter methods.

Direct database access is forbidden.

---

## Error Contract

All adapters MUST return:

{
  code,
  message,
  details?
}

Never expose raw database errors.

---

## Security Requirements

Adapters MUST:

- Use parameterized queries
- Prevent injection attacks
- Validate inputs
- Support production deployment

---

## Environment Contract

Database configuration MUST be injected.

Adapters MUST NOT hardcode:

- URLs
- Passwords
- Credentials

---

## Compatibility Requirements

Adapters MUST work with:

- All ShipKit Auth Engines
- All ShipKit Templates
- All ShipKit Providers

---

## Forbidden

Adapters MUST NOT:

- Render UI
- Create routes
- Manage authentication
- Manage providers
- Create framework dependencies

---

## Validation Checklist

Adapter is valid only if:

- Exposes required exports
- Supports standard schemas
- Supports production deployment
- Supports ShipKit auth engines
- Contains no framework-specific code
