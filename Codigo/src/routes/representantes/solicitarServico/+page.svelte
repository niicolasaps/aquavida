<script lang="ts">
	import type { PageData } from './$types';

	import { getUserContext } from '$lib/stores/user';

	const user = getUserContext();

	export let data: PageData;
	export let form;

	let servicos = data.servicos;
</script>

<h1 class="text-center mt-4 text-2xl font-semibold">Recomendar serviços</h1>
<form method="post" action="?/solicitar">
	<div class="flex flex-col justify-center items-center max-w-xl mx-auto mt-5">
		<label class="form-control w-full">
			<div class="label">
				<span class="label-text">Recomende um serviço</span>
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

		<button class="btn btn-primary mt-4 w-full" type="submit">Recomendar serviço</button>

		{#if form?.message}
			<p class="text-error text-center mt-4">{form.message}</p>
		{/if}
	</div>
</form>
