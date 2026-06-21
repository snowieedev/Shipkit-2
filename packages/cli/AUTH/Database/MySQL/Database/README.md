# ShipKit MySQL Database Adapter

A production-ready MySQL adapter for the ShipKit ecosystem, fully compatible with Better Auth, Clerk, and all ShipKit templates.

## Architecture

This adapter follows the [ShipKit Database Specification](../shipkit-database-spec.md) and abstracts the MySQL database from the authentication engine. It handles schema initialization, connection pooling, parameterized queries, input validation, and custom structured errors.

## Folder Structure

- `adapter.ts`: Core methods that implement the ShipKit interface (`createUser`, `createSession`, etc.).
- `connection.ts`: MySQL connection pooling and lifecycle management via `mysql2`.
- `schema.ts`: Database DDL for required schemas (Users, Sessions, Accounts, Verifications).
- `types.ts`: Standardized ShipKit types for the database layer.
- `validation.ts`: Input validation to prevent malformed data from reaching the database.
- `errors.ts`: Standardized ShipKit errors (handles wrapping internal DB errors securely).

## Environment Variables

Ensure the following variables are available in your environment, according to the [ShipKit Environment Specification](../shipkit-env-spec.md):

\`\`\`env
MYSQL_URL=mysql://user:password@localhost:3306/database_name
\`\`\`

## Security & Performance Checklist

- [x] Connection Pooling enabled.
- [x] Graceful shutdown support via `disconnect()`.
- [x] Prevention against SQL injections via Parameterized Queries.
- [x] Pre-database input validation.
- [x] Standard ShipKit Errors (never exposes raw database output).

## Setup

The adapter expects a standard Node.js environment with \`mysql2\` installed for handling connections. To initialize the tables, you can execute the SQL queries exported in \`schema.ts\`.

Example initialization:
\`\`\`typescript
import { getPool } from './connection';
import { initializeSchemas } from './schema';

const setupDatabase = async () => {
  const pool = getPool();
  await initializeSchemas(async (sql) => {
    await pool.execute(sql);
  });
};
\`\`\`
