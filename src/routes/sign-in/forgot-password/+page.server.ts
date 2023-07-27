import { error, fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
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
	default: async ({ request, locals }) => {
		if (locals.user) {
			throw redirect(302, '/');
		}

		const form = await superValidate(request, askEmail);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			// Throws if the key doesn't exist
			const { userId } = await auth.getKey('email', form.data.email);

			const newToken = await passwordResetToken.issue(userId);
			sendPasswordResetLink(newToken.toString());
		} catch (e) {
			if (e instanceof LuciaError && e.message === 'AUTH_INVALID_KEY_ID') {
				return message(
					form,
					`If a matching account was found an email was sent to "${form.data.email}" to allow you to reset your password.`
				);
			}

			console.log(e);
			throw error(500);
		}

		return message(
			form,
			`If a matching account was found an email was sent to ${form.data.email} to allow you to reset your password.`
		);
	}
};
