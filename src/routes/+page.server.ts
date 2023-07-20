import { redirect } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = locals.auth.storedSessionId;
	console.log('session: ', session);

	if (!session) {
		throw redirect(302, '/sign-in');
	}

	async function getUser() {
		const { user } = await locals.auth.validateUser();
		console.log(user);
		return user;
	}

	return {
		user: getUser()
	};
};
