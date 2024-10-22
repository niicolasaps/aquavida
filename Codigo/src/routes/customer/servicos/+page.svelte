<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
    let servicos = data.servicos
    let representantes = data.representantes
</script>

<div class="container mx-auto py-8">
    <h1 class="text-4xl font-bold mb-6 text-center">Nossos Serviços</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each servicos as servico (servico.id)}
            <div class="bg-base-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h2 class="text-2xl font-semibold mb-2">{servico.name}</h2>
                <p class="">{servico.description}</p>
            </div>
        {/each}
    </div>
</div>

