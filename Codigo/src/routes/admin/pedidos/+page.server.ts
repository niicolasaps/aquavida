import { clienteController } from '$lib/server/db/controllers';
import type { PageServerLoad, Actions } from './$types';

export const load = (async () => {
	const pedidos = await clienteController.selectAllPedidos();
	return { pedidos };
}) satisfies PageServerLoad;

export const actions: Actions = {
	aceitarPedido: async ({ request }) => {
		const data = await request.formData();
		const pedidoId = Number(data.get('pedidoId'));

		await clienteController.updatePedido(pedidoId, { status: 'aderido' });
	},

	recusarPedido: async ({ request }) => {
		const data = await request.formData();
		const pedidoId = Number(data.get('pedidoId'));

		await clienteController.updatePedido(pedidoId, { status: 'recusado' });
	}
};
