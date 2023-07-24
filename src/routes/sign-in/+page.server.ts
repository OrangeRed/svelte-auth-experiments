import { z } from 'zod';
import { error, fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { LuciaError } from 'lucia-auth';

import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';

const signInSchema = z.object({
	email: z
		.string()
		.email('Please enter a valid email address')
		.min(1, 'Email is required')
		.max(255),
	password: z
		.string()
		.trim()
		.min(1, 'Password is required')
		.min(8, 'Password must be at least 8 characters')
		.max(255)
});

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user && !locals.user.emailVerified) {
		throw redirect(302, '/email-verification');
	} else if (locals.user && locals.user.emailVerified) {
		throw redirect(302, '/');
	}

	return {
		form: superValidate(signInSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, signInSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { userId } = await auth.useKey('email', form.data.email, form.data.password);
			const session = await auth.createSession(userId);
			event.locals.auth.setSession(session);
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			) {
				// user does not exist or invalid password
				return message(form, 'Incorrect email or password');
			}

			throw error(500);
		}

		throw redirect(302, '/');
	}
};
