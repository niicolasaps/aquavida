import { db } from '$lib/server/db';
import { relatorioTable } from '$lib/server/db/schema/relatorio';
import type { InsertRelatorio } from '$lib/server/db/schema/relatorio';
import { contratoTable } from '../contrato';
import { servicoToContratoRelations } from '../servico';

// Inserir um relatório
async function insertRelatorio(data: InsertRelatorio) {
    return db.insert(relatorioTable).values(data);
}

// Selecionar um relatório por ID
async function selectRelatorioById(id: number) {
    return db.select().from(relatorioTable).where((relatorioTable.id as any).eq(id)).get();
}

// Selecionar todos os relatórios
async function selectAllRelatorios() {
    return db.select().from(relatorioTable).all();
}

async function selectRelatorioByContrato(id: number) {
    return db.select().from(relatorioTable).where((relatorioTable.contrato_ID as any).eq(id)).get();
}

// Atualizar um relatório por ID
async function updateRelatorio(id: number, data: Partial<InsertRelatorio>) {
    return db.update(relatorioTable).set(data).where((relatorioTable.id as any).eq(id)).run();
}

// Deletar um relatório por ID
async function deleteRelatorio(id: number) {
    return db.delete(relatorioTable).where((relatorioTable.id as any).eq(id)).run();
}

export const relatorioController = {
    insertRelatorio,
    selectRelatorioById,
    selectAllRelatorios,
    updateRelatorio,
    deleteRelatorio,
    selectRelatorioByContrato
};
