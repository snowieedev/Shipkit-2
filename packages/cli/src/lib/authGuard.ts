import { getAuth, AuthData } from './storage.js';
import { APIKeyManager, APIKeyData } from './apiKeyManager.js';
import chalk from 'chalk';

export class AuthGuard {
  public static requireAuth(): AuthData {
    const auth = getAuth();
    if (!auth || !auth.token) {
      console.log(`\n${chalk.red('✗')} No active session found.\n\nRun:\n  ${chalk.cyan('shipkit login')}\n\nto continue.\n`);
      process.exit(1);
    }
    return auth;
  }

  public static requireApiKey(): APIKeyData {
    const apiKeyData = APIKeyManager.getApiKey();
    if (!apiKeyData) {
      console.log(`\n${chalk.red('✗')} No ShipKit API key connected.\n\nRun:\n  ${chalk.cyan('shipkit api')}\n\nto connect your account.\n`);
      process.exit(1);
    }
    return apiKeyData;
  }

  public static requireFullyAuthenticated(): { auth: AuthData; apiKeyData: APIKeyData } {
    const auth = this.requireAuth();
    const apiKeyData = this.requireApiKey();
    return { auth, apiKeyData };
  }
}
