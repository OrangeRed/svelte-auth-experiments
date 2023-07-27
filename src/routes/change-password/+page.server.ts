import { error, fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { handleLogInRedirect } from '$lib/utils/handleLoginRedirect';
import { superValidate } from 'sveltekit-superforms/server';

import { userSchema } from '$lib/validators';
import { auth, passwordResetToken } from '$lib/server/auth';

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

export const load: PageServerLoad = async ({ cookies, url }) => {
	const session = cookies.get('auth_session');

	if (!session) {
		throw redirect(302, handleLogInRedirect(url));
	}

	return {
		form: superValidate(changePasswordSchema)
	};
};

export const actions: Actions = {
	changePassword: async ({ cookies, locals, request, url }) => {
		const session = cookies.get('auth_session');

		if (!session) {
			throw redirect(302, handleLogInRedirect(url));
		}

		const form = await superValidate(request, changePasswordSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			// Get user
			const { user } = await auth.getSessionUser(session);

			await auth.updateKeyPassword('email', user.email, form.data.password);

			await Promise.all([
				cookies.delete('auth_session', { path: url.pathname }),
				locals.auth.setSession(null),
				auth.invalidateAllUserSessions(user.userId),
				passwordResetToken.invalidateAllUserTokens(user.userId)
			]);
		} catch (e) {
			console.log(e);
			throw error(500);
		}

		throw redirect(302, '/sign-in?message=Password has been changed.');
	}
};
