<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let relatorios = data.relatorios;
</script>

{JSON.stringify(relatorios?.contrato?.servico)}

<div class="min-h-screen bg-gray-100 p-6">
	<div class="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
		{#if relatorios}
			<form class="space-y-6">
				<div class="grid grid-cols-2 gap-6">
					<div>
						<label for="reportName" class="block text-sm font-medium text-gray-700">
							Nome do contrato:
						</label>
						<h1>{relatorios.contrato?.nome}</h1>
					</div>

					<div>
						<label for="reportName" class="block text-sm font-medium text-gray-700">
							Data emissão do relatorio
						</label>
						<h1>{relatorios.created_at}</h1>
					</div>

					<div>
						<label for="reportName" class="block text-sm font-medium text-gray-700">
							Nome do relatório:
						</label>
						<h1>{relatorios.nome}</h1>
					</div>
					<div>
						<label for="reportName" class="block text-sm font-medium text-gray-700">
							Nome do representante:
						</label>
						<h1>{relatorios.contrato?.cliente?.representante?.name}</h1>
					</div>

					<div>
						<label for="reportDescription" class="block text-sm font-medium text-gray-700">
							Descrição do relatório
						</label>
						<p>{relatorios.descricao}</p>
					</div>
				</div>
			</form>

			<div class="w-full">
				{#if relatorios.contrato?.servico}
					{#each relatorios.contrato?.servico as servico}
						<div class="flex items-center justify-between border-b pb-2">
							<span class="text-sm font-medium">Serviço {servico.servico.name}</span>
							<select
								bind:value={servico.status}
								class="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
							>
								<option value="concluido">Concluído</option>
								<option value="em_andamento">Em andamento</option>
								<option value="nao_iniciado">Não iniciado</option>
								<option value="pendente">Pendente</option>
								<option value="recusado">Recusado</option>
							</select>
						</div>
					{/each}
				{/if}
			</div>
			<div class="flex justify-end gap-4">
				<button
					type="submit"
					class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
				>
					Emitir Relatório
				</button>
				<button
					type="button"
					class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
				>
					Voltar
				</button>
			</div>
		{/if}
	</div>
</div>
