import { representanteController, servicoController } from "$lib/server/db/controllers";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
	const servicos = await servicoController.selectAllServicos();
	const representantes = await representanteController.selectAllRepresentantes();
	return { servicos,representantes };
}) satisfies PageServerLoad;