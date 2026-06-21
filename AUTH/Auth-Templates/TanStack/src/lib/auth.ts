import { createAuthConfig, createRouteProtection, getCurrentSession } from "../auth/config";
import { providers } from "../auth/providers";

export const authConfig = createAuthConfig();
export const requireAuth = createRouteProtection();
export const getSession = getCurrentSession;

export { providers };
