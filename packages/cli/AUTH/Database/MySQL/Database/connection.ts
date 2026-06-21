import mysql from 'mysql2/promise';
import { DatabaseConnectionError } from './errors';

let pool: mysql.Pool | null = null;

export const connect = async (): Promise<mysql.Pool> => {
  if (pool) {
    return pool;
  }

  const url = process.env.MYSQL_URL;

  if (!url) {
    throw new DatabaseConnectionError('MYSQL_URL environment variable is missing.');
  }

  try {
    pool = mysql.createPool(url);
    
    // Test connection
    const connection = await pool.getConnection();
    connection.release();

    return pool;
  } catch (error: any) {
    throw new DatabaseConnectionError('Failed to connect to MySQL database.', error);
  }
};

export const disconnect = async (): Promise<void> => {
  if (pool) {
    try {
      await pool.end();
      pool = null;
    } catch (error: any) {
      throw new DatabaseConnectionError('Failed to disconnect from MySQL database.', error);
    }
  }
};

export const getPool = (): mysql.Pool => {
  if (!pool) {
    throw new DatabaseConnectionError('Database not connected. Call connect() first.');
  }
  return pool;
};
