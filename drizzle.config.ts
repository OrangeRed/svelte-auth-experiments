import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import type { Config } from 'drizzle-kit';

/**
 * The config file for Drizzle-kit
 * Read more: https://orm.drizzle.team/kit-docs/commands
 */
export default {
	schema: './src/lib/server/schema/*',
	out: './drizzle',
	driver: 'mysql2',
	dbCredentials: {
		// connectionString: process.env.PLANETSCALE_URL!
		user: process.env.DATABASE_USER!,
		password: process.env.DATABASE_PASSWORD!,
		database: process.env.DATABASE!,
		host: process.env.DATABASE_HOST!,
		port: 3306
	}
} satisfies Config;
