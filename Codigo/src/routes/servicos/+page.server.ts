import {servicoController } from '$lib/db/controllers';
import type { PageServerLoad, Actions } from './$types';

export const load = (async () => {
	const servicos = await servicoController.selectAllServicos();
	return { servicos };
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const name = String(data.get('name'));
		const description = String(data.get('description'));

		await servicoController.insertServico({ name, description });
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));

		await servicoController.deleteServico(id);
	},
	update: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const name = String(data.get('name'));
		const description = String(data.get('description'));

		await servicoController.updateServico(id, { name, description });
	}
};
