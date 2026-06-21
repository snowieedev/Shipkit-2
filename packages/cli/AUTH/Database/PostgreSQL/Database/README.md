# ShipKit PostgreSQL Database Adapter

This is a production-ready, database-only PostgreSQL adapter for the ShipKit ecosystem. It strictly adheres to ShipKit's core specifications and provides a highly performant, secure, and robust database layer that works seamlessly with standard ShipKit authentication engines (like Better Auth and Clerk).

## Features
- **Strict Compliance**: Adheres to `shipkit-database-spec.md`, `shipkit-auth-engine-spec.md`, and `shipkit-env-spec.md`.
- **Zod Validation**: Validates all incoming data before inserting it into PostgreSQL.
- **Connection Pooling**: Built-in connection pooling via `pg` for high-performance and resilient interactions.
- **Auto-Initialization**: Automatic schema setup natively supported on connection.
- **Error Handling**: Wraps database errors gracefully into structured ShipKit errors.
- **Security**: Protects against SQL injection using parameterized queries (`$1, $2`) natively supported by PostgreSQL.

## Environment Variables
The adapter reads from the following environment variable:
- `POSTGRES_URL` - The connection string to your PostgreSQL instance. 
*(If not set, falls back to `DATABASE_URL`)*

## Exports
This adapter implements the full set of required ShipKit database exports:
- `connect()`
- `disconnect()`
- `createUser()`
- `updateUser()`
- `deleteUser()`
- `getUserById()`
- `getUserByEmail()`
- `createSession()`
- `getSession()`
- `deleteSession()`
- `createAccount()`
- `deleteAccount()`
- `createVerification()`
- `deleteVerification()`

## Production Readiness Checklist
- [x] Standard folder structure implemented.
- [x] Connection pooling implemented.
- [x] Native type mapping and schemas included.
- [x] No UI, routing, or authentication logic included.
- [x] Fully abstract and interoperable with ShipKit.

## Security Checklist
- [x] Input validation with Zod.
- [x] Use parameterized queries to prevent SQL injections.
- [x] Raw database errors hidden from clients.
- [x] Connection credentials handled securely through environment variables.
