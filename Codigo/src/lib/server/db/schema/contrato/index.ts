import { relations, sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { clienteTable } from '../cliente';
import { representanteTable } from '../representante';
import { servicoToContratoTable } from '../servico';
import { relatorioTable } from '../relatorio';

export const contratoTable = sqliteTable('contrato', {
	id: integer('id').notNull().primaryKey({ autoIncrement: true }),
	date_emission: integer('date_emission',{mode:"timestamp"}).default(sql`(CURRENT_TIMESTAMP)`),
	date_expire: integer('date_expire',{mode:"timestamp"}).notNull(),
	updated_at:integer('updated_at',{mode:"timestamp"}).default(sql`(CURRENT_TIMESTAMP)`),
	cliente_id: integer('cliente_id').references(() => clienteTable.id),
	descricao: text('descricao'),
	nome:text('nome'),
});

export const contratoRelations = relations(contratoTable, ({ one, many }) => ({
	cliente: one(clienteTable, {
		fields: [contratoTable.cliente_id],
		references: [clienteTable.id]
	}),
	relatorio: many(relatorioTable),
	servico: many(servicoToContratoTable),
}));

export type SelectContrato = typeof contratoTable.$inferSelect;
export type InsertContrato = typeof contratoTable.$inferInsert;
