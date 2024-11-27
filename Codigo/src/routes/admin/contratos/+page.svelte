<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
    import type { PageData } from './$types';
	import { format } from "date-fns";
    
    export let data: PageData;
	export let form
</script>
<main class="container mx-auto">

	<Alert message={form?.message} success={form?.success}/>
	<div class="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4">
		{#each data.contratos as template}
		<div class="card bg-base-100 image-full md:max-w-96 w-full shadow-xl">
				<!-- <figure>
					<img
					src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
					alt="Shoes"
					/>
					</figure> -->
					<div class="card-body">
						<h2 class="card-title">Nome: {template.contrato.nome}</h2>
						{#if template.contrato.date_emission}
							<p>Criado em: {format(template.contrato.date_emission,'dd/MM/yyyy')}</p>
						{/if}
						<p>Vence em: {format(template.contrato.date_expire,'dd/MM/yyyy')}</p>
                        <!-- <p>Representante: {template.representante?.name}</p> -->
						<p>Cliente: {template.cliente?.name}</p>
						<div class="card-actions justify-end">
							<a
							href="/admin/acompanhamento/{template.contrato.id}"
							class="btn btn-secondary"
							>Acompanhar</a
						>
							<a
							href="/admin/contratos/{template.contrato.id}"
							class="btn btn-primary"
							>Editar</a
						>
						<form method="POST" action="?/delete">
							<input type="hidden" name="id" value={template.contrato.id} />
							<button
								class="btn btn-error"
								>Excluir</button
							>
						</form>
					</div>
				</div>
			</div>
			{/each}
			<a class="btn btn-primary h-full" href="/admin/contratos/criar">Novo contrato<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg></a>
	</div>
</main>