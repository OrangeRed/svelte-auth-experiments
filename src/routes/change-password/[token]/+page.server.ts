import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { userSchema } from '$lib/validators';
import { auth, passwordResetToken } from '$lib/server/auth';

import type { Actions, PageServerLoad } from './$types';

const changePasswordSchema = userSchema
	.pick({
		password: true,
		confirm_password: true
	})
	.refine((formData) => formData.password === formData.confirm_password, {
		message: "Passwords don't match",
		path: ['confirm_password']
	});

export const load: PageServerLoad = async ({ params }) => {
	try {
		// Throws if the key doesn't exist
		await auth.getKey('password-reset', params.token);

		return { form: superValidate(changePasswordSchema) };
	} catch (e) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	changePassword: async ({ locals, request, params }) => {
		try {
			const { userId } = await passwordResetToken.validate(params.token);

			const form = await superValidate(request, changePasswordSchema);

			if (!form.valid) {
				return fail(400, { form });
			}

			const { email } = await auth.getUser(userId);

			await auth.updateKeyPassword('email', email, form.data.password);

			await Promise.all([
				locals.auth.setSession(null),
				auth.invalidateAllUserSessions(userId),
				passwordResetToken.invalidateAllUserTokens(userId)
			]);
		} catch (e) {
			console.log(e);
			throw error(500);
		}

		throw redirect(302, '/sign-in?message=Your password has been changed, please sign in again.');
	}
};
