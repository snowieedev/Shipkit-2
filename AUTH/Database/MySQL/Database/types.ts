export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  name?: string;
  image?: string;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
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

export interface DatabaseErrorShape {
  code: string;
  message: string;
  details?: any;
}
