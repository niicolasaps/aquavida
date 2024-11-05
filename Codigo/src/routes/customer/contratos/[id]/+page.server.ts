import { contratoController, clienteController } from '$lib/server/db/controllers';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load = (async ({params}) => {
    const clienteId = params.id;

    if (!clienteId) {
        return fail(400, { message: 'ID do cliente não fornecido.' });
    }

    const contratos = await contratoController.selectContratoByClienteId(clienteId);
    
    return { contratos };
}) satisfies PageServerLoad;
