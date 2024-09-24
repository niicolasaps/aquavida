<script lang="ts">
	import { enhance } from '$app/forms';
	import ClienteModal from '$lib/components/modal/ClienteModal.svelte';
	import type { SelectCliente } from '$lib/db/schema';
	import type { PageData } from './$types';

	export let data: PageData;

	let clientes = data.clientes;
	let isOpenModal: HTMLDialogElement | null = null;
	let isOpenModalUpdate: HTMLDialogElement | null = null;

	let selectedCliente: SelectCliente = {
		id: 1,
		name: '',
		cnpj: '',
		endereco: '',
		representante_id: 1
	};

	function openEditModal(cliente: SelectCliente) {
		selectedCliente = { ...cliente };
		isOpenModalUpdate?.showModal();
	}
</script>

<main>
	<div class="flex justify-end m-5">
		<button class="btn btn-primary" on:click={() => isOpenModal?.showModal()}
			><svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-user-plus"
				><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line
					x1="19"
					x2="19"
					y1="8"
					y2="14"
				/><line x1="22" x2="16" y1="11" y2="11" /></svg
			> Criar Cliente</button
		>
	</div>

	<div class="overflow-x-auto">
		<table class="table table-zebra">
			<thead>
				<tr>
					<th>id</th>
					<th>Nome</th>
					<th>CNPJ</th>
					<th>Representante</th>
					<th>Update</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{#each clientes as cliente}
					<tr>
						<td>{cliente.id}</td>
						<td>{cliente.name}</td>
						<td>{cliente.cnpj}</td>
						<td>{cliente.representante_id ?? 'Sem representante vinculado'}</td>
						<td>
							<button class="btn btn-primary" on:click={() => openEditModal(cliente)}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-pen"
									><path
										d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
									/></svg
								>
								Editar
							</button>
						</td>
						<td>
							<form method="POST" action="?/delete">
								<input type="hidden" name="id" value={cliente.id} />
								<button type="submit" class="btn btn-error"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="lucide lucide-trash-2"
										><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path
											d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
										/><line x1="10" x2="10" y1="11" y2="17" /><line
											x1="14"
											x2="14"
											y1="11"
											y2="17"
										/></svg
									></button
								>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>

<dialog id="my_modal_2" class="modal" bind:this={isOpenModal}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Criar um cliente</h3>
		<!-- <ClienteModal /> -->

		<form method="POST" action="?/create">
			<div class="flex flex-col gap-3 mt-3">
				<label class="input input-bordered flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						class="h-4 w-4 opacity-70"
					>
						<path
							d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
						/>
					</svg>
					<input type="text" class="grow" placeholder="Name" name="name" />
				</label>
				<label class="input input-bordered flex items-center gap-2">
					<input type="text" class="grow" placeholder="Cnpj" name="cnpj" />
				</label>
				<button class="btn btn-info" type="submit">Criar cliente</button>
			</div>
		</form>

		<!-- <div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>
		</div> -->
	</div>
</dialog>

<dialog id="my_modal_2" class="modal" bind:this={isOpenModalUpdate}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Atualizar {selectedCliente.name}</h3>
		<!-- <ClienteModal /> -->

		<form method="POST" action="?/update">
			<div class="flex flex-col gap-3 mt-3">
				<label class="input input-bordered flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						class="h-4 w-4 opacity-70"
					>
						<path
							d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
						/>
					</svg>
					<input type="text" class="grow" placeholder="Name" name="name" />
				</label>
				<label class="input input-bordered flex items-center gap-2">
					<input type="text" class="grow" placeholder="Cnpj" name="cnpj" />
				</label>
				<button class="btn btn-info" type="submit">Atualizar cliente</button>
			</div>
		</form>

		<!-- <div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>
		</div> -->
	</div>
</dialog>
