import { db } from '$lib/db';
import { gerenteTable } from '$lib/db/schema/gerente';
import type { InsertGerente, SelectGerenteById, SelectAllGerentes, UpdateGerente, DeleteGerente } from '$lib/db/schema/gerente';

// Inserir um gerente
async function insertGerente(data: InsertGerente) {
    return db.insert(gerenteTable).values(data).run();
}

// Selecionar um gerente por ID
async function selectGerenteById(id: number) {
    return db.select().from(gerenteTable).where((gerenteTable.id as any).eq(id)).get();
}

// Selecionar todos os gerentes
async function selectAllGerentes() {
    return db.select().from(gerenteTable).all();
}

// Atualizar um gerente por ID
async function updateGerente(id: number, data: Partial<InsertGerente>) {
    return db.update(gerenteTable).set(data).where((gerenteTable.id as any).eq(id)).run();
}

// Deletar um gerente por ID
async function deleteGerente(id: number) {
    return db.delete(gerenteTable).where((gerenteTable.id as any).eq(id)).run();
}

export const gerenteController = {
    insertGerente,
    selectGerenteById,
    selectAllGerentes,
    updateGerente,
    deleteGerente
};
