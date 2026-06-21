/**
 * ShipKit MongoDB Database Adapter
 * Primary entry point. Must export all contract requirements.
 */

import { connect, disconnect, getDb } from './connection';
import { collections } from './schema';
import { User, Session, Account, Verification } from './types';
import {
  validateUser,
  validateSession,
  validateAccount,
  validateVerification,
} from './validation';
import {
  RecordNotFoundError,
  DuplicateRecordError,
  UnknownDatabaseError,
} from './errors';

export { connect, disconnect };

// Internal utility: Map ShipKit `id` to MongoDB `_id`
function mapToMongo<T extends { id: string }>(data: T): any {
  const { id, ...rest } = data;
  return { _id: id, ...rest };
}

// Internal utility: Map MongoDB `_id` to ShipKit `id`
function mapFromMongo<T>(data: any): T {
  if (!data) return data;
  const { _id, ...rest } = data;
  return { id: _id.toString(), ...rest } as unknown as T;
}

// --- USER OPERATIONS ---

export async function createUser(data: User): Promise<User> {
  try {
    validateUser(data);
    const db = getDb();
    await db.collection(collections.users).insertOne(mapToMongo(data));
    return data;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new DuplicateRecordError('User with this email or id already exists', error);
    }
    throw new UnknownDatabaseError('Failed to create user', error);
  }
}

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  try {
    const db = getDb();
    const { id: _, ...updateFields } = data as any; // Prevent updating ID
    
    const result = await db.collection(collections.users).findOneAndUpdate(
      { _id: id },
      { $set: updateFields },
      { returnDocument: 'after' }
    );
    
    // Support varying return signatures from mongodb node driver versions
    const doc = result && 'value' in result ? result.value : result;
    
    if (!doc) {
      throw new RecordNotFoundError(`User with id ${id} not found`);
    }
    return mapFromMongo<User>(doc);
  } catch (error: any) {
    if (error instanceof RecordNotFoundError) throw error;
    if (error.code === 11000) {
      throw new DuplicateRecordError('Update conflicts with an existing user', error);
    }
    throw new UnknownDatabaseError('Failed to update user', error);
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    const db = getDb();
    const result = await db.collection(collections.users).deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new RecordNotFoundError(`User with id ${id} not found`);
    }
  } catch (error: any) {
    if (error instanceof RecordNotFoundError) throw error;
    throw new UnknownDatabaseError('Failed to delete user', error);
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const db = getDb();
    const user = await db.collection(collections.users).findOne({ _id: id });
    return user ? mapFromMongo<User>(user) : null;
  } catch (error: any) {
    throw new UnknownDatabaseError('Failed to fetch user by id', error);
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const db = getDb();
    const user = await db.collection(collections.users).findOne({ email });
    return user ? mapFromMongo<User>(user) : null;
  } catch (error: any) {
    throw new UnknownDatabaseError('Failed to fetch user by email', error);
  }
}

// --- SESSION OPERATIONS ---

export async function createSession(data: Session): Promise<Session> {
  try {
    validateSession(data);
    const db = getDb();
    await db.collection(collections.sessions).insertOne(mapToMongo(data));
    return data;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new DuplicateRecordError('Session with this id already exists', error);
    }
    throw new UnknownDatabaseError('Failed to create session', error);
  }
}

export async function getSession(id: string): Promise<Session | null> {
  try {
    const db = getDb();
    const session = await db.collection(collections.sessions).findOne({ _id: id });
    return session ? mapFromMongo<Session>(session) : null;
  } catch (error: any) {
    throw new UnknownDatabaseError('Failed to fetch session', error);
  }
}

export async function deleteSession(id: string): Promise<void> {
  try {
    const db = getDb();
    const result = await db.collection(collections.sessions).deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new RecordNotFoundError(`Session with id ${id} not found`);
    }
  } catch (error: any) {
    if (error instanceof RecordNotFoundError) throw error;
    throw new UnknownDatabaseError('Failed to delete session', error);
  }
}

// --- ACCOUNT OPERATIONS ---

export async function createAccount(data: Account): Promise<Account> {
  try {
    validateAccount(data);
    const db = getDb();
    await db.collection(collections.accounts).insertOne(mapToMongo(data));
    return data;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new DuplicateRecordError('Account with these provider details already exists', error);
    }
    throw new UnknownDatabaseError('Failed to create account', error);
  }
}

export async function deleteAccount(id: string): Promise<void> {
  try {
    const db = getDb();
    const result = await db.collection(collections.accounts).deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new RecordNotFoundError(`Account with id ${id} not found`);
    }
  } catch (error: any) {
    if (error instanceof RecordNotFoundError) throw error;
    throw new UnknownDatabaseError('Failed to delete account', error);
  }
}

// --- VERIFICATION OPERATIONS ---

export async function createVerification(data: Verification): Promise<Verification> {
  try {
    validateVerification(data);
    const db = getDb();
    await db.collection(collections.verifications).insertOne(mapToMongo(data));
    return data;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new DuplicateRecordError('Verification with these details already exists', error);
    }
    throw new UnknownDatabaseError('Failed to create verification', error);
  }
}

export async function deleteVerification(id: string): Promise<void> {
  try {
    const db = getDb();
    const result = await db.collection(collections.verifications).deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new RecordNotFoundError(`Verification with id ${id} not found`);
    }
  } catch (error: any) {
    if (error instanceof RecordNotFoundError) throw error;
    throw new UnknownDatabaseError('Failed to delete verification', error);
  }
}
