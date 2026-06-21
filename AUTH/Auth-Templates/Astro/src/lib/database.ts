// lib/database.ts
// ShipKit Database Adapter Injection
{{DATABASE_ADAPTER}}

export const database = {
  // DATABASE_ADAPTER_INJECTION
  adapter: typeof process !== 'undefined' ? process.env.DATABASE_URL : null,
};
