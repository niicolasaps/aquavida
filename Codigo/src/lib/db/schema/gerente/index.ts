import { relations, sql } from 'drizzle-orm';
import { representanteTable } from '../representante';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';


export const gerenteTable = sqliteTable('gerente', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    Nome: text('Nome').notNull(),
    Estado: text('Estado'),
});

// Relações
export const gerenteRelations = relations(gerenteTable, ({ many }) => ({
    representantes: many(representanteTable),
}));

export type InsertGerente = {
    Nome: string;
    Estado?: string;
};

export type SelectGerenteById = {
    id: number;
    Nome: string;
    Estado?: string;
};