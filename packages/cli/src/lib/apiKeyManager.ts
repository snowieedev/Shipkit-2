import fs from 'fs';
import path from 'path';
import os from 'os';

export interface APIKeyData {
  apiKey: string;
  createdAt: string;
  userId: string;
}

export class APIKeyManager {
  private static get configDir(): string {
    return path.join(os.homedir(), '.shipkit');
  }

  private static get configPath(): string {
    return path.join(this.configDir, 'api.json');
  }

  private static ensureDir() {
    if (!fs.existsSync(this.configDir)) {
      fs.mkdirSync(this.configDir, { recursive: true, mode: 0o700 });
    }
  }

  public static getApiKey(): APIKeyData | null {
    try {
      if (!fs.existsSync(this.configPath)) {
        return null;
      }

      const raw = fs.readFileSync(this.configPath, 'utf-8');
      const data = JSON.parse(raw);

      if (!data || !data.apiKey || typeof data.apiKey !== 'string' || !data.apiKey.startsWith('sk_live_')) {
        // Data is corrupt or invalid
        return null;
      }

      return data as APIKeyData;
    } catch (error) {
      // Handle corruption gracefully
      return null;
    }
  }

  public static setApiKey(apiKey: string, userId: string): void {
    if (!apiKey.startsWith('sk_live_')) {
      throw new Error('Invalid API key format. Must start with sk_live_');
    }

    this.ensureDir();

    const data: APIKeyData = {
      apiKey,
      createdAt: new Date().toISOString(),
      userId
    };

    fs.writeFileSync(this.configPath, JSON.stringify(data, null, 2), { mode: 0o600 });
  }

  public static removeApiKey(): void {
    if (fs.existsSync(this.configPath)) {
      fs.unlinkSync(this.configPath);
    }
  }
}
