import { relations } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { contratoTable } from '../contrato';
import { servicoTable } from '../servico';
import { templateTable } from '../template';

export const servicoContratoTable = sqliteTable('servico', {
	id: integer('id').notNull().primaryKey({ autoIncrement: true }),
	status: text('status', { enum: ['naoIniciado','recusado','pendente', 'emAndamento', 'Finalizado'] }).notNull(),
});

export const servicoContratoRelations = relations(servicoContratoTable, ({ many, one }) => ({
	contrato: many(servicoContratoToContratoTable),
	servico: many(servicoContratoToServicoTable),

}));

export const servicoContratoToContratoTable = sqliteTable('servicoContrato_to_contrato', {
	servicoContrato_id: integer('servicoContrato_id')
		.notNull()
		.references(() => servicoContratoTable.id),
	contrato_id: integer('contrato_id')
		.notNull()
		.references(() => contratoTable.id)
});

export const servicoContratoToContratoRelations = relations(servicoContratoToContratoTable, ({ one }) => ({
	servicoContrato: one(servicoContratoTable, {
		fields: [servicoContratoToContratoTable.servicoContrato_id],
		references: [servicoContratoTable.id]
	}),
	contrato: one(contratoTable, {
		fields: [servicoContratoToContratoTable.contrato_id],
		references: [contratoTable.id]
	})
}));

export const servicoContratoToServicoTable = sqliteTable('servicoContrato_to_servico', {
	servicoContrato_id: integer('servicoContrato_id')
		.notNull()
		.references(() => servicoContratoTable.id),
	servico_id: integer('contrato_id')
		.notNull()
		.references(() => servicoTable.id)
});

export const servicoContratoToServicoRelations = relations(servicoContratoToServicoTable, ({ one }) => ({
	servicoContrato: one(servicoTable, {
		fields: [servicoContratoToServicoTable.servicoContrato_id],
		references: [servicoTable.id]
	}),
	servico: one(servicoTable, {
		fields: [servicoContratoToServicoTable.servico_id],
		references: [servicoTable.id]
	})
}));

export type SelectServicoContrato = typeof servicoContratoTable.$inferSelect;
export type InsertServicoContrato = typeof servicoContratoTable.$inferInsert;
