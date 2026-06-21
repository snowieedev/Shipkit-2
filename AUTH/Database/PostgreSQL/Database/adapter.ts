import { getPool } from './connection';
import { 
  User, 
  Session, 
  Account, 
  Verification 
} from './types';
import { 
  userSchema, 
  sessionSchema, 
  accountSchema, 
  verificationSchema 
} from './validation';
import { 
  RecordNotFoundError, 
  DuplicateRecordError, 
  ValidationError, 
  UnknownDatabaseError 
} from './errors';

export { connect, disconnect } from './connection';

function handlePostgresError(error: any): never {
  if (error.code === '23505') {
    throw new DuplicateRecordError('Record already exists', error.detail);
  }
  throw new UnknownDatabaseError('A database error occurred', error.message);
}

export async function createUser(data: User): Promise<User> {
  try {
    const validated = userSchema.parse(data);
    const pool = getPool();
    const query = `
      INSERT INTO "users" ("id", "email", "emailVerified", "name", "image", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [
      validated.id, 
      validated.email, 
      validated.emailVerified, 
      validated.name || null, 
      validated.image || null, 
      validated.createdAt, 
      validated.updatedAt
    ];
    const res = await pool.query(query, values);
    return res.rows[0] as User;
  } catch (error: any) {
    if (error.name === 'ZodError') throw new ValidationError('Invalid user data', error.errors);
    handlePostgresError(error);
  }
}

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  try {
    const pool = getPool();
    const fields: string[] = [];
    const values: any[] = [];
    let queryIdx = 1;

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && key !== 'id') {
        fields.push(`"${key}" = $${queryIdx}`);
        values.push(value);
        queryIdx++;
      }
    }

    if (fields.length === 0) {
      const user = await getUserById(id);
      if (!user) throw new RecordNotFoundError('User not found');
      return user;
    }

    values.push(id);
    const query = `
      UPDATE "users"
      SET ${fields.join(', ')}
      WHERE "id" = $${queryIdx}
      RETURNING *;
    `;

    const res = await pool.query(query, values);
    if (res.rows.length === 0) {
      throw new RecordNotFoundError('User not found');
    }
    return res.rows[0] as User;
  } catch (error: any) {
    if (error instanceof RecordNotFoundError) throw error;
    handlePostgresError(error);
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    const pool = getPool();
    const res = await pool.query('DELETE FROM "users" WHERE "id" = $1 RETURNING "id"', [id]);
    if (res.rows.length === 0) {
      throw new RecordNotFoundError('User not found');
    }
  } catch (error: any) {
    if (error instanceof RecordNotFoundError) throw error;
    handlePostgresError(error);
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const pool = getPool();
    const res = await pool.query('SELECT * FROM "users" WHERE "id" = $1', [id]);
    return res.rows.length > 0 ? (res.rows[0] as User) : null;
  } catch (error: any) {
    handlePostgresError(error);
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const pool = getPool();
    const res = await pool.query('SELECT * FROM "users" WHERE "email" = $1', [email]);
    return res.rows.length > 0 ? (res.rows[0] as User) : null;
  } catch (error: any) {
    handlePostgresError(error);
  }
}

export async function createSession(data: Session): Promise<Session> {
  try {
    const validated = sessionSchema.parse(data);
    const pool = getPool();
    const query = `
      INSERT INTO "sessions" ("id", "userId", "expiresAt", "createdAt")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [validated.id, validated.userId, validated.expiresAt, validated.createdAt];
    const res = await pool.query(query, values);
    return res.rows[0] as Session;
  } catch (error: any) {
    if (error.name === 'ZodError') throw new ValidationError('Invalid session data', error.errors);
    handlePostgresError(error);
  }
}

export async function getSession(id: string): Promise<Session | null> {
  try {
    const pool = getPool();
    const res = await pool.query('SELECT * FROM "sessions" WHERE "id" = $1', [id]);
    return res.rows.length > 0 ? (res.rows[0] as Session) : null;
  } catch (error: any) {
    handlePostgresError(error);
  }
}

export async function deleteSession(id: string): Promise<void> {
  try {
    const pool = getPool();
    await pool.query('DELETE FROM "sessions" WHERE "id" = $1', [id]);
  } catch (error: any) {
    handlePostgresError(error);
  }
}

export async function createAccount(data: Account): Promise<Account> {
  try {
    const validated = accountSchema.parse(data);
    const pool = getPool();
    const query = `
      INSERT INTO "accounts" ("id", "userId", "providerId", "providerAccountId", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      validated.id,
      validated.userId,
      validated.providerId,
      validated.providerAccountId,
      validated.createdAt,
      validated.updatedAt
    ];
    const res = await pool.query(query, values);
    return res.rows[0] as Account;
  } catch (error: any) {
    if (error.name === 'ZodError') throw new ValidationError('Invalid account data', error.errors);
    handlePostgresError(error);
  }
}

export async function deleteAccount(id: string): Promise<void> {
  try {
    const pool = getPool();
    await pool.query('DELETE FROM "accounts" WHERE "id" = $1', [id]);
  } catch (error: any) {
    handlePostgresError(error);
  }
}

export async function createVerification(data: Verification): Promise<Verification> {
  try {
    const validated = verificationSchema.parse(data);
    const pool = getPool();
    const query = `
      INSERT INTO "verifications" ("id", "identifier", "token", "expiresAt")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [validated.id, validated.identifier, validated.token, validated.expiresAt];
    const res = await pool.query(query, values);
    return res.rows[0] as Verification;
  } catch (error: any) {
    if (error.name === 'ZodError') throw new ValidationError('Invalid verification data', error.errors);
    handlePostgresError(error);
  }
}

export async function deleteVerification(id: string): Promise<void> {
  try {
    const pool = getPool();
    await pool.query('DELETE FROM "verifications" WHERE "id" = $1', [id]);
  } catch (error: any) {
    handlePostgresError(error);
  }
}
