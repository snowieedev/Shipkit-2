import { getSession } from '../auth/session';
import { authConfig } from '../auth/config';

export const createAuthConfig = () => {
  return authConfig;
};

export const createRouteProtection = () => {
  // Returns route protection middleware or hook depending on framework implementation injected by engine
  return async () => {
    const { session } = await getSession();
    if (!session) {
      throw new Error('Unauthorized');
    }
    return session;
  };
};

export const getCurrentSession = async () => {
  return await getSession();
};
