import { z } from 'zod';

const userSchema = z.object({
	first_name: z
		.string()
		.trim()
		.min(1, 'First name is required')
		.min(3, 'Must be at least 3 characters')
		.max(15, 'Must be less than 16 characters'),
	last_name: z
		.string()
		.trim()
		.min(1, 'Last name is required')
		.max(20, 'Must be less than 20 characters'),
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

export type UserSchema = typeof userSchema;
