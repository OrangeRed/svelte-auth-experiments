import { serial, varchar, mysqlTable } from 'drizzle-orm/mysql-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const usersTable = mysqlTable('usersTable', {
	id: serial('id').primaryKey(),
	first_name: varchar('first_name', { length: 255 }).notNull(),
	last_name: varchar('last_name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull(),
	password: varchar('password', { length: 255 }).notNull()
});

const insertUserSchema = createInsertSchema(usersTable);

const selectUserSchema = createSelectSchema(usersTable);
