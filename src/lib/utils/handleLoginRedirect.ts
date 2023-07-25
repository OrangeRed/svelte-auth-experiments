import type { RequestEvent } from '@sveltejs/kit';

export const handleLogInRedirect = (url: RequestEvent['url'], message?: string) => {
	let queryParams = `?redirectTo=${url.pathname + url.search}`;

	if (message) {
		queryParams += `&message=${message}`;
	}

	return `/sign-in${queryParams}`;
};
