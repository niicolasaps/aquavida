<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;

    let servicos = data.servicos
</script>

{JSON.stringify(servicos)}