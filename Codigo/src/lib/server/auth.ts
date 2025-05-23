import { Lucia } from 'lucia';
import { dev } from '$app/environment';

import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';

import { db } from './db';
import { sessionTable, userTable } from './db/schema/user';

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable); // your adapter

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			username: attributes.username,
			email: attributes.email
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes:  Omit<DatabaseUserAttributes,'id'>
	}
}

interface DatabaseUserAttributes {
	username: string;
	email: string;
}