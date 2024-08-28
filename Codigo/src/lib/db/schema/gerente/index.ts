import { relations, sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const gerenteTable = sqliteTable('gerente', {
	id: integer('id').notNull().primaryKey({ autoIncrement: true }),
	name: text('name').notNull()
});

export const gerenteRelations = relations(gerenteTable, ({ one, many }) => ({
	representante: many(gerenteTable)
}));

export type SelectGerente = typeof gerenteTable.$inferSelect;
export type InsertGerente = typeof gerenteTable.$inferInsert;
