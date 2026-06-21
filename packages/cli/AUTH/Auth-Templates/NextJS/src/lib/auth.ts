/**
 * ShipKit Authentication Interface
 * {{AUTH_ENGINE}}
 */
import { Session, User } from "@/auth/session";

export async function getCurrentSession(): Promise<{ session: Session | null; user: User | null }> {
  // Session implementation injected by ShipKit
  return { session: null, user: null };
}

export function createRouteProtection() {
  // Route protection implementation injected by ShipKit
}
