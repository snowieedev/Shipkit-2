export type ShipKitUser = {
  id: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  name?: string;
  image?: string;
};

export type ShipKitSession = {
  id: string;
  userId: string;
  email: string;
  expiresAt: Date;
  createdAt: Date;
};

export type ShipKitProviderConfig = Record<string, any>;

export type ShipKitProvider = {
  id: string;
  name: string;
  type: 'oauth' | 'credentials';
  enabled: boolean;
  config: ShipKitProviderConfig;
};

export type ShipKitDatabaseAdapter = {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  createUser: (user: Omit<ShipKitUser, 'id' | 'createdAt' | 'updatedAt'>) => Promise<ShipKitUser>;
  updateUser: (id: string, user: Partial<Omit<ShipKitUser, 'id'>>) => Promise<ShipKitUser>;
  deleteUser: (id: string) => Promise<void>;
  createSession: (session: Omit<ShipKitSession, 'id' | 'createdAt'>) => Promise<ShipKitSession>;
  deleteSession: (id: string) => Promise<void>;
  createAccount: (account: any) => Promise<any>;
  deleteAccount: (id: string) => Promise<void>;
};

export type AuthEngineExport = {
  createAuth: () => any;
  registerProvider: (provider: ShipKitProvider) => void;
  registerDatabaseAdapter: (adapter: ShipKitDatabaseAdapter) => void;
  getSession: (req?: any) => Promise<ShipKitSession | null>;
  signIn: (providerId: string, credentials?: any) => Promise<any>;
  signOut: () => Promise<void>;
  verifyEmail: (token: string) => Promise<any>;
  resetPassword: (token: string, newPassword: string) => Promise<any>;
  AUTH_ENGINE_EXPORT: boolean;
};
