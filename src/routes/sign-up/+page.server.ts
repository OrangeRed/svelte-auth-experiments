import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { userSchema } from '$lib/server/schema/users';
import { auth, emailVerificationToken } from '$lib/server/auth';
import { sendEmailVerificationLink } from '$lib/server/email';

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
		email: z.string().email('Please enter a valid email address').max(255),
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
	const { session, user } = await locals.auth.validateUser();

	if (session && !user.emailVerified) {
		throw redirect(302, '/email-verification');
	} else if (session && user.emailVerified) {
		throw redirect(302, '/');
	}

	const form = await superValidate(signUpSchema);
	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, signUpSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			// verify that form.data is the same shape as db.auth_user
			const attributes = userSchema.parse(form.data);

			const { userId } = await auth.createUser({
				primaryKey: {
					providerId: 'email', // auth method
					providerUserId: form.data.email, // unique id when using "email" auth method
					password: form.data.password // hashed by Lucia
				},
				attributes
			});

			const session = await auth.createSession(userId);
			event.locals.auth.setSession(session); // set session cookie

			const token = await emailVerificationToken.issue(userId);
			await sendEmailVerificationLink(token.toString());
		} catch (err) {
			console.log(err);

			return fail(500, { form, error: 'An unknown error occurred' });
		}

		// redirect to
		// make sure you don't throw inside a try/catch block!
		console.log('No Issues detected');
		throw redirect(302, '/email-verification');
	}
};
