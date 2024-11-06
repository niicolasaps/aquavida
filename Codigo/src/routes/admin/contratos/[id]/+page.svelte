<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { format } from 'date-fns';

	export let data: PageData;
    
	let contrato = data.contrato;
	let templates = data.templates;

	let descricao = contrato[0].contrato.descricao || '';

	const parts = descricao.split(/{&}/);
	let inputValues = Array(parts.length - 1).fill('');

	$: contratoNome = '';

	let clienteNome = '';
	let clienteId = '';

	$:console.log(clienteId)

	let representanteNome = '';
	let representanteId = 0;

	let servicoId = 0;

	let dataVencimento = new Date();
	let dataEmissao = new Date();


	$:console.log(representanteId)

	function adicionar() {
	const selectedTemplate = templates.find(
		(template) => template.template.servico_id === servicoId
	);
	if (selectedTemplate) {
		descricao += selectedTemplate.template.descricao + '<br><br>';
		parts.length = 0;
		inputValues.length = 0;
		parts.push(...descricao.split(/{&}/));
		inputValues = Array(parts.length - 1).fill('');
	}
}

	function updateDescricao() {
		let updatedDescricao = parts[0];
		inputValues.forEach((value, index) => {
			updatedDescricao += value + parts[index + 1];
		});
		descricao = updatedDescricao;
	}
	const today = new Date().toISOString().split('T')[0];

	$: console.log(descricao);
</script>

<div class="container mx-auto p-6">
	<div class="grid gap-6 lg:grid-cols-2">
			<form method="POST" action="?/create" use:enhance={({formData})=>{
				formData.set('descricao',descricao)
				// formData.set('cliente_id',clienteId)
                formData.set('contratoId',String(contrato[0].contrato.id))
				// formData.set('representante_id',String(representanteId))
				formData.set('dataVencimento',String(dataVencimento))
			}}>
				<div>
					
					<div class=" w-full">
						<label for="dataVencimento" class="label">Data Vencimento</label>
						<input
							id="dataVencimento"
							name="dataVencimento"
							type="date"
							bind:value={dataVencimento}
							class="input input-bordered w-full"
							min={today}
						/>
					</div>

					<div class=" w-full flex gap-2 items-end mb-4">
						<div class="w-full">
							<label for="service" class="label">Serviço</label>
							<select id="service" class="select select-bordered w-full" bind:value={servicoId}>
								<option value="" selected disabled>Selecione o serviço</option>
								{#each templates as servico}
									<option value={servico.template.servico_id}>{servico.servico?.name}</option>
								{/each}
							</select>
						</div>
						<button type="button" class="btn btn-primary" on:click={adicionar}> Adicionar </button>
					</div>
				</div>

				<div class="flex gap-4">
					<button type="submit" class="btn btn-primary w-full"> Confirmar edicão </button>
				</div>
			</form>

		<div class="p-6 bg-base-200 rounded-lg">
			<div class="space-y-6">
				<h2 class="text-xl font-semibold">{contrato[0].contrato.nome || 'Nome do contrato'}</h2>
				<div class=" w-full text-sm">
					<p>{contrato[0].cliente?.name || 'Nome do cliente'}</p>
					<p>{contrato[0].representante?.name || 'Nome do representante'}</p>
				</div>
                <!-- <p class="p-0 m-0">
                    {@html contrato[0].contrato.descricao}
                </p> -->
				<p class="text-sm mt-0">
					{#each parts as part, index}
						{#if index < inputValues.length}
						{@html part}
							<input
								type="text"
								bind:value={inputValues[index]}
								class="w-6"
								on:input={updateDescricao}
							/>
						{:else}
						{@html part}
						{/if}
					{/each}
				</p>
				<div class="pt-4 border-t border-base-300">
					<h3 class="font-semibold">Datas</h3>
					<div class="mt-2 text-sm">
						<p>Emissão: { contrato[0].contrato.date_emission ? format(contrato[0].contrato.date_emission, 'dd/MM/yyyy'): ''}</p>
						<p>Vencimento: {format(contrato[0].contrato.date_expire, 'dd/MM/yyyy') || '---'}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
