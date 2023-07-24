import { z } from 'zod';

const userSchema = z.object({
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
	email: z
		.string()
		.email('Please enter a valid email address')
		.min(1, 'Email is required')
		.max(255),
	password: z
		.string()
		.trim()
		.min(1, 'Password is required')
		.min(8, 'Password must be at least 8 characters')
		.max(255),
	confirm_password: z.string().trim().min(1, 'Password is required').max(255)
});

export default userSchema;
