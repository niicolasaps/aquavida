import { contratoController, clienteController } from '$lib/server/db/controllers';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load = (async (event) => {
    const user = await event.locals.user;

    if (!user) {
        return fail(401, { message: 'Usuário não autenticado.' });
    }

    const cliente = await clienteController.getClienteByEmail(user.email);
    if (!cliente) {
        return fail(404, { message: 'Cliente não encontrado.' });
    }

    const contratos = await contratoController.selectAllContratos()
        .then(contratos => contratos.filter(contrato => contrato.cliente_id === cliente.id));

    return { contratos };
}) satisfies PageServerLoad;
