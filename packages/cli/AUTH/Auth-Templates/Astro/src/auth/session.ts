// auth/session.ts
// ShipKit Auth Engine Injection
{{AUTH_ENGINE}}

export interface User {
  id: string;
  email: string;
  emailVerified: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  name?: string | null;
  image?: string | null;
}

export interface Session {
  id: string;
  userId: string;
  email: string;
  createdAt: Date;
  expiresAt: Date;
  name?: string | null;
  image?: string | null;
}

export async function getCurrentSession(): Promise<Session | null> {
  // AUTH_ENGINE_INJECTION
  return null;
}

export async function createRouteProtection() {
  // AUTH_ENGINE_INJECTION
  const session = await getCurrentSession();
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return { session };
}
