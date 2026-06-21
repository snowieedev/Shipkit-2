export const AUTH_ENGINE = "{{AUTH_ENGINE}}";
export const DATABASE_ADAPTER = "{{DATABASE_ADAPTER}}";
export const PROVIDERS = "{{PROVIDERS}}";
export const ENV_CONFIG = "{{ENV_CONFIG}}";

export function createAuthConfig() {
  return {
    engine: AUTH_ENGINE,
    database: DATABASE_ADAPTER,
    providers: PROVIDERS,
    env: ENV_CONFIG,
  };
}

export function createRouteProtection() {
  return async (request: Request) => {
    const session = await getCurrentSession(request);
    if (!session) {
      const url = new URL(request.url);
      throw new Response("Unauthorized", {
        status: 302,
        headers: {
          Location: `/login?redirectTo=${encodeURIComponent(url.pathname)}`
        }
      });
    }
    return session;
  };
}

export async function getCurrentSession(request?: Request) {
  // Session engine implementation injected by ShipKit
  // AUTH_ENGINE_INJECTION
  return null;
}
