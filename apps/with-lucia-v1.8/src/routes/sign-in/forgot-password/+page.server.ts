import { error, fail } from '@sveltejs/kit';
import { redirect, setFlash } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms/server';

import { userSchema } from '$lib/validators';
import { LuciaError } from 'lucia-auth';
import { auth, passwordResetToken } from '$lib/server/auth';
import { sendPasswordResetLink } from '$lib/server/email';

import type { Actions, PageServerLoad } from './$types';

const askEmail = userSchema.pick({ email: true });

export const load: PageServerLoad = async () => {
	return {
		form: superValidate<typeof askEmail, string>(askEmail)
	};
};

export const actions: Actions = {
	default: async (event) => {
		if (event.locals.user) {
			throw redirect(302, '/');
		}

		const form = await superValidate(event, askEmail);

		if (!form.valid) {
			return fail(400, { form });
		}

		let flash: App.PageData['flash'];

		try {
			// Throws if the key doesn't exist
			const { userId } = await auth.getKey('email', form.data.email);

			const newToken = await passwordResetToken.issue(userId);
			flash = {
				type: 'success',
				message: `Password change link has been sent.\n${sendPasswordResetLink(
					event,
					newToken.toString()
				)}`
			};
		} catch (e) {
			if (e instanceof LuciaError && e.message === 'AUTH_INVALID_KEY_ID') {
				setFlash({ type: 'success', message: 'Password change link has been sent.' }, event);
				return { form };
			}

			console.log(e);
			throw error(500);
		}

		setFlash(flash, event);
	}
};
