import { fail } from '@sveltejs/kit';
import { LuciaTokenError } from '@lucia-auth/tokens';
import { redirect, setFlash } from 'sveltekit-flash-message/server';

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
	default: async (event) => {
		if (!event.locals.user) {
			throw redirect(302, '/sign-in');
		} else if (event.locals.user.emailVerified) {
			throw redirect(302, '/');
		}

		let flash: App.PageData['flash'];

		try {
			await emailVerificationToken.invalidateAllUserTokens(event.locals.user.userId);

			const token = await emailVerificationToken.issue(event.locals.user.userId);
			flash = {
				type: 'success',
				message: sendEmailVerificationLink(event, token.toString())
			};
		} catch (e) {
			if (e instanceof LuciaTokenError && e.message === 'INVALID_TOKEN') {
				throw redirect(302, '/');
			}

			return fail(500);
		}

		setFlash(flash, event);
	}
};
