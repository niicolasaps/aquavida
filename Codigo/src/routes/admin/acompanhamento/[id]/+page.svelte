<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;

  let contrato = data.contratoC;
  let pedidos = data.pedidos;
</script>

<div class="container grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
  <div class="sidebar">
    <h2 class="text-2xl">Pedidos</h2>
    <div class="list-items">
      {#each pedidos as pedido}
        <div class="list-item">
          <span>Pedido {pedido.pedidos.id}</span>
          <button>Visualizar</button>
        </div>
      {/each}
    </div>
  </div>
  <div class="main-content">
    <h2 class="text-2xl font-semibold">Informações do Contrato</h2>
    <p> <span>Data de Emissão:</span> {contrato.date_emission}</p>
    <p> <span>Data de Expiração:</span>{contrato.date_expire}</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam recusandae in excepturi error neque necessitatibus nam, ratione illo quo voluptatem molestiae velit! Quaerat facilis, deserunt hic iusto quasi tempora quas.</p>
    <!-- Adicione mais informações do contrato aqui -->
  </div>
</div>


<style>
  p {
    margin: 30px ;
  }
  span {
    margin: 30px ;
    font-weight: 600;
    font-size: larger;
  }
  .sidebar h2 {
    font-weight: 800;
  }
  .main-content {
    padding: 20px;
    margin-left: 30px;
  }
  .main-content h2 {
    font-weight: 800;
  }

  .sidebar {
    padding: 20px;
    margin-left: 50px;
  }
  .list-items {
    padding: 20px;
    margin: 50px;
  }
  body {
    margin: 40px;
    padding: 40px;
    align-self: center;
  }
  
</style>