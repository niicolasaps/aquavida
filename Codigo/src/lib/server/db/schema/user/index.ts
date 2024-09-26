import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
	id: text('id').primaryKey(),
    name:text('name').notNull(),
    email:text('email').notNull().unique(),
    password_hash:text('password_hash'),
    created_at:text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const sessionTable = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull()
});


export type SelectUser = typeof userTable.$inferSelect
export type InsertUser = typeof userTable.$inferInsert
