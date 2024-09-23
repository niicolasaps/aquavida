import { db } from '$lib/db';
import { clienteTable } from '$lib/db/schema/cliente';
import type { InsertCliente, SelectCliente } from '$lib/db/schema/cliente';

// Inserir um cliente
async function insertCliente(data: InsertCliente) {
    return db.insert(clienteTable).values(data).run();
}

// Selecionar um cliente por ID
async function selectClienteById(id: number) {
    return db.select().from(clienteTable).where((clienteTable.id as any).eq(id)).get();
}

// Selecionar todos os clientes
async function selectAllClientes() {
    return db.select().from(clienteTable).all();
}

// Atualizar um cliente por ID
async function updateCliente(id: number, data: Partial<InsertCliente>) {
    return db.update(clienteTable).set(data).where((clienteTable.id as any).eq(id)).run();
}

// Deletar um cliente por ID
async function deleteCliente(id: number) {
    return db.delete(clienteTable).where((clienteTable.id as any).eq(id)).run();
}

export const clienteController = {
    insertCliente,
    selectClienteById,
    selectAllClientes,
    updateCliente,
    deleteCliente
};