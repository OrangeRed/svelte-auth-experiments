import { auth, passwordResetToken } from '$lib/server/auth';
import { LuciaTokenError } from '@lucia-auth/tokens';
import { error, redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, cookies }) => {
	try {
		const { userId } = await passwordResetToken.validate(params.token);

		const session = await auth.createSession(userId);
		cookies.set('auth_session', session.sessionId);
	} catch (e) {
		if (e instanceof LuciaTokenError && e.message === 'INVALID_TOKEN') {
			throw redirect(302, '/');
		}

		throw error(500);
	}

	throw redirect(302, '/change-password');
};
