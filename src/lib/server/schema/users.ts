import { varchar, mysqlTable, bigint, boolean } from 'drizzle-orm/mysql-core';

import type { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';

const USER_ID_SIZE = `user-${crypto.randomUUID()}`.length;

/**
 * Type definition of the database user
 */
export type DatabaseUser = z.infer<typeof usersTableSchema>;

export const usersTable = mysqlTable('auth_user', {
	id: varchar('id', {
		length: USER_ID_SIZE
	}).primaryKey(),
	first_name: varchar('first_name', {
		length: 255
	}).notNull(),
	last_name: varchar('last_name', {
		length: 255
	}).notNull(),
	email: varchar('email', {
		length: 255
	}).notNull(),
	email_verified: boolean('email_verified').default(false)
});

/**
 * Zod validator for inserting into the `auth_user` table.
 * * `id` is generated automatically by Lucia so don't do it manually.
 */
export const usersTableSchema = createInsertSchema(usersTable).omit({ id: true });

export const userSessionsTable = mysqlTable('auth_session', {
	id: varchar('id', {
		length: 128
	}).primaryKey(),
	userId: varchar('user_id', {
		length: USER_ID_SIZE
	})
		.notNull()
		.references(() => usersTable.id),
	activeExpires: bigint('active_expires', {
		mode: 'number'
	}).notNull(),
	idleExpires: bigint('idle_expires', {
		mode: 'number'
	}).notNull()
});

export const userKeysTable = mysqlTable('auth_key', {
	id: varchar('id', {
		length: 255
	}).primaryKey(),
	userId: varchar('user_id', {
		length: USER_ID_SIZE
	})
		.notNull()
		.references(() => usersTable.id),
	primaryKey: boolean('primary_key').notNull(),
	hashedPassword: varchar('hashed_password', {
		length: 255
	}),
	expires: bigint('expires', {
		mode: 'number'
	})
});
