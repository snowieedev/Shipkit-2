# ShipKit MongoDB Adapter

Production-ready, database-only adapter for MongoDB. Fully compliant with the ShipKit specifications.

## Features

- **No framework logic**: Strictly database adapter implementation, completely decoupled from UI or routing.
- **Connection pooling**: Ready for high-concurrency production deployments natively via MongoDB standard options.
- **Strict schemas**: TypeScript interface definitions and a robust validation layer to ensure data integrity before database insertion.
- **Standardized error handling**: Emits predictable ShipKit database errors, hiding raw database traces to prevent security leaks.
- **Prepared indexing**: Includes setup routines for MongoDB unique constraints and TTL (Time-To-Live) indexes for sessions and verifications.

## Requirements

The adapter expects the following environment variable according to `shipkit-env-spec.md`:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
```

## Setup

A `setupDatabase(db)` function is provided in `schema.ts` which applies necessary indexes (unique constraints and TTL). Run this once during deployment or initial database bootstrap.

## Deliverables Checklist
- [x] 1. Folder Structure
- [x] 2. Database Adapter
- [x] 3. Connection Layer
- [x] 4. Schemas
- [x] 5. Types
- [x] 6. Validation Layer
- [x] 7. Error Layer
- [x] 8. Required Exports
- [x] 9. Environment Variables

## Production Readiness Checklist
- [x] Supports automatic reconnects and connection pooling via `MongoClient`.
- [x] Graceful disconnect function implemented.
- [x] Handles driver-specific anomalies (`11000` duplicate error codes translated to `DuplicateRecordError`).
- [x] Highly performant native driver usage.

## Security Checklist
- [x] Parameterized queries (handled inherently by the MongoDB node driver).
- [x] Input validation layer ensures all schemas match expectations before DB touch.
- [x] Abstracted raw database errors to prevent exposure of table details or connection strings.
- [x] Secure connection setup via environment injection only (`process.env.MONGODB_URI`).
- [x] No hardcoded environment variables or default passwords.

## Compatibility
- ✅ Better Auth
- ✅ Clerk
- ✅ All ShipKit Templates
- ✅ All ShipKit Providers
