import { contratoController, representanteController } from '$lib/server/db/controllers';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load = (async (event) => {
    const user = await event.locals.user;

    if (!user) {
        return fail(401, { message: 'Usuário não autenticado.' });
    }

    const representante = await representanteController.getRepresentanteByEmail(user.email);
    if (!representante) {
        return fail(404, { message: 'Representante não encontrado.' });
    }

    const contratos = await contratoController.selectAllContratos()
        .then(contratos => contratos.filter(contrato => contrato.representante_id === representante.id));

    return { contratos };
}) satisfies PageServerLoad;
