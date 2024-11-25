import { db } from '$lib/server/db';
import { servicoContratoTable } from '$lib/server/db/schema/servicoContrato';
import type { InsertServicoContrato, SelectServicoContrato } from '$lib/server/db/schema/servicoContrato';
import { eq } from 'drizzle-orm';

async function insertServicoContrato(data: InsertServicoContrato) {
	return db.insert(servicoContratoTable).values(data);
}

async function selectServicoContratoById(id: number) {
	return db.select().from(servicoContratoTable).where(eq(servicoContratoTable.id, id));
}

async function selectAllServicosContrato() {
	return db.select().from(servicoContratoTable);
}
async function updateServicoContrato(id: number, data: Partial<SelectServicoContrato>) {
	return db.update(servicoContratoTable).set(data).where(eq(servicoContratoTable.id, id));
}

async function deleteServicoContrato(id: number) {
	return db.delete(servicoContratoTable).where(eq(servicoContratoTable.id, id));
}

export const servicoController = {
	insertServicoContrato,
	selectServicoContratoById,
	selectAllServicosContrato,
	updateServicoContrato,
	deleteServicoContrato
};
