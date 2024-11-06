import { contratoController } from '$lib/server/db/controllers';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {

    const contratos = await contratoController.selectAllContratosWithRepresentante()

    return {contratos};
}) satisfies PageServerLoad;

export const actions: Actions = {
	delete: async (event) => {
		const formData = await event.request.formData();
        const id = Number(formData.get('id'));
		
        try {
            await contratoController.deleteContrato(id)
            
        } catch (error:any) {
            console.error(error.message)
        }


	}
};