import { dev } from '$app/environment';

import lucia from 'lucia-auth';
import { sveltekit } from 'lucia-auth/middleware';
import { mysql2 } from '@lucia-auth/adapter-mysql';
import { idToken } from '@lucia-auth/tokens';

import { connectionPool } from '$lib/server/db';

/**
 * Resulting type defintion of `user` from Lucia
 */
export type User = {
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	emailVerified?: boolean | null;
};

export type LuciaAuth = typeof auth;

export const auth = lucia({
	adapter: mysql2(connectionPool),
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
		} satisfies User;
	}
});

export const emailVerificationToken = idToken(auth, 'email-verification', {
	expiresIn: 60 * 60 // expiration in 1 hour,
});
