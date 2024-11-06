import {
	clienteController,
	contratoController,
	representanteController,
	TemplateController
} from '$lib/server/db/controllers';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({params}) => {

	const templates = await TemplateController.selectAllTemplates();
    const id = Number(params.id);
    const contrato = await contratoController.selectContratoByIdClientRepresentante(id)
	return { contrato, templates };
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async (event) => {
        console.log('teste 1')
		const formData = await event.request.formData();
		// const contratoNome = formData.get('contratoNome') as string;
		const dataVencimento = formData.get('dataVencimento') as string;
		// const representante_id = Number(formData.get('representanteId'));
        const contratoId = Number(formData.get('contratoId'));
        const descricao = formData.get('descricao') as string

		// if (!contratoNome || !dataVencimento ) {
        //     console.error('Campos obrigatorios')
		// 	return fail(400, {
		// 		message: 'Campos obrigatorios'
		// 	});
		// }

        try {
            await contratoController.updateContrato(contratoId,{
                date_expire: new Date(dataVencimento),
                // cliente_id: cliente_id,
                date_emission: new Date(),
                descricao: descricao,
                // nome: contratoNome,
                // representante_id: representante_id
            });
            console.log('success')
            
        } catch (error:any) {
            console.error(error.message)
        }

        redirect(302, '/admin/contratos');

	}
};
