
import { clienteController, contratoController } from '$lib/server/db/controllers';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const pedidos = await clienteController.selectAllPedidos();
    const id = Number(params.id);
    const contrato = await contratoController.selectContratoById(id);
    const contratoC = contrato[0]
    return {contratoC, pedidos};
}) satisfies PageServerLoad;