import { auth } from '$lib/server/auth';

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	const { user } = await event.locals.auth.validateUser();
	event.locals.user = user;

	// Authorized route checking goes here

	return await resolve(event);
};
