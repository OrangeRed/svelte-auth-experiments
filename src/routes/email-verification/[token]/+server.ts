// src/routes/email-verification/[token]/+server.ts
import { auth, emailVerificationToken } from '$lib/server/auth';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals }) => {
	try {
		const { userId } = await emailVerificationToken.validate(params.token);

		await auth.invalidateAllUserSessions(userId);
		await auth.updateUserAttributes(userId, {
			email_verified: true
		});

		const session = await auth.createSession(userId);
		locals.auth.setSession(session);

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (err) {
		return new Response('Invalid email verification link', {
			status: 400
		});
	}
};
