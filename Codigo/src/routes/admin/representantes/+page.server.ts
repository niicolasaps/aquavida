import { clienteController, representanteController } from '$lib/server/db/controllers';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async () => {
	const representantes = await representanteController.selectAllRepresentantes();
	const clientes = await clienteController.selectAllClientes();
	return { representantes, clientes };
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const name = String(data.get('name'));
		const cpf = String(data.get('cpf'));
		if (!cpf) {
			return fail(400, {
				message: 'Digite um CPF'
			});
		}

		await representanteController.insertRepresentante({ name, cpf });
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
