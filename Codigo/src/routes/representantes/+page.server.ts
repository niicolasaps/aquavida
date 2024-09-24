import { clienteController, representanteController } from '$lib/db/controllers';
import type { PageServerLoad, Actions } from './$types';

export const load = (async () => {const representantes = representanteController.selectAllRepresentantes();
	return { representantes };
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const name = String(data.get('name'));

		await representanteController.insertRepresentante({ name });
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));

		await representanteController.deleteRepresentante(id);
	},
	update: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const name = String(data.get('name'));

		await representanteController.updateRepresentante(id, { name });
	}
};
