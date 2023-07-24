import { redirect, fail } from '@sveltejs/kit';
import { LuciaTokenError } from '@lucia-auth/tokens';

import { sendEmailVerificationLink } from '$lib/server/email';
import { emailVerificationToken } from '$lib/server/auth';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/sign-in');
	} else if (locals.user.emailVerified) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ locals }) => {
		if (!locals.user) {
			throw redirect(302, '/sign-in');
		} else if (locals.user.emailVerified) {
			throw redirect(302, '/');
		}

		try {
			await emailVerificationToken.invalidateAllUserTokens(locals.user.userId);

			const token = await emailVerificationToken.issue(locals.user.userId);
			sendEmailVerificationLink(token.toString());
		} catch (e) {
			if (e instanceof LuciaTokenError && e.message === 'INVALID_TOKEN') {
				throw redirect(302, '/');
			}

			return fail(500);
		}

		return { success: true };
	}
};
