import { LuciaError } from 'lucia-auth';
import { error, fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

import { userSchema } from '$lib/validators';
import { auth, emailVerificationToken } from '$lib/server/auth';
import { sendEmailVerificationLink } from '$lib/server/email';
import { usersTableSchema, type DatabaseUser } from '$lib/server/schema/users';

import type { Actions, PageServerLoad } from './$types';

export type SignUpSchema = typeof signUpSchema;

const signUpSchema = userSchema
	.required()
	.refine(
		(formData) => formData.confirm_password && formData.password === formData.confirm_password,
		{
			message: "Passwords don't match",
			path: ['confirm_password']
		}
	);

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user && !locals.user.emailVerified) {
		throw redirect(302, '/email-verification');
	} else if (locals.user && locals.user.emailVerified) {
		throw redirect(302, '/');
	}

	return {
		form: superValidate(signUpSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate<typeof signUpSchema, FormMessage>(event, signUpSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { userId } = await auth.createUser({
				primaryKey: {
					providerId: 'email', // auth method
					providerUserId: form.data.email, // unique id when using "email" auth method
					password: form.data.password // hashed by Lucia
				},
				// Ensure form.data can be inserted safely into usersTable
				attributes: usersTableSchema.parse(form.data satisfies DatabaseUser)
			});

			const [session, token] = await Promise.all([
				auth.createSession(userId),
				emailVerificationToken.issue(userId)
			]);

			event.locals.auth.setSession(session);
			sendEmailVerificationLink(token.toString());
		} catch (e) {
			if (e instanceof LuciaError && e.message === 'AUTH_DUPLICATE_KEY_ID') {
				return message(form, { status: 'error', content: 'User already exists' });
			}

			throw error(500);
		}

		throw redirect(302, '/email-verification');
	}
};
