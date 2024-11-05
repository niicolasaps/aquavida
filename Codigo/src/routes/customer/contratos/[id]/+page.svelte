<script lang="ts">
    import type { PageData } from '../$types';

    export let data: PageData;
    let contratos = data.contratos;
</script>

<h1 class="text-center mt-4 text-2xl font-semibold">Contratos do Cliente</h1>
<div class="flex flex-col items-center max-w-2xl mx-auto mt-5">
    {#if contratos.length > 0}
        <ul class="w-full">
            {#each contratos as contrato}
                <li class="p-4 border-b border-gray-200">
                    <h2 class="text-lg font-semibold">Contrato #{contrato.id}</h2>
                    <p>Data de Emissão: {contrato.date_emission}</p>
                    <p>Data de Expiração: {contrato.date_expire}</p>
                    <p>Representante: {contrato.representante?.name}</p>
                </li>
            {/each}
        </ul>
    {:else}
        <p class="text-center text-gray-500">Nenhum contrato encontrado.</p>
    {/if}
</div>
