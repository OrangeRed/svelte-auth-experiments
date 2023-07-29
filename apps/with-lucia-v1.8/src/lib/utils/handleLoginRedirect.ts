import type { RequestEvent } from '@sveltejs/kit';

export const handleLogInRedirect = (event: RequestEvent) => {
	let queryParams = `?redirectTo=${event.url.pathname + event.url.search}`;

	return `/sign-in${queryParams}`;
};
