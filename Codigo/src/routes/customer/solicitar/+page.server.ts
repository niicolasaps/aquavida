import { clienteController, servicoController } from '$lib/server/db/controllers';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load = (async () => {
	const servicos = await servicoController.selectAllServicos();
	return { servicos };
}) satisfies PageServerLoad;

export const actions: Actions = {
	solicitar: async (event) => {
		const formData = await event.request.formData();
		const servicoId = formData.get('servico');
		const descricao = formData.get('descricao');

		if (!servicoId || typeof servicoId !== 'string') {
			return fail(400, { message: 'Por favor, selecione um serviço.' });
		}

		const servico_id = Number(servicoId);

		if (!descricao) {
			return fail(400, { message: 'Por favor, descreva sua necessidade.' });
		}

		await clienteController.insertPedido({
			description: descricao as string,
			status: 'pendente',
			servico_id: servico_id
		});
	}
};
