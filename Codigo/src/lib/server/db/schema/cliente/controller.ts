import { db } from '$lib/server/db';
import { clienteTable, pedidosClienteTable } from '$lib/server/db/schema/cliente';
import type {
	InsertCliente,
	InsertPedido,
	SelectCliente,
	SelectPedido
} from '$lib/server/db/schema/cliente';
import { eq } from 'drizzle-orm';
import { servicoTable } from '../servico';

async function insertCliente(data: InsertCliente) {
	return db.insert(clienteTable).values(data);
}
async function selectClienteById(id: number) {
	return db.select().from(clienteTable).where(eq(clienteTable.id, id));
}

async function selectAllClientes() {
	return db.select().from(clienteTable);
}

async function updateCliente(id: number, data: Partial<SelectCliente>) {
	return db.update(clienteTable).set(data).where(eq(clienteTable.id, id));
}

async function deleteCliente(id: number) {
	return db.delete(clienteTable).where(eq(clienteTable.id, id));
}

async function insertPedido(data: InsertPedido) {
	return db.insert(pedidosClienteTable).values(data);
}

async function selectAllPedidos() {
	return db.select().from(pedidosClienteTable).leftJoin(servicoTable,eq(servicoTable.id,pedidosClienteTable.servico_id))
}

async function updatePedido(id: number, data: Partial<SelectPedido>) {
	return db.update(pedidosClienteTable).set(data).where(eq(pedidosClienteTable.id, id));
}

export const clienteController = {
	insertCliente,
	selectClienteById,
	selectAllClientes,
	updateCliente,
	deleteCliente,
	insertPedido,
	selectAllPedidos,
	updatePedido
};
