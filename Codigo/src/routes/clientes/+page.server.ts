import { clienteController } from '$lib/db/controllers';
import type { PageServerLoad, Actions } from './$types';

export const load = (async () => {
	const clientes = await clienteController.selectAllClientes();
	return { clientes };
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const name = String(data.get('name'));
		const cnpj = String(data.get('cnpj'));
		const email = String(data.get('email'))

		await clienteController.insertCliente({ name, cnpj,email });
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

		await clienteController.updateCliente(id, { name, cnpj,email });
	}
};
