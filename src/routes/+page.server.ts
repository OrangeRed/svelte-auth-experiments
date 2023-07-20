import { fail, redirect } from '@sveltejs/kit';

import { auth } from '$lib/server/auth';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	async function getUser() {
		const { user } = await locals.auth.validateUser();
		return user;
	}

	return {
		user: getUser()
	};
};

export const actions: Actions = {
	logout: async ({ locals }) => {
		const { session, user } = await locals.auth.validateUser();

		if (!user) {
			return fail(401);
		}

		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie
		throw redirect(302, '/'); // redirect to login page
	}
};
