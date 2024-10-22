
import { servicoController } from '$lib/server/db/controllers';
import { TemplateController } from '$lib/server/db/schema/template/controller';
import type { PageServerLoad,Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load = (async () => {
	const servicos = await servicoController.selectAllServicos();
	const templates = await TemplateController.selectAllTemplates();
	return { servicos, templates };
}) satisfies PageServerLoad;

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const servicoId = Number(data.get('servico_id'))
		const description = String(data.get('description'));

		const [existingTemplate] = await TemplateController.getTemplateByServicoId(servicoId);
		if (!existingTemplate) {
			return fail(400, {
				message: 'Já existe um template desse serviço ou nenhum selecionado'
			});
		}
		if(!description){
			return fail(400, {
				message: 'É obrigatorio descrição'
			});
		}

		await TemplateController.insertTemplate({ descricao:description,servico_id:servicoId });
	},
	update: async({request})=>{
		const data = await request.formData();
		const id = Number(data.get('servico_id'))
		const description = String(data.get('description'));

		await TemplateController.updateTemplate(id,{ descricao:description,servico_id:id });
	}
};
