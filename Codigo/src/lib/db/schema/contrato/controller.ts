import { db } from '$lib/db';
import { contratoTable } from '$lib/db/schema/contrato';
import type { InsertContrato, SelectContratoById, SelectAllContratos, UpdateContrato, DeleteContrato } from '$lib/db/schema/contrato';

// Inserir um contrato
async function insertContrato(data: InsertContrato) {
    return db.insert(contratoTable).values(data).run();
}

// Selecionar um contrato por ID
async function selectContratoById(id: number) {
    return db.select().from(contratoTable).where((contratoTable.id as any).eq(id)).get();
}

// Selecionar todos os contratos
async function selectAllContratos() {
    return db.select().from(contratoTable).all();
}

// Atualizar um contrato por ID
async function updateContrato(id: number, data: Partial<InsertContrato>) {
    return db.update(contratoTable).set(data).where((contratoTable.id as any).eq(id)).run();
}

// Deletar um contrato por ID
async function deleteContrato(id: number) {
    return db.delete(contratoTable).where((contratoTable.id as any).eq(id)).run();
}

export const contratoController = {
    insertContrato,
    selectContratoById,
    selectAllContratos,
    updateContrato,
    deleteContrato
};
