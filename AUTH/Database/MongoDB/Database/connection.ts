/**
 * ShipKit MongoDB Connection Layer
 * Handles pooling, reconnection, and graceful shutdown.
 */

import { MongoClient, ServerApiVersion, Db } from 'mongodb';
import { DatabaseConnectionError } from './errors';

let client: MongoClient | null = null;
let dbInstance: Db | null = null;

export async function connect(): Promise<Db> {
  if (dbInstance) return dbInstance;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new DatabaseConnectionError(
      'MONGODB_URI is required in environment variables but was not found.'
    );
  }

  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      maxPoolSize: 50, // Connection pooling support
      w: 'majority',
      retryWrites: true,
    });

    await client.connect();
    
    // Will use the default database specified in the URI
    dbInstance = client.db();
    
    return dbInstance;
  } catch (error) {
    throw new DatabaseConnectionError('Failed to establish MongoDB connection', error);
  }
}

export async function disconnect(): Promise<void> {
  if (client) {
    try {
      await client.close(true); // Force close for graceful shutdown
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
    } finally {
      client = null;
      dbInstance = null;
    }
  }
}

export function getDb(): Db {
  if (!dbInstance) {
    throw new DatabaseConnectionError(
      'Database not connected. Please ensure connect() is called before performing operations.'
    );
  }
  return dbInstance;
}
