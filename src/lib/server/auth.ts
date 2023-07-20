import { dev } from '$app/environment';

import lucia from 'lucia-auth';
import { sveltekit } from 'lucia-auth/middleware';
import { planetscale } from '@lucia-auth/adapter-mysql';
import { idToken } from '@lucia-auth/tokens';

import { connection } from '$lib/server/db';

export const auth = lucia({
	// @ts-ignore
	adapter: planetscale(connection),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),

	// The method that is used to autogenerate `user_id`
	generateCustomUserId: () => {
		return `user-${crypto.randomUUID()}`;
	},

	// Convert auth_user db entry into user object
	transformDatabaseUser: (databaseUser) => {
		return {
			userId: databaseUser.id,
			firstName: databaseUser.first_name,
			lastName: databaseUser.last_name,
			email: databaseUser.email,
			emailVerified: databaseUser.email_verified
		};
	}
});

export type LuciaAuth = typeof auth;

export const emailVerificationToken = idToken(auth, 'email-verification', {
	expiresIn: 60 * 60 // expiration in 1 hour,
});
