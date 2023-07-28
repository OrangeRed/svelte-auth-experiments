import { DATABASE, DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USER } from '$env/static/private';

const database = {
	host: DATABASE_HOST,
	username: DATABASE_USER,
	database: DATABASE,
	password: DATABASE_PASSWORD
};

/**
 * The config for Drizzle that is connecting to planetscale database
 * - Read more: https://orm.drizzle.team/docs/installation-and-db-connection/mysql/planetscale
 */
import { connect } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';

export const connection = connect(database);

export const db = drizzle(connection);

/**
 * The config for Drizzle that is connecting to a mysql2 database
 * - Read more: https://orm.drizzle.team/docs/installation-and-db-connection/mysql/mysql2
 */
// import mysql from "mysql2/promise";
// import { drizzle } from "drizzle-orm/mysql2";
//
// export const connection = await mysql.createConnection(database);
//
// export const db = drizzle(connection);
