<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let isOpenModal: HTMLDialogElement | null = null;

	let templates = data.templates;
	let servicos = data.servicos;

	let descricao = '';

	let simbolo = ' {&} ';

	function appendSimbolo() {
		descricao = descricao.concat(simbolo);
	}
</script>

<button on:click={() => isOpenModal?.showModal()} class="btn btn-primary">Novo template</button>

{#each templates as template}
	<!-- content here -->
	<div class="card bg-base-100 image-full w-96 shadow-xl">
		<!-- <figure>
			<img
				src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
				alt="Shoes"
			/>
		</figure> -->
		<div class="card-body">
			<h2 class="card-title">Shoes!</h2>
			<p>{template.descricao}</p>
			<div class="card-actions justify-end">
				<button class="btn btn-primary">Editar</button>
			</div>
		</div>
	</div>
{/each}

<dialog id="my_modal_2" class="modal" bind:this={isOpenModal}>
	<div class="modal-box">
		<h3 class="text-lg font-bold">Criar um template de um servico</h3>
		<button
			on:click={() => isOpenModal?.close()}
			class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button
		>
		<!-- <servicosModal /> -->

		<div class="w-full flex flex-col gap-2">
			<select class="select select-bordered w-full">
				<option disabled selected>Selecione o servico</option>
				{#each servicos as servico}
					<option value={servico.id}>{servico.name}</option>
				{/each}
			</select>
			<textarea class="textarea textarea-bordered" placeholder="Bio" bind:value={descricao}
			></textarea>
			<button class="btn btn-primary" on:click={appendSimbolo}>Adicionar espaço para variavel</button>
		</div>


		<!-- <div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>
		</div> -->
	</div>
</dialog>
