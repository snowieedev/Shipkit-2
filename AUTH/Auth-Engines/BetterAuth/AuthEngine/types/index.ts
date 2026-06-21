export interface User {
  id: string;
  email: string;
  emailVerified: boolean | null;
  name?: string | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  email: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface Account {
  id: string;
  userId: string;
  providerId: string;
  providerAccountId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Verification {
  id: string;
  identifier: string;
  token: string;
  expiresAt: Date;
}

export interface DatabaseAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  
  createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
  
  createSession(session: Omit<Session, 'id' | 'email' | 'createdAt'>): Promise<Session>;
  deleteSession(id: string): Promise<void>;
  
  createAccount(account: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>): Promise<Account>;
  deleteAccount(id: string): Promise<void>;
}

export interface Provider {
  id: string;
  name: string;
  type: 'oauth' | 'credentials';
  enabled: boolean;
  config: Record<string, any>;
}

export interface AuthError {
  code: string;
  message: string;
  details?: any;
}
