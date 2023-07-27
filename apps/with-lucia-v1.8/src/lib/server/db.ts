import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';

import { DATABASE, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USER } from '$env/static/private';

/**
 * The config file for the Drizzle server connection
 * - Read more: https://orm.drizzle.team/docs/
 */
export const connectionPool = await mysql.createPool({
	user: DATABASE_USER,
	password: DATABASE_PASSWORD,
	host: DATABASE_HOST ?? '127.0.0.1',
	database: DATABASE,
	port: 3306
});

export const db = drizzle(connectionPool);
