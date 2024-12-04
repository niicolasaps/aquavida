import { contratoController, clienteController, userController } from '$lib/server/db/controllers';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load = (async ({params,locals}) => {
    const { user, session } = locals;
    const clienteId = Number(params.id)

    const [fullUser] = await userController.getUserByEmail(user?.email || '');

    if (!clienteId) {
        return fail(400, { message: 'ID do cliente não fornecido.' });
    }

    const contratos = await contratoController.selectContratoByClienteId(clienteId);
    
    return { contratos: contratos || [],fullUser };
}) satisfies PageServerLoad;
