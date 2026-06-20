import crypto from 'crypto'

export interface ApiKeyGenerationResult {
  rawKey: string;
  keyHash: string;
}

/**
 * Generates a secure API key and its SHA-256 hash.
 * The raw key should be returned to the user exactly ONCE.
 * The hash should be stored in the database.
 */
export function generateApiKey(): ApiKeyGenerationResult {
  const randomBytes = crypto.randomBytes(32).toString('hex')
  const rawKey = `sk_live_${randomBytes}`
  
  const keyHash = hashApiKey(rawKey)
  
  return { rawKey, keyHash }
}

/**
 * Hashes an API key using SHA-256 for database storage and verification.
 */
export function hashApiKey(rawKey: string): string {
  return crypto.createHash('sha256').update(rawKey).digest('hex')
}
