import { redirect, fail } from '@sveltejs/kit';
import { LuciaTokenError } from '@lucia-auth/tokens';

import { sendEmailVerificationLink } from '$lib/server/email';
import { emailVerificationToken } from '$lib/server/auth';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();

	if (!user) {
		throw redirect(302, '/sign-in');
	} else if (user.emailVerified) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ locals }) => {
		const { user } = await locals.auth.validateUser();

		if (!user) {
			throw redirect(302, '/sign-in');
		} else if (user.emailVerified) {
			throw redirect(302, '/');
		}

		try {
			await emailVerificationToken.invalidateAllUserTokens(user.userId);

			const token = await emailVerificationToken.issue(user.userId);
			sendEmailVerificationLink(token.toString());

			return { success: true };
		} catch (e) {
			if (e instanceof LuciaTokenError && e.message === 'INVALID_TOKEN') {
				throw redirect(302, '/');
			}

			return fail(500);
		}
	}
};
