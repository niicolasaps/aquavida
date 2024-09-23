<script>
    export let close;
  
    let clienteData = {};
    let result = '';
  
    // Funções de interação com o backend
    async function insertCliente() {
      const response = await fetch('/api/cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteData)
      });
      result = await response.json();
    }
  
    async function selectAllClientes() {
      const response = await fetch('/api/cliente');
      result = await response.json();
    }
  
    async function updateCliente() {
      const response = await fetch(`/api/cliente/${clienteData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteData)
      });
      result = await response.json();
    }
  
    async function deleteCliente() {
      const response = await fetch(`/api/cliente/${clienteData.id}`, {
        method: 'DELETE'
      });
      result = await response.json();
    }
  </script>
  
  <div class="modal-overlay" on:click={close}></div>
  <div class="modal">
    <h2>CRUD Cliente</h2>
    <button on:click={selectAllClientes}>Buscar Todos os Clientes</button>
  
    <form on:submit|preventDefault={insertCliente}>
      <input bind:value={clienteData.nome} id="cliente-nome" name="nome" placeholder="Nome" />
      <input bind:value={clienteData.cnpj} id="cliente-cnpj" name="cnpj" placeholder="CNPJ" />
      <button type="submit">Inserir Cliente</button>
    </form>
    
    <form on:submit|preventDefault={updateCliente}>
      <input bind:value={clienteData.id} id="cliente-id" name="id" placeholder="ID" />
      <input bind:value={clienteData.nome} id="cliente-novo-nome" name="nome" placeholder="Novo Nome" />
      <input bind:value={clienteData.cnpj} id="cliente-novo-cnpj" name="cnpj" placeholder="Novo CNPJ" />
      <button type="submit">Atualizar Cliente</button>
    </form>
    
    <form on:submit|preventDefault={deleteCliente}>
      <input bind:value={clienteData.id} id="delete-cliente-id" name="id" placeholder="ID" />
      <button type="submit">Deletar Cliente</button>
    </form>
  
    <p>Resultado: {result}</p>
    <button on:click={close}>Fechar</button>
  </div>
  
  <style>
    .modal {
      padding: 20px;
      background-color: white;
      border: 1px solid black;
    }
  </style>
  