import { error, fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { LuciaError } from 'lucia-auth';
import { auth } from '$lib/server/auth';
import { userSchema } from '$lib/validators';

import type { Actions, PageServerLoad } from './$types';

export type SignInSchema = typeof signInSchema;

const signInSchema = userSchema
	.pick({
		email: true,
		password: true
	})
	.required();

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user && !locals.user.emailVerified) {
		throw redirect(302, '/email-verification');
	} else if (locals.user && locals.user.emailVerified) {
		throw redirect(302, '/');
	}

	return { form: superValidate(signInSchema) };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate<typeof signInSchema, FormMessage>(event, signInSchema);

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
				return message(form, { status: 'error', content: 'Incorrect email or password' });
			}

			throw error(500);
		}

		const redirectTo = event.url.searchParams.get('redirectTo');
		if (redirectTo) {
			throw redirect(302, `/${redirectTo.slice(1)}`);
		}

		throw redirect(302, '/');
	}
};
