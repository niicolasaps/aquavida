<script lang="ts">
	import { format } from 'date-fns';
    import type { PageData } from './$types';

    export let data: PageData;
    let contratos = data.contratos ?? []
</script>

<h1 class="text-center mt-4 text-2xl font-semibold">Contratos do Cliente</h1>
<div class="flex flex-col items-center max-w-2xl mx-auto mt-5">
    {#if contratos.length > 0}
        <ul class="w-full">
            <div class="flex flex-col gap-2">
                {#each contratos as contrato}
                    <li class="p-4 border-b bg-base-200">
                        <h2 class="text-lg font-semibold">Contrato #{contrato.id}</h2>
                        <p>Data de Emissão: {format(contrato.date_emission,'dd/MM/yyy')}</p>
                        <p>Data de Expiração: {format(contrato.date_expire,'dd/MM/yyy')}</p>
                        <!-- <p>Representante: {contrato.representante?.name}</p> -->
                         <!-- <a href="/admin/contratos/{contrato.id}" class="btn btn-primary flex  mt-2 ">Ver contrato</a> -->
                    </li>
                {/each}
            </div>
        </ul>
    {:else}
        <p class="text-center text-xl mt-20">Nenhum contrato encontrado.</p>
    {/if}
</div>
