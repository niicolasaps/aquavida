import { relations } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { representanteTable } from '../representante';

export const gerenteTable = sqliteTable('gerente', {
	id: integer('id').notNull().primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
    estado: text('estado').notNull(),
});

export const gerenteRelations = relations(gerenteTable, ({ many }) => ({
	representante: many(representanteTable)
}));

export type SelectGerente = typeof gerenteTable.$inferSelect;
export type InsertGerente = typeof gerenteTable.$inferInsert;
