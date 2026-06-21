/**
 * ShipKit MongoDB Schema Definitions
 * Defines collection names and database-specific indexing schemas.
 */

export const collections = {
  users: 'users',
  sessions: 'sessions',
  accounts: 'accounts',
  verifications: 'verifications',
} as const;

/**
 * MongoDB Validation Schemas and Indexes Initialization
 * This should be executed ideally once when setting up the database.
 */
export async function setupDatabase(db: import('mongodb').Db): Promise<void> {
  // Ensure unique constraints on standard fields
  await db.collection(collections.users).createIndex({ email: 1 }, { unique: true });
  
  await db.collection(collections.accounts).createIndex(
    { providerId: 1, providerAccountId: 1 },
    { unique: true }
  );
  
  await db.collection(collections.sessions).createIndex(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 } // Automatically clean up expired sessions
  );

  await db.collection(collections.verifications).createIndex(
    { identifier: 1, token: 1 },
    { unique: true }
  );
  await db.collection(collections.verifications).createIndex(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
  );
}
