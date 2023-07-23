import { redirect, fail } from '@sveltejs/kit';
import { LuciaTokenError } from '@lucia-auth/tokens';

import { sendEmailVerificationLink } from '$lib/server/email';
import { emailVerificationToken } from '$lib/server/auth';

import type { PageServerLoad, Actions } from './$types';
import type { User } from 'lucia-auth';

const newEmailVerificationLink = async (user: User) => {
	try {
		await emailVerificationToken.invalidateAllUserTokens(user.userId);

		const token = await emailVerificationToken.issue(user.userId);
		sendEmailVerificationLink(token.toString());
	} catch (e) {
		if (e instanceof LuciaTokenError && e.message === 'INVALID_TOKEN') {
			throw redirect(302, '/');
		}

		return fail(500);
	}
};

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.auth.validateUser();

	if (!user) {
		throw redirect(302, '/sign-in');
	} else if (user.emailVerified) {
		throw redirect(302, '/');
	}

	await newEmailVerificationLink(user);
};

export const actions: Actions = {
	default: async ({ locals }) => {
		const { user } = await locals.auth.validateUser();

		if (!user) {
			throw redirect(302, '/sign-in');
		} else if (user.emailVerified) {
			throw redirect(302, '/');
		}

		await newEmailVerificationLink(user);

		return { success: true };
	}
};
