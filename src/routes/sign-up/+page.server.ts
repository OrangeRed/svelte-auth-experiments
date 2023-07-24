import { z } from 'zod';
import { LuciaError } from 'lucia-auth';
import { error, fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

import { auth, emailVerificationToken } from '$lib/server/auth';
import { sendEmailVerificationLink } from '$lib/server/email';
import { userSchema, type AuthUser } from '$lib/server/schema/users';

import type { Actions, PageServerLoad } from './$types';

const signUpSchema = z
	.object({
		first_name: z
			.string()
			.trim()
			.min(1, 'First name is required')
			.min(3, 'Must be 3 characters or more')
			.max(15, 'Must be 15 characters or less'),
		last_name: z
			.string()
			.trim()
			.min(1, 'Last name is required')
			.max(20, 'Must be 20 characters or less'),
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
			.max(255),
		confirm_password: z.string().trim().min(1, 'Password is required').max(255)
	})
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
		const form = await superValidate(event, signUpSchema);

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
				attributes: userSchema.parse(form.data satisfies AuthUser)
			});

			const [session, token] = await Promise.all([
				auth.createSession(userId),
				emailVerificationToken.issue(userId)
			]);

			event.locals.auth.setSession(session);
			sendEmailVerificationLink(token.toString());
		} catch (err) {
			if (err instanceof LuciaError && err.message === 'AUTH_DUPLICATE_KEY_ID') {
				return message(form, 'User already exists');
			}

			throw error(500);
		}

		throw redirect(302, '/email-verification');
	}
};
