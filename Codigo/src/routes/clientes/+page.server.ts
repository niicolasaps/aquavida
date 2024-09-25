import { clienteController, representanteController } from '$lib/db/controllers';
import type { PageServerLoad, Actions } from './$types';

export const load = (async () => {
	const clientes = await clienteController.selectAllClientes();
	const representantes = await representanteController.selectAllRepresentantes();
	return { clientes,representantes };
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const name = String(data.get('name'));
		const cnpj = String(data.get('cnpj'));
		const email = String(data.get('email'))
		const endereco = String(data.get('endereco'))
		const representante_id = Number(data.get('representante_id'));

		await clienteController.insertCliente({ name, cnpj,email,endereco,representante_id });
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));

		await clienteController.deleteCliente(id);
	},
	update: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const name = String(data.get('name'));
		const cnpj = String(data.get('cnpj'));
		const email = String(data.get('email'))
		const endereco = String(data.get('endereco'))

		await clienteController.updateCliente(id, { name, cnpj,email,endereco });
	}
};
