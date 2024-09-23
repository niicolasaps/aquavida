import { db } from '$lib/db';
import { servicoTable } from '$lib/db/schema/servico';
import type { InsertServico, SelectServicoById, SelectAllServicos, UpdateServico, DeleteServico } from '$lib/db/schema/servico';

// Funções do CRUD para 'servico'

async function insertServico(data: InsertServico) {
    await db.insert(servicoTable).values(data).run();
}

async function selectServicoById(id: number): Promise<SelectServicoById | undefined> {
    return await db.select().from(servicoTable).where((servicoTable.id as any).eq(id)).get();
}

async function selectAllServicos(): Promise<SelectAllServicos[]> {
    return await db.select().from(servicoTable).all();
}

async function updateServico(id: number, data: Partial<UpdateServico>) {
    await db.update(servicoTable).set(data).where((servicoTable.id as any).eq(id)).run();
}

async function deleteServico(id: number) {
    await db.delete(servicoTable).where((servicoTable.id as any).eq(id)).run();
}

// Controlador exportado para 'servico'
export const servicoController = {
    insertServico,
    selectServicoById,
    selectAllServicos,
    updateServico,
    deleteServico
};