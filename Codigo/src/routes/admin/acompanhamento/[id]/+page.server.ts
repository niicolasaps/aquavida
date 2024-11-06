
import { clienteController, contratoController } from '$lib/server/db/controllers';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const id = Number(params.id);
    const pedidos = await clienteController.selectAllPedidos()
    const contrato = await contratoController.selectContratoByIdClientRepresentante(id);
    const contratoC = contrato[0]
    return {contratoC, pedidos};
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
