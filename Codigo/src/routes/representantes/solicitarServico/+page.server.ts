import { clienteController, servicoController } from '$lib/server/db/controllers';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';

export const load = (async () => {
	const servicos = await servicoController.selectAllServicos();
	return { servicos };
}) satisfies PageServerLoad;

export const actions: Actions = {
	solicitar: async (event) => {
		const formData = await event.request.formData();
		const servicoId = formData.get('servico');

		const user = await event.locals.user;

		if (!user) {
			return fail(401, { message: 'Usuário não autenticado.' });
		}

		const userEmail = user.email

		const cliente = await clienteController.getClienteByEmail(userEmail);
		if (!cliente) {
			return fail(404, { message: 'Cliente não encontrado.' });
		}

		const clienteId = cliente.id;

		if (!servicoId || typeof servicoId !== 'string') {
			return fail(400, { message: 'Por favor, selecione um serviço.' });
		}

		const servico_id = Number(servicoId);

		await clienteController.insertPedido({
			description: String('Recomendação do Representante'),
			status: 'pendente',
			servico_id: servico_id,
			cliente_id: clienteId
		});
	}
};
