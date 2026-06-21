import { connect, disconnect } from './connection';
import { TABLES } from './schema';
import { 
  validateUser, 
  validateSession, 
  validateAccount, 
  validateVerification 
} from './validation';
import { 
  RecordNotFoundError, 
  DuplicateRecordError, 
  UnknownDatabaseError 
} from './errors';
import type { User, Session, Account, Verification } from './types';

export { connect, disconnect };

export async function createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  validateUser(data);
  const client = await connect();
  
  const now = new Date();
  const userData = {
    ...data,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  const { data: user, error } = await client
    .from(TABLES.USERS)
    .insert(userData)
    .select()
    .single();

  if (error) {
    if (error.code === '23505') throw DuplicateRecordError(error.message);
    throw UnknownDatabaseError(error.message);
  }
  
  return user as unknown as User;
}

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  const client = await connect();
  
  const { data: user, error } = await client
    .from(TABLES.USERS)
    .update({ ...data, updatedAt: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === 'PGRST116') throw RecordNotFoundError(error.message);
    throw UnknownDatabaseError(error.message);
  }

  return user as unknown as User;
}

export async function deleteUser(id: string): Promise<void> {
  const client = await connect();
  
  const { error } = await client
    .from(TABLES.USERS)
    .delete()
    .eq('id', id);

  if (error) {
    throw UnknownDatabaseError(error.message);
  }
}

export async function getUserById(id: string): Promise<User | null> {
  const client = await connect();
  const { data, error } = await client.from(TABLES.USERS).select().eq('id', id).single();
  
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw UnknownDatabaseError(error.message);
  }
  
  return data as unknown as User;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const client = await connect();
  const { data, error } = await client.from(TABLES.USERS).select().eq('email', email).single();
  
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw UnknownDatabaseError(error.message);
  }
  
  return data as unknown as User;
}

export async function createSession(data: Omit<Session, 'id' | 'createdAt'>): Promise<Session> {
  validateSession(data);
  const client = await connect();

  const sessionData = {
    ...data,
    createdAt: new Date().toISOString(),
  };

  const { data: session, error } = await client
    .from(TABLES.SESSIONS)
    .insert(sessionData)
    .select()
    .single();

  if (error) {
    if (error.code === '23505') throw DuplicateRecordError(error.message);
    throw UnknownDatabaseError(error.message);
  }

  return session as unknown as Session;
}

export async function getSession(id: string): Promise<Session | null> {
  const client = await connect();
  const { data, error } = await client.from(TABLES.SESSIONS).select().eq('id', id).single();
  
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw UnknownDatabaseError(error.message);
  }
  
  return data as unknown as Session;
}

export async function deleteSession(id: string): Promise<void> {
  const client = await connect();
  const { error } = await client.from(TABLES.SESSIONS).delete().eq('id', id);
  if (error) throw UnknownDatabaseError(error.message);
}

export async function createAccount(data: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>): Promise<Account> {
  validateAccount(data);
  const client = await connect();

  const now = new Date();
  const accountData = {
    ...data,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  const { data: account, error } = await client
    .from(TABLES.ACCOUNTS)
    .insert(accountData)
    .select()
    .single();

  if (error) {
    if (error.code === '23505') throw DuplicateRecordError(error.message);
    throw UnknownDatabaseError(error.message);
  }

  return account as unknown as Account;
}

export async function deleteAccount(id: string): Promise<void> {
  const client = await connect();
  const { error } = await client.from(TABLES.ACCOUNTS).delete().eq('id', id);
  if (error) throw UnknownDatabaseError(error.message);
}

export async function createVerification(data: Omit<Verification, 'id'>): Promise<Verification> {
  validateVerification(data);
  const client = await connect();

  const { data: verification, error } = await client
    .from(TABLES.VERIFICATIONS)
    .insert(data)
    .select()
    .single();

  if (error) {
    if (error.code === '23505') throw DuplicateRecordError(error.message);
    throw UnknownDatabaseError(error.message);
  }

  return verification as unknown as Verification;
}

export async function deleteVerification(id: string): Promise<void> {
  const client = await connect();
  const { error } = await client.from(TABLES.VERIFICATIONS).delete().eq('id', id);
  if (error) throw UnknownDatabaseError(error.message);
}
