import { error, fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { message, setError, superValidate } from 'sveltekit-superforms/server';
import { LuciaError } from 'lucia-auth';

import { auth, emailVerificationToken, passwordResetToken } from '$lib/server/auth';
import { handleLogInRedirect } from '$lib/utils/handleLoginRedirect';
import { sendEmailVerificationLink } from '$lib/server/email';
import { userSchema } from '$lib/validators';

import type { DatabaseUser } from '$lib/server/schema/users';
import type { Actions, PageServerLoad } from './$types';

export type NameChangeSchema = typeof nameChangeSchema;

const nameChangeSchema = userSchema.pick({
	first_name: true,
	last_name: true
});

export type EmailChangeSchema = typeof emailChangeSchema;

const emailChangeSchema = userSchema
	.pick({
		confirm_password: true
	})
	.extend({
		new_email: userSchema.shape.email
	});

export type ChangePasswordSchema = typeof changePasswordSchema;

const changePasswordSchema = userSchema
	.pick({
		password: true,
		confirm_password: true
	})
	.refine((formData) => formData.password === formData.confirm_password, {
		message: "Passwords don't match",
		path: ['confirm_password']
	});

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) {
		throw redirect(302, handleLogInRedirect(url));
	}

	const defaultValues = {
		email: locals.user.email,
		first_name: locals.user.firstName,
		last_name: locals.user.lastName
	} satisfies Partial<DatabaseUser>;

	return {
		form: superValidate(defaultValues, userSchema, { errors: false }),
		user: locals.user
	};
};

export const actions: Actions = {
	changeEmail: async (event) => {
		if (!event.locals.user) {
			throw redirect(302, handleLogInRedirect(event.url));
		}

		const form = await superValidate(event, emailChangeSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		let flash: App.PageData['flash'];

		try {
			// Throws if the password is wrong
			await auth.useKey('email', event.locals.user.email, form.data.confirm_password);
			await auth.deleteKey('email', event.locals.user.email);

			const newAttributes = {
				email: form.data.new_email,
				email_verified: false
			} satisfies Partial<DatabaseUser>;

			const { email: newEmail, userId } = await auth.updateUserAttributes(
				event.locals.user.userId,
				newAttributes
			);

			// Throws if the email is already taken
			await auth.createKey(userId, {
				type: 'persistent',
				providerId: 'email',
				providerUserId: newEmail,
				password: form.data.confirm_password
			});

			const token = await emailVerificationToken.issue(userId);
			flash = {
				type: 'success',
				message: sendEmailVerificationLink(event, token.toString())
			};
		} catch (e) {
			if (e instanceof LuciaError && e.message === 'AUTH_INVALID_PASSWORD') {
				return setError(form, 'confirm_password', 'Incorrect password.');
			}

			if (e instanceof LuciaError && e.message === 'AUTH_DUPLICATE_KEY_ID') {
				return setError(form, 'A user with this email already exists.');
			}

			console.log(e);
			throw error(500);
		}

		throw redirect(302, '/verify-email', flash, event);
	},
	changeName: async ({ locals, request, url }) => {
		if (!locals.user) {
			throw redirect(302, handleLogInRedirect(url));
		}

		const form = await superValidate(request, nameChangeSchema);

		if (!form.valid) {
			form.data.first_name = locals.user.firstName;
			form.data.last_name = locals.user.lastName;

			return fail(400, { form });
		}

		try {
			const newAttributes = {
				first_name: form.data.first_name,
				last_name: form.data.last_name
			} satisfies Partial<DatabaseUser>;

			await auth.updateUserAttributes(locals.user.userId, newAttributes);
		} catch (e) {
			console.log(e);
			throw error(500);
		}

		return message(form, 'Profile has been successfully updated');
	},
	changePassword: async ({ locals, request, url }) => {
		if (!locals.user) {
			throw redirect(302, handleLogInRedirect(url));
		}

		const form = await superValidate(request, changePasswordSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await auth.updateKeyPassword('email', locals.user.email, form.data.password);

			await Promise.all([
				locals.auth.setSession(null),
				auth.invalidateAllUserSessions(locals.user.userId),
				passwordResetToken.invalidateAllUserTokens(locals.user.userId)
			]);
		} catch (e) {
			console.log(e);
			throw error(500);
		}

		throw redirect(302, `/sign-in?message=Your password has been changed, please sign in again.`);
	}
};
