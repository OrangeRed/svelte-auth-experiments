import { DATABASE_URL } from '$env/static/private';

import { connect } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';

export const connection = connect({
	url: DATABASE_URL
});

export const db = drizzle(connection);
