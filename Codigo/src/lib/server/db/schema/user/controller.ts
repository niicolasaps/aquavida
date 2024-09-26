/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '$lib/server/db';
import { userTable } from '$lib/server/db/schema/user';
import { eq } from 'drizzle-orm';
import type { InsertUser, SelectUser } from '.';

async function insertUser(data: InsertUser) {
	return db.insert(userTable).values(data);
}

async function selectAllUsers() {
	return db.select().from(userTable);
}

async function getUserByEmail(email: string) {
	return db.select().from(userTable).where(eq(userTable.email, email)).limit(1);
}

export const userController = {
	insertUser,
	selectAllUsers,
	getUserByEmail
	// selectUserById,
	// updateUser,
	// deleteUser
};
