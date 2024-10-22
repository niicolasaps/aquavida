<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
    const clientes = data.clientes;
</script>

{#each clientes as cliente}
     {cliente.name}
{/each}
