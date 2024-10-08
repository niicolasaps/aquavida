import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals, url }) => {
	const { session, user } = locals;
	return { session, user, transition_key: url.pathname };
}) satisfies LayoutServerLoad;
