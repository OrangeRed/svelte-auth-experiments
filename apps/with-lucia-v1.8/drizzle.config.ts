import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import type { Config } from 'drizzle-kit';

/**
 * The config file for Drizzle-kit
 * Read more: https://orm.drizzle.team/kit-docs/conf
 */
export default {
	schema: './src/lib/server/schema/*',
	out: './drizzle',
	driver: 'mysql2',
	dbCredentials: {
		connectionString: process.env.DATABASE_URL!
		// database: process.env.DATABASE!,
		// user: process.env.DATABASE_USER!,
		// host: process.env.DATABASE_HOST!,
		// password: process.env.DATABASE_PASSWORD!
	}
} satisfies Config;
