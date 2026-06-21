import type { Session, User } from '../lib/types';

export const getSession = async (): Promise<{ session: Session | null; user: User | null }> => {
  // Session resolution injected by auth engine
  return { session: null, user: null };
};
