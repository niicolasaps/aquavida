import { db } from '$lib/server/db';
import { contratoTable } from '$lib/server/db/schema/contrato';
import type { InsertContrato, SelectContrato } from '$lib/server/db/schema/contrato';
import { eq } from 'drizzle-orm';
import { representanteTable } from '../representante';
import { clienteTable } from '../cliente';

async function insertContrato(data: InsertContrato) {
	return db.insert(contratoTable).values(data);
}

async function selectContratoById(id: number) {
	return db.select().from(contratoTable).where(eq(contratoTable.id, id));
}

async function selectContratoByIdClientRepresentante(id: number) {
	return db.select().from(contratoTable).where(eq(contratoTable.id, id)).leftJoin(clienteTable,eq(clienteTable.id,contratoTable.cliente_id)).leftJoin(representanteTable,eq(clienteTable.representante_id,representanteTable.id))
}

async function selectContratoByClienteId(id: number) {
	return db.select().from(contratoTable).where(eq(contratoTable.cliente_id, id));
}

async function selectAllContratos() {
	return db.select().from(contratoTable);
}

async function selectAllContratosWithRepresentante() {
	return db.select().from(contratoTable).leftJoin(clienteTable,eq(clienteTable.id,contratoTable.cliente_id))
}

async function updateContrato(id: number, data: Partial<SelectContrato>) {
	return db.update(contratoTable).set(data).where(eq(contratoTable.id, id));
}

async function deleteContrato(id: number) {
	return db.delete(contratoTable).where(eq(contratoTable.id, id));
}
export const contratoController = {
    insertContrato,
    selectContratoById,
    selectAllContratos,
    updateContrato,
    deleteContrato,
	selectContratoByClienteId,
	selectAllContratosWithRepresentante,
	selectContratoByIdClientRepresentante
};
