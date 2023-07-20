import { redirect, fail } from '@sveltejs/kit';
import { sendEmailVerificationLink } from '$lib/server/email';

import type { PageServerLoad, Actions } from './$types';
import { emailVerificationToken } from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();

	if (!user) {
		throw redirect(302, '/login');
	}

	if (user.emailVerified) {
		throw redirect(302, '/');
	}

	return {};
};

export const actions: Actions = {
	default: async ({ locals }) => {
		const { session, user } = await locals.auth.validateUser();

		if (!session) {
			throw redirect(302, '/login');
		}

		if (user.emailVerified) {
			throw redirect(302, '/');
		}

		try {
			const token = await emailVerificationToken.issue(session.userId);
			await sendEmailVerificationLink(token.toString());

			return { success: true };
		} catch {
			return fail(500, { message: 'An unknown error occurred' });
		}
	}
};
