import { redirect } from '@sveltejs/kit';

import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { usersTable } from '$lib/db/schema';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// // get the token from the cookie
	// const token = event.cookies.get('auth_token');
	// // if there is a token, redirect to the user page
	// if (token) {
	// 	throw redirect(301, '/');
	// }
};

const signUpSchema = createInsertSchema(usersTable, {
	email: (schema) => schema.email.email(),
	password: (schema) => schema.password.min(8)
}).refine((data) => data.password === data.confirm_password, {
	message: "Passwords don't match",
	path: ['confirm']
});

// {
//     firstName: '123',
//     lastName: '123',
//     email: '123@123',
//     password: '123',
//     confirmPassword: '123'
//   }

export const actions: Actions = {
	default: async ({ request }) => {
		try {
			const formData = signUpSchema.parse(Object.fromEntries(await request.formData()));
			console.log(formData);
		} catch (err) {
			console.error(err);
		}
	}
};
