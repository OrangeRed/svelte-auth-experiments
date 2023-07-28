// TODO use sendgrid and actually send out an email

import type { RequestEvent } from '@sveltejs/kit';

export const sendEmailVerificationLink = (event: RequestEvent, token: string) => {
	return `<a href="${event.url.origin}/verify-email/${token}">Verify Email</a>`;
};

export const sendPasswordResetLink = (event: RequestEvent, token: string) => {
	return `<a href="${event.url.origin}/change-password/${token}">Change Password</a>`;
};
