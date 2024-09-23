<script>
	import ClienteModal from '$lib/components/modal/ClienteModal.svelte';
	import RepresentanteModal from '$lib/components/modal/RepresentanteModal.svelte';
	import ServicoModal from '$lib/components/modal/ServicoModal.svelte';

	let showClienteModal = false;
	let showRepresentanteModal = false;
	let showServicoModal = false;

	function toggleModal(modal) {
		if (modal === 'cliente') showClienteModal = !showClienteModal;
		if (modal === 'representante') showRepresentanteModal = !showRepresentanteModal;
		if (modal === 'servico') showServicoModal = !showServicoModal;
	}
</script>

<main>
    <h1>Teste CRUD para Cliente, Representante e Serviço</h1>
    <div>
        <button on:click={() => toggleModal('cliente')}>CRUD Cliente</button>
        <button on:click={() => toggleModal('representante')}>CRUD Representante</button>
        <button on:click={() => toggleModal('servico')}>CRUD Serviço</button>
    </div>

    {#if showClienteModal}
        <ClienteModal close={() => toggleModal('cliente')} />
    {/if}

    {#if showRepresentanteModal}
        <RepresentanteModal close={() => toggleModal('representante')} />
    {/if}

    {#if showServicoModal}
        <ServicoModal close={() => toggleModal('servico')} />
    {/if}
</main>

<style>
	main {
		padding: 20px;
	}

	button {
		margin: 10px;
		padding: 10px;
		font-size: 16px;
	}

    .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: white; /* Change to bright color for debugging */
    border: 2px solid red; /* Visible border for testing */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 10000; /* Very high z-index for debugging */
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999; /* Ensure this is below the modal */
}

</style>
