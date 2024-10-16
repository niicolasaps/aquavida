import { servicoController } from '$lib/server/db/controllers';
import { TemplateController } from '$lib/server/db/schema/template/controller';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const servicos = await servicoController.selectAllServicos();
	const templates = await TemplateController.selectAllTemplates();
	return { servicos, templates };
}) satisfies PageServerLoad;
