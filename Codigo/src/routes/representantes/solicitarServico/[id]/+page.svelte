<script lang="ts">
	import type { PageData } from './$types';

	import { getUserContext } from '$lib/stores/user';
	import { applyAction, enhance } from '$app/forms';

	const user = getUserContext();

	export let data: PageData;
	let relatorios = data.relatorios;
	export let form;
	let servicos = data.servicos;
</script>

<div class="min-h-screen bg-gray-100 p-6">
	<div class="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
		{#if relatorios}
			<div class="space-y-6">
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

				</div>
					<form action="?/update" method="post" class="flex flex-col" use:enhance={({formData})=>{
						formData.set('nome',String(relatorios.nome))
						formData.set('descricao',String(relatorios.descricao))
						formData.set('id',String(relatorios.id))

						return async ({ result }) => {
							if (result.type === 'success') {
							} else {
								await applyAction(result);
							}
						};
					}}>
				<div>
					<label for="reportName" class="block text-sm font-medium text-gray-700">
						Nome do relatório:
					</label>
					<!-- <h1>{relatorios.nome}</h1> -->
					<input bind:value={relatorios.nome} type="text" placeholder="Type here" class="input input-bordered w-full max-w-md mt-2" />
				</div>
				<div>
						<label for="reportDescription" class="block text-sm font-medium text-gray-700">
							Descrição do relatório
						</label>
						<textarea
							class="textarea textarea-bordered w-full my-3"
							placeholder="Bio"
							bind:value={relatorios.descricao}
						></textarea>
						<button type="submit" class="btn btn-primary w-full"> Salvar relatorio </button>
						{#if form?.successupdate}
							<p class="text-success text-center mt-4">{form.message}</p>
						{/if}
					</div>
				</form>
				</div>

			<hr class="my-10" />

			<div class="w-full">
				{#if relatorios.contrato?.servico}
					{#each relatorios.contrato?.servico as servico}
						<div class="flex items-center justify-between border-b py-2">
							<span class="text-sm font-medium">Serviço {servico.servico.name}</span>

							<h1>{servico.status}</h1>
							select
						</div>
					{/each}
					<form method="post" action="?/solicitar">
						<div class="flex justify-center items-center gap-4 mt-2">
							<label class="form-control w-full">
								<div class="label p-0 m-0">
									<!-- <span class="label-text">Recomende um serviço</span> -->
									<!-- <span class="label-text-alt">Alt label</span> -->
								</div>
								<select name="servico" class="select select-bordered">
									<option disabled selected>Escolha...</option>
									{#each servicos as servico}
										<option value={servico.id}>{servico.name}</option>
									{/each}
									<!-- <option value="outro">Outro</option> -->
								</select>
							</label>

							<button class="btn btn-primary" type="submit">Incluir serviço</button>

							<!-- {#if form?.message}
								<p class="text-error text-center mt-4">{form.message}</p>
							{/if} -->
						</div>
						{#if form?.success}
							<p class="text-success text-center mt-4">{form.message}</p>
						{/if}
					</form>
				{/if}
			</div>
			<div class="flex justify-end gap-4 mt-2">

				<a
					href="/admin/acompanhamento/{relatorios.contrato_id}"
					type="button"
					class="btn btn-primary"
				>
					Voltar
				</a>
			</div>
		{/if}
	</div>
</div>
