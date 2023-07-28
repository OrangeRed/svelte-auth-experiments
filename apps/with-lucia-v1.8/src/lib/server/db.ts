import { connect } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';

import { DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USER } from '$env/static/private';

/**
 * The config file for the Drizzle server connection
 * - Read more: https://orm.drizzle.team/docs/installation-and-db-connection/mysql/planetscale
 */
export const connection = connect({
	host: DATABASE_HOST,
	username: DATABASE_USER,
	password: DATABASE_PASSWORD
});

export const db = drizzle(connection);
