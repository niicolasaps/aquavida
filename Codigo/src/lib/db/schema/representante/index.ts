import { relations, sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { gerenteTable } from '../gerente';
import { clienteTable } from '../cliente';
//import { contratoTable } from '../contrato';
//import { relatorioTable } from '../relatorio';

export const representanteTable = sqliteTable('representante', {
	id: integer('id').notNull().primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	gerente_id: integer('gerente_id').references(() => gerenteTable.id)
});

export const representanteRelations = relations(representanteTable, ({ one, many }) => ({
	gerente: one(gerenteTable, {
		fields: [representanteTable.gerente_id],
		references: [gerenteTable.id]
	}),
	clientes: many(clienteTable, {
		fields: [representanteTable.id],
		references: [clienteTable.representante_id]
	}),
	contratos: many(contratoTable, {
		fields: [representanteTable.id],
		references: [contratoTable.representante_id]
	}),
	relatorios: many(relatorioTable, {
		fields: [representanteTable.id],
		references: [relatorioTable.representante_id]
	})
}));

export type SelectRepresentantes = typeof representanteTable.$inferSelect;
export type InsertRepresentantes = typeof representanteTable.$inferInsert;
