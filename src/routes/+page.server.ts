import { db } from '$lib/db';
import { usersTable } from '$lib/db/schema';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	// TODO JWT
	// const token = cookies.get('auth_token');
	// if (token) {
	// 	throw redirect(301, '/sign-in');
	// }

	const users = await db.select().from(usersTable);
	console.log('users: ', users);

	return { users };
};
