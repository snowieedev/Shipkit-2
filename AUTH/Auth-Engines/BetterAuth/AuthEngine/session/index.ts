import { Session } from '../types';
import { SessionError } from '../errors';

export class SessionManager {
  private readonly sessionDurationDays = 30;

  public generateSessionToken(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback for environments where crypto.randomUUID is not available
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  public calculateExpirationDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() + this.sessionDurationDays);
    return date;
  }

  public isSessionValid(session: Session | null | undefined): boolean {
    if (!session) {
      return false;
    }
    
    if (!session.expiresAt) {
      return false;
    }

    const now = new Date();
    return new Date(session.expiresAt) > now;
  }

  public validateSessionOrThrow(session: Session | null | undefined): void {
    if (!this.isSessionValid(session)) {
      throw new SessionError('Session is invalid or has expired');
    }
  }
}
