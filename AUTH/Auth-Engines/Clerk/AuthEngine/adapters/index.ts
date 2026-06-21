import { validateDatabaseAdapter } from '../validation';
import type { ShipKitDatabaseAdapter } from '../types';
import { DatabaseError } from '../errors';

export class AdapterRegistry {
  private adapter: ShipKitDatabaseAdapter | null = null;

  public register(adapter: ShipKitDatabaseAdapter): void {
    try {
      validateDatabaseAdapter(adapter);
      this.adapter = adapter;
    } catch (error: any) {
      throw new DatabaseError(`Failed to register database adapter: ${error.message}`);
    }
  }

  public get(): ShipKitDatabaseAdapter {
    if (!this.adapter) {
      throw new DatabaseError('Database adapter not registered.');
    }
    return this.adapter;
  }
}
