import { error, redirect } from '@sveltejs/kit';
import { LuciaTokenError } from '@lucia-auth/tokens';

import { auth, emailVerificationToken } from '$lib/server/auth';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals }) => {
	try {
		const { userId } = await emailVerificationToken.validate(params.token);

		await Promise.all([
			auth.invalidateAllUserSessions(userId),
			auth.updateUserAttributes(userId, {
				email_verified: true
			})
		]);

		const session = await auth.createSession(userId);
		locals.auth.setSession(session);
		emailVerificationToken.invalidateAllUserTokens(userId);
	} catch (e) {
		if (e instanceof LuciaTokenError && e.message === 'INVALID_TOKEN') {
			throw redirect(302, '/');
		}

		throw error(500);
	}

	throw redirect(302, '/');
};
