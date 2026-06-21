import { DatabaseAdapter, User, Session, Account } from '../types';
import { validateDatabaseAdapter } from '../validation';
import { DatabaseError, normalizeError } from '../errors';

export class DatabaseAdapterRegistry {
  private adapter: DatabaseAdapter | null = null;

  public register(adapter: DatabaseAdapter): void {
    try {
      validateDatabaseAdapter(adapter);
      this.adapter = adapter;
    } catch (error) {
      throw normalizeError(error);
    }
  }

  public getAdapter(): DatabaseAdapter {
    if (!this.adapter) {
      throw new DatabaseError('No database adapter registered.');
    }
    return this.adapter;
  }

  public async connect(): Promise<void> {
    try {
      await this.getAdapter().connect();
    } catch (error) {
      throw new DatabaseError('Failed to connect to database', normalizeError(error));
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.getAdapter().disconnect();
    } catch (error) {
      throw new DatabaseError('Failed to disconnect from database', normalizeError(error));
    }
  }

  public async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    try {
      return await this.getAdapter().createUser(user);
    } catch (error) {
      throw new DatabaseError('Failed to create user', normalizeError(error));
    }
  }

  public async updateUser(id: string, data: Partial<User>): Promise<User> {
    try {
      return await this.getAdapter().updateUser(id, data);
    } catch (error) {
      throw new DatabaseError('Failed to update user', normalizeError(error));
    }
  }

  public async deleteUser(id: string): Promise<void> {
    try {
      await this.getAdapter().deleteUser(id);
    } catch (error) {
      throw new DatabaseError('Failed to delete user', normalizeError(error));
    }
  }

  public async createSession(session: Omit<Session, 'id' | 'email' | 'createdAt'>): Promise<Session> {
    try {
      return await this.getAdapter().createSession(session);
    } catch (error) {
      throw new DatabaseError('Failed to create session', normalizeError(error));
    }
  }

  public async deleteSession(id: string): Promise<void> {
    try {
      await this.getAdapter().deleteSession(id);
    } catch (error) {
      throw new DatabaseError('Failed to delete session', normalizeError(error));
    }
  }

  public async createAccount(account: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>): Promise<Account> {
    try {
      return await this.getAdapter().createAccount(account);
    } catch (error) {
      throw new DatabaseError('Failed to create account', normalizeError(error));
    }
  }

  public async deleteAccount(id: string): Promise<void> {
    try {
      await this.getAdapter().deleteAccount(id);
    } catch (error) {
      throw new DatabaseError('Failed to delete account', normalizeError(error));
    }
  }
}
