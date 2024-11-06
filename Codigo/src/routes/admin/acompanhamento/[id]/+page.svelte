<script lang="ts">
	import { format } from 'date-fns';
	import type { PageData } from './$types';
	import type { SelectPedido, SelectServico } from '$lib/server/db/schema';
	import { enhance } from '$app/forms';
	export let data: PageData;

	let contrato = data.contratoC;
	let pedidos = data.pedidos;

	let isOpenModal: HTMLDialogElement | null = null;
	let selectedPedido: any = {
		id: 1,
		gerente_id: 1,
		description: '',
		status: 'pendente',
		servico_id: 1,
    servico:pedidos[0].servico,
		cliente_id: contrato.contrato.cliente_id
	};

  function openEditModal(pedido: SelectPedido,servico:SelectServico) {
		selectedPedido = { ...pedido };
    selectedPedido.servico = servico
		isOpenModal?.showModal();
	}
</script>

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
										openEditModal(pedido.pedidos,pedido.servico)
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
				<div class="bg-base-200 rounded-lg p-4 space-y-2">
					<!-- {#each [1, 2, 3] as day}
					<div class="flex justify-between items-center  p-3 rounded">
						<span>Dia{day}</span>
						<button class="btn btn-sm">Visualizar</button>
					</div>
					{/each} -->
					Não possui
				</div>
			</div>

			<a class="btn btn-primary w-full" href="/admin/contratos/{contrato.contrato.id}">Editar Contrato</a>
		</div>

		<div class="p-6 bg-base-200 rounded-lg">
			<div class="space-y-6">
				<h2 class="text-xl font-semibold">{contrato.contrato.nome || 'Nome do contrato'}</h2>
				<div class="w-full text-sm space-y-2">
					<div class="  rounded">{contrato.cliente?.name || 'Nome do cliente'}</div>
					<div class="  rounded">{contrato.representante?.name || 'Nome do representante'}</div>
				</div>
				<hr />
				<p class="text-sm mt-0">
					{@html contrato.contrato.descricao}
				</p>
				<div class="pt-4 border-t border-base-300">
					<h3 class="font-semibold mb-2">Datas</h3>
					<div class="mt-2 text-sm space-y-2">
						<p class="  rounded">
							Emissão: {contrato.contrato.date_emission
								? format(contrato.contrato.date_emission, 'dd/MM/yyyy')
								: '---'}
						</p>
						<p class="  rounded">
							Vencimento: {contrato.contrato.date_expire
								? format(contrato.contrato.date_expire, 'dd/MM/yyyy')
								: '---'}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<dialog id="my_modal_2" class="modal" bind:this={isOpenModal}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Pedido #{selectedPedido.id}</h3>
    <h3>Servico: {selectedPedido.servico.name}</h3>
    <h3>Descricão: {selectedPedido.description}</h3>
		<button
			on:click={() => isOpenModal?.close()}
			class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button
		>
		<!-- <ClienteModal /> -->
    {#if selectedPedido.status === 'pendente'}
    <div class="flex gap-3 w-full justify-end">

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
    </div>
    {/if}
	</div>
</dialog>
