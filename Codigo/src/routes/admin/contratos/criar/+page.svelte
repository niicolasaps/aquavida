<script lang="ts">
	import { enhance } from '$app/forms';
	import Alert from '$lib/components/Alert.svelte';
	import type { PageData } from './$types';
	import { format } from 'date-fns';

	export let data: PageData;
	export let form

	let descricao = '';

	const parts = descricao.split(/{&}/);
	let inputValues = Array(parts.length - 1).fill('');

	$: contratoNome = '';

	let clienteNome = '';
	let clienteId = '';

	$:console.log(clienteId)

	let representanteNome = '';
	let representanteId = 0;

	let servicoId = 0;

	let servicosIds:number[] = []

	let dataVencimento = new Date();
	let dataEmissao = new Date();

	let clientes = data.clientes;
	let representantes = data.representantes;
	let templates = data.templates;

	$:console.log(representanteId)
	

	function adicionar() {
	const selectedTemplate = templates.find(
		(template) => template.template.servico_id === servicoId
	);
	if(selectedTemplate?.servico){
		servicosIds.push(selectedTemplate?.servico?.id)
	}
	console.log(servicosIds)
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
	<Alert message={form?.message} success={form?.success}/>
	<div class="grid gap-6 lg:grid-cols-2">

			<form method="POST" action="?/create" use:enhance={({formData})=>{
				formData.set('descricao',descricao)
				formData.set('cliente_id',clienteId)
				// formData.set('representante_id',String(representanteId))
				formData.set('dataVencimento',String(dataVencimento))
				servicosIds.forEach((id) => {
					formData.append('servicosIds', String(id));
				});
			}}>
				<div>
					<div class=" w-full">
						<label for="contratoNome" class="label">Nome do contrato</label>
						<input
							id="contratoNome"
							type="text"
							name="contratoNome"
							placeholder="Nome do contrato"
							bind:value={contratoNome}
							class="input input-bordered w-full"
						/>
					</div>

					<div class=" w-full">
						<label for="clientName" class="label">Nome do Cliente</label>
					
						<select id="clientName" bind:value={clienteId} class="select select-bordered w-full">
							<option value="" selected>Selecione o cliente</option>
							{#each clientes as cliente}
								<option value={cliente.id}>{cliente.name}</option>
							{/each}
						</select>
					</div>

					<!-- <div class=" w-full">
						<label for="representanteName" class="label">Nome do Representante</label>
						
						<select
							id="representanteName"
							bind:value={representanteId}
							class="select select-bordered w-full"
						>
							<option value="" selected>Selecione o representante</option>
							{#each representantes as representante}
								<option value={representante.id}>{representante.name}</option>
							{/each}
						</select>
					</div> -->

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
					<button type="submit" class="btn btn-primary w-full"> Criar Contrato </button>
				</div>
			</form>

		<div class="p-6 bg-base-200 rounded-lg">
			<div class="space-y-6">
				<h2 class="text-xl font-semibold">{contratoNome || 'Nome do contrato'}</h2>
				<div class=" w-full text-sm">
					<p>{clienteNome || 'Nome do cliente'}</p>
					<p>{representanteNome || 'Nome do representante'}</p>
				</div>
				<p class="text-sm">
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
						<p>Emissão: {format(dataEmissao, 'dd/MM/yyyy') || '---'}</p>
						<p>Vencimento: {format(dataVencimento, 'dd/MM/yyyy') || '---'}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
