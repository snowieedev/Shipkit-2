import { Pool } from 'pg';
import { DatabaseConnectionError, UnknownDatabaseError } from './errors';
import { POSTGRES_SCHEMA } from './schema';

let pool: Pool | null = null;

export async function connect(): Promise<Pool> {
  if (pool) {
    return pool;
  }

  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new DatabaseConnectionError('Missing required POSTGRES_URL environment variable');
  }

  try {
    pool = new Pool({
      connectionString,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Test connection and initialize schema
    const client = await pool.connect();
    try {
      await client.query(POSTGRES_SCHEMA);
    } finally {
      client.release();
    }

    return pool;
  } catch (error: any) {
    throw new DatabaseConnectionError('Failed to connect to PostgreSQL database', error.message);
  }
}

export async function disconnect(): Promise<void> {
  if (pool) {
    try {
      await pool.end();
      pool = null;
    } catch (error: any) {
      throw new UnknownDatabaseError('Error while disconnecting from PostgreSQL', error.message);
    }
  }
}

export function getPool(): Pool {
  if (!pool) {
    throw new DatabaseConnectionError('Database not connected. Call connect() first.');
  }
  return pool;
}
