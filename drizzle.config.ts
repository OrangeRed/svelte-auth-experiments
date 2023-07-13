import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/db/schema.ts',
	// schema: "./src/schema/*",
	out: './drizzle',
	driver: 'mysql2',
	dbCredentials: {
		connectionString: process.env.DATABASE_URL!
	}
} satisfies Config;
