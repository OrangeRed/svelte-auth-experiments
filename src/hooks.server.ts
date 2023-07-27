import { auth } from '$lib/server/auth';

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	if (!event.url.pathname.includes('change-password') && event.cookies.get('auth_session')) {
		event.cookies.delete('auth_session', { path: '/change-password' });
	}

	const { user } = await event.locals.auth.validateUser();
	event.locals.user = user;

	// Authorized route checking goes here

	return await resolve(event);
};
