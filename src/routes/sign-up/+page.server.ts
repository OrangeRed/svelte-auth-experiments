import { fail } from '@sveltejs/kit';

import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

import type { Actions, PageServerLoad } from './$types';

const signUpSchema = z
	.object({
		first_name: z
			.string()
			.trim()
			.min(1, 'First name is required')
			.min(3, 'Must be 3 characters or more')
			.max(15, 'Must be 15 characters or less'),
		last_name: z
			.string()
			.trim()
			.min(1, 'Last name is required')
			.max(20, 'Must be 20 characters or less'),
		email: z.string().email('Please enter a valid email address').max(255),
		password: z
			.string({ required_error: 'Password is required' })
			.trim()
			.min(1, 'Password is required')
			.min(8, 'Password must be at least 8 characters')
			.max(255),
		confirm_password: z.string().trim().min(1, 'Password is required').max(255)
	})
	.required()
	.refine(({ password, confirm_password }) => confirm_password && password === confirm_password, {
		message: "Passwords don't match",
		path: ['confirm_password']
	});

export const load: PageServerLoad = async () => {
	// TODO JWT
	// const token = event.cookies.get('auth_token');
	// if (token) {
	// 	throw redirect(301, '/sign-in');
	// }

	const form = await superValidate(signUpSchema);

	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, signUpSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		return { form };
	}
};
