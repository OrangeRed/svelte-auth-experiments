import type { RequestEvent } from '@sveltejs/kit';

export const handleLogInRedirect = (
	url: RequestEvent['url'],
	message = 'You must be signed in to access this page.'
) => {
	let queryParams = `?redirectTo=${url.pathname + url.search}`;

	// stop empty string
	if (message) {
		queryParams += `&message=${message}`;
	}

	return `/sign-in${queryParams}`;
};
