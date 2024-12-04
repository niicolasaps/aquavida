<script lang="ts">
	import { format } from 'date-fns';
	import type { PageData } from './$types';
	import type { SelectPedido, SelectServico } from '$lib/server/db/schema';
	import { enhance } from '$app/forms';
	import { el } from 'date-fns/locale';
	export let data: PageData;

	let contrato = data.contrato;
	let pedidos = data.pedidos;

	let isOpenModal: HTMLDialogElement | null = null;
	let selectedPedido: SelectPedido = {
		id: 1,
		gerente_id: 1,
		description: '',
		status: 'pendente',
		servico_id: 1,
    	// servico:pedidos[0].servico,
		cliente_id: contrato.cliente_id
	};
	let selectedServico:SelectServico = {
		id: 1,
		name: '',
		description: '',
	}

  function openEditModal(pedido: SelectPedido,servico:SelectServico) {
		selectedPedido = { ...pedido };
		selectedServico = servico
		isOpenModal?.showModal();
	}
</script>

{#if contrato}
<div class="container mx-auto p-6">
	<div class="grid gap-6 lg:grid-cols-2">
		<div class="space-y-6">
			<div>
				<h2 class="text-xl font-semibold mb-4">Pedidos de {contrato.cliente?.name}</h2>
				<div class="bg-base-200 rounded-lg p-4 space-y-2">
					{#if pedidos.length > 0}
						{#each pedidos as pedido}
							<div class="flex justify-between items-center p-3 rounded">
								<span>Pedido #{pedido.pedidos?.id} - Status: {pedido.pedidos.status}</span>
								<button
									class="btn btn-sm btn-primary"
									on:click={() => {
										if (pedido.servico) {
											openEditModal(pedido.pedidos, pedido.servico);
										} else {
											console.error("Serviço não encontrado para este pedido.");
										}
									}}>Visualizar</button
								>
							</div>
						{/each}
					{:else}
						Nenhum pedido para: {contrato.cliente?.name}
					{/if}
				</div>
			</div>

			<div>
				<h2 class="text-xl font-semibold mb-4">Relatorios</h2>
				<div class="bg-base-200 rounded-lg p-6 space-y-2">
					{#if contrato.relatorio.length>0}
					{#each contrato.relatorio as relatorio}
					<div class="flex justify-between items-center rounded">
						<h1>Relatorio: {relatorio.id} - {relatorio.nome}</h1>
						<a href="/customer/relatorio/{relatorio.id}" class="btn btn-sm btn-primary">Visualizar</a>
					</div>
					{/each}
					{:else}
					Não possui
					{/if}
					<!-- <div class="flex justify-between items-center rounded">
						<h1>Novo relatorio</h1>
						<a href="/customer/relatorio/" class="btn btn-sm btn-secondary">Criar</a>
					</div> -->
				</div>
			</div>

			{#if data.fullUser.tipo ==='gerente'}
			<a class="btn btn-primary w-full" href="/admin/contratos/{contrato.id}">Editar Contrato</a>
			{/if}
		</div>

		<div class="p-6 bg-base-200 rounded-lg">
			<div class="space-y-6">
				<h2 class="text-xl font-semibold">{contrato.nome || 'Nome do contrato'}</h2>
				<div class="w-full text-sm space-y-2">
					<div class="  rounded">{contrato.cliente?.name || 'Nome do cliente'}</div>
					<div class="  rounded">{contrato.cliente?.representante?.name || 'Nome do representante'}</div>
				</div>
				<hr />
				<p class="text-sm mt-0">
					{@html contrato.descricao}
				</p>
				<div class="pt-4 border-t border-base-300">
					<h3 class="font-semibold mb-2">Datas</h3>
					<div class="mt-2 text-sm space-y-2">
						<p class="  rounded">
							Emissão: {contrato.date_emission
								? format(contrato.date_emission, 'dd/MM/yyyy')
								: '---'}
						</p>
						<p class="  rounded">
							Vencimento: {contrato.date_expire
								? format(contrato.date_expire, 'dd/MM/yyyy')
								: '---'}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
{/if}

<dialog id="my_modal_2" class="modal" bind:this={isOpenModal}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Pedido #{selectedPedido.id}</h3>
    <h3>Servico: {selectedServico.name}</h3>
    <h3>Descricão: {selectedPedido.description}</h3>
		<button
			on:click={() => isOpenModal?.close()}
			class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button
		>
    {#if selectedPedido.status === 'pendente'}
    <div class="flex gap-3 w-full justify-end">
{#if data.fullUser.tipo ==='gerente'}
<form method="POST" action="?/aceitarPedido" use:enhance={()=>{
  setTimeout(()=>{
	window.location.reload()
  },2000)
  }}>
  <div class="flex flex-col gap-3 mt-3 w-full">
	<input type="hidden" name="pedidoId" value={selectedPedido.id} />
	<button class="btn btn-success" type="submit">Aceitar pedido</button>
  </div>
</form>
<form method="POST" action="?/recusarPedido" use:enhance={()=>{
  setTimeout(()=>{
	window.location.reload()
  },2000)
  }}>
  <div class="flex flex-col gap-3 mt-3 w-full">
	<input type="hidden" name="pedidoId" value={selectedPedido.id} />
	<button class="btn btn-error" type="submit">Recusar pedido</button>
  </div>
</form>
{/if}
    </div>
    {/if}
	</div>
</dialog>
