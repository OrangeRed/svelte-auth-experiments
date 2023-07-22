import { redirect } from '@sveltejs/kit';

import { auth } from '$lib/server/auth';
import greetings from '$lib/greetings.json';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const getUser = async () => {
		const { user } = await locals.auth.validateUser();
		return user;
	};

	return {
		user: getUser(),
		greeting: greetings.sort(() => Math.random() - Math.random())[0] ?? 'Hey'
	};
};

export const actions: Actions = {
	logout: async ({ locals }) => {
		if (locals.auth.storedSessionId) {
			await auth.invalidateSession(locals.auth.storedSessionId);
			locals.auth.setSession(null);
		}

		throw redirect(302, '/');
	}
};
