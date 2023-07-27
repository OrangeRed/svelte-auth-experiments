import { LuciaError } from 'lucia-auth';
import { error, fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';

import { userSchema } from '$lib/validators';
import { auth, emailVerificationToken } from '$lib/server/auth';
import { sendEmailVerificationLink } from '$lib/server/email';
import { usersTableSchema, type DatabaseUser } from '$lib/server/schema/users';

import type { Actions, PageServerLoad } from './$types';

export type SignUpSchema = typeof signUpSchema;

const signUpSchema = userSchema
	.required()
	.refine((formData) => formData.password === formData.confirm_password, {
		message: "Passwords don't match",
		path: ['confirm_password']
	});

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

const checkUserKeyExists = async (providerId: string, providerUserId: string) => {
	try {
		await auth.getKey(providerId, providerUserId); // throws if the key doesn't exist
	} catch {
		return null;
	}

	// throw if the key exists instead
	throw new LuciaError('AUTH_DUPLICATE_KEY_ID');
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, signUpSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			// auth.createUser({...})` is more than happy to insert a duplicate user into the auth_user table
			// this check makes sure the user's key doesn't exist before inserting a new user into the database
			await checkUserKeyExists('email', form.data.email);

			const { userId } = await auth.createUser({
				primaryKey: null, // Primary keys can't be deleted
				// Ensure form.data can be inserted safely into usersTable
				attributes: usersTableSchema.parse(form.data satisfies DatabaseUser)
			});

			await auth.createKey(userId, {
				type: 'persistent',
				providerId: 'email',
				providerUserId: form.data.email,
				password: form.data.password
			});

			const [session, token] = await Promise.all([
				auth.createSession(userId),
				emailVerificationToken.issue(userId)
			]);

			event.locals.auth.setSession(session);
			sendEmailVerificationLink(token.toString());
		} catch (e) {
			if (e instanceof LuciaError && e.message === 'AUTH_DUPLICATE_KEY_ID') {
				return setError(form, 'User already exists');
			}

			throw error(500);
		}

		throw redirect(302, '/verify-email');
	}
};
