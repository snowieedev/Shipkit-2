export interface Session {
  id: string;
  userId: string;
  email: string;
  createdAt: Date;
  expiresAt: Date;
  name?: string;
  image?: string;
}

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  name?: string;
  image?: string;
}
