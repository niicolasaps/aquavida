import { db } from '../db';
import { representanteTable } from '$lib/db/schema/representante';
import type { InsertRepresentantes, SelectRepresentantes, SelectAllRepresentantes, UpdateRepresentante, DeleteRepresentante } from '$lib/db/schema/representante';

// Funções do CRUD para 'representante'

async function insertRepresentante(data: InsertRepresentante) {
    await db.insert(representanteTable).values(data).run();
}

async function selectRepresentanteById(id: number): Promise<SelectRepresentanteById | undefined> {
    return await db.select().from(representanteTable).where((representanteTable.id as any).eq(id)).get();
}

async function selectAllRepresentantes(): Promise<SelectAllRepresentantes[]> {
    return await db.select().from(representanteTable).all();
}

async function updateRepresentante(id: number, data: Partial<UpdateRepresentante>) {
    await db.update(representanteTable).set(data).where((representanteTable.id as any).eq(id)).run();
}

async function deleteRepresentante(id: number) {
    await db.delete(representanteTable).where((representanteTable.id as any).eq(id)).run();
}

// Controlador exportado para 'representante'
export const representanteController = {
    insertRepresentante,
    selectRepresentanteById,
    selectAllRepresentantes,
    updateRepresentante,
    deleteRepresentante
};
