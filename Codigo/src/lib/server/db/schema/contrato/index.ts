import { relations, sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { clienteTable } from '../cliente';
import { representanteTable } from '../representante';
import { servicoToContratoTable } from '../servico';
import { servicoContratoToContratoTable } from '../servicoContrato';

export const contratoTable = sqliteTable('contrato', {
	id: integer('id').notNull().primaryKey({ autoIncrement: true }),
	date_emission: integer('date_emission',{mode:"timestamp"}).default(sql`(CURRENT_TIMESTAMP)`),
	date_expire: integer('date_expire',{mode:"timestamp"}).notNull(),
	updated_at:integer('updated_at',{mode:"timestamp"}).default(sql`(CURRENT_TIMESTAMP)`),
	cliente_id: integer('cliente_id').references(() => clienteTable.id),
	// representante_id: integer('representante_id').references(() => representanteTable.id),
	descricao: text('descricao'),
	nome:text('nome'),
	// servico_id: integer('servico_id').references(() => servicoTable.id)
});

export const contratoRelations = relations(contratoTable, ({ one, many }) => ({
	cliente: one(clienteTable, {
		fields: [contratoTable.cliente_id],
		references: [clienteTable.id]
	}),
	// representate: one(representanteTable, {
	// 	fields: [contratoTable.representante_id],
	// 	references: [representanteTable.id]
	// }),
	servico: many(servicoToContratoTable),
	servicoContrato: many(servicoContratoToContratoTable)
}));

export type SelectContrato = typeof contratoTable.$inferSelect;
export type InsertContrato = typeof contratoTable.$inferInsert;
