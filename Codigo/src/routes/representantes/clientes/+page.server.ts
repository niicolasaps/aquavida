import { representanteController } from '$lib/server/db/controllers';
import type { PageServerLoad } from './$types';

export const load = (async ({locals}) => {
    const userId = locals.session?.userId
    if(!userId){
        console.error("Error")
        return
    }
    const clientes = await representanteController.selectClientesByRepresentante(userId)
    return {clientes};
}) satisfies PageServerLoad;