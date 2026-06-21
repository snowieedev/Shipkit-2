import { getPool, connect, disconnect } from './connection';
import { 
  validateUser, 
  validateSession, 
  validateAccount, 
  validateVerification 
} from './validation';
import { 
  RecordNotFoundError, 
  DuplicateRecordError, 
  UnknownDatabaseError 
} from './errors';
import type { User, Session, Account, Verification } from './types';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

const handleDbError = (error: any) => {
  if (error.code === 'ER_DUP_ENTRY') {
    throw new DuplicateRecordError('Duplicate record error', error);
  }
  throw new UnknownDatabaseError('An unknown database error occurred', error);
};

export { connect, disconnect };

export const createUser = async (user: User): Promise<User> => {
  validateUser(user);
  const pool = getPool();
  try {
    const query = `
      INSERT INTO users (id, email, emailVerified, name, image, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const emailVerified = user.emailVerified ? 1 : 0;
    await pool.execute(query, [
      user.id,
      user.email,
      emailVerified,
      user.name || null,
      user.image || null,
      user.createdAt || new Date(),
      user.updatedAt || new Date()
    ]);
    return user;
  } catch (error: any) {
    throw handleDbError(error);
  }
};

export const updateUser = async (id: string, updates: Partial<User>): Promise<User> => {
  const pool = getPool();
  try {
    const setClause: string[] = [];
    const values: any[] = [];
    
    for (const [key, value] of Object.entries(updates)) {
      if (key !== 'id') {
        setClause.push(`${key} = ?`);
        values.push(typeof value === 'boolean' ? (value ? 1 : 0) : value);
      }
    }
    
    if (setClause.length === 0) {
      return getUserById(id);
    }

    values.push(new Date()); // updatedAt
    setClause.push('updatedAt = ?');
    
    values.push(id);
    const query = `UPDATE users SET ${setClause.join(', ')} WHERE id = ?`;
    
    const [result] = await pool.execute<ResultSetHeader>(query, values);
    
    if (result.affectedRows === 0) {
      throw new RecordNotFoundError(`User with id ${id} not found.`);
    }
    return getUserById(id);
  } catch (error: any) {
    if (error instanceof RecordNotFoundError) throw error;
    throw handleDbError(error);
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  const pool = getPool();
  try {
    const query = `DELETE FROM users WHERE id = ?`;
    await pool.execute(query, [id]);
  } catch (error: any) {
    throw handleDbError(error);
  }
};

export const getUserById = async (id: string): Promise<User> => {
  const pool = getPool();
  try {
    const query = `SELECT * FROM users WHERE id = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
    
    if (rows.length === 0) {
      throw new RecordNotFoundError(`User with id ${id} not found.`);
    }
    const user = rows[0] as any;
    return {
      ...user,
      emailVerified: user.emailVerified === 1,
    } as User;
  } catch (error: any) {
    if (error instanceof RecordNotFoundError) throw error;
    throw handleDbError(error);
  }
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const pool = getPool();
  try {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [email]);
    
    if (rows.length === 0) {
      throw new RecordNotFoundError(`User with email ${email} not found.`);
    }
    const user = rows[0] as any;
    return {
      ...user,
      emailVerified: user.emailVerified === 1,
    } as User;
  } catch (error: any) {
    if (error instanceof RecordNotFoundError) throw error;
    throw handleDbError(error);
  }
};

export const createSession = async (session: Session): Promise<Session> => {
  validateSession(session);
  const pool = getPool();
  try {
    const query = `
      INSERT INTO sessions (id, userId, expiresAt, createdAt)
      VALUES (?, ?, ?, ?)
    `;
    await pool.execute(query, [
      session.id,
      session.userId,
      session.expiresAt,
      session.createdAt || new Date()
    ]);
    return session;
  } catch (error: any) {
    throw handleDbError(error);
  }
};

export const getSession = async (id: string): Promise<Session> => {
  const pool = getPool();
  try {
    const query = `SELECT * FROM sessions WHERE id = ?`;
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
    
    if (rows.length === 0) {
      throw new RecordNotFoundError(`Session with id ${id} not found.`);
    }
    return rows[0] as Session;
  } catch (error: any) {
    if (error instanceof RecordNotFoundError) throw error;
    throw handleDbError(error);
  }
};

export const deleteSession = async (id: string): Promise<void> => {
  const pool = getPool();
  try {
    const query = `DELETE FROM sessions WHERE id = ?`;
    await pool.execute(query, [id]);
  } catch (error: any) {
    throw handleDbError(error);
  }
};

export const createAccount = async (account: Account): Promise<Account> => {
  validateAccount(account);
  const pool = getPool();
  try {
    const query = `
      INSERT INTO accounts (id, userId, providerId, providerAccountId, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await pool.execute(query, [
      account.id,
      account.userId,
      account.providerId,
      account.providerAccountId,
      account.createdAt || new Date(),
      account.updatedAt || new Date()
    ]);
    return account;
  } catch (error: any) {
    throw handleDbError(error);
  }
};

export const deleteAccount = async (id: string): Promise<void> => {
  const pool = getPool();
  try {
    const query = `DELETE FROM accounts WHERE id = ?`;
    await pool.execute(query, [id]);
  } catch (error: any) {
    throw handleDbError(error);
  }
};

export const createVerification = async (verification: Verification): Promise<Verification> => {
  validateVerification(verification);
  const pool = getPool();
  try {
    const query = `
      INSERT INTO verifications (id, identifier, token, expiresAt)
      VALUES (?, ?, ?, ?)
    `;
    await pool.execute(query, [
      verification.id,
      verification.identifier,
      verification.token,
      verification.expiresAt
    ]);
    return verification;
  } catch (error: any) {
    throw handleDbError(error);
  }
};

export const deleteVerification = async (id: string): Promise<void> => {
  const pool = getPool();
  try {
    const query = `DELETE FROM verifications WHERE id = ?`;
    await pool.execute(query, [id]);
  } catch (error: any) {
    throw handleDbError(error);
  }
};
