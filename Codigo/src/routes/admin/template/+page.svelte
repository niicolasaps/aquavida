<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let templates = data.templates;
	let servicos = data.servicos;

    let descricao = ''

    let simbolo = ' {&} '

    function appendSimbolo(){
        descricao = descricao.concat(simbolo)
    }
</script>

<select class="select select-bordered w-full max-w-xs">
	<option disabled selected>Selecione o servico</option>
	{#each servicos as servico}
		<option value={servico.id}>{servico.name}</option>
	{/each}
</select>
<textarea class="textarea textarea-bordered" placeholder="Bio" bind:value={descricao}></textarea>
<button class="btn btn-primary" on:click={appendSimbolo}>Adicionar espaço para variavel</button>
