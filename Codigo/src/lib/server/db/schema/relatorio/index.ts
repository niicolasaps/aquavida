import { relations } from 'drizzle-orm';
import { servicoTable } from '../servico'; // Ajuste o caminho conforme necessário
import { representanteTable } from '../representante';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { contratoTable } from '../contrato';

export const relatorioTable = sqliteTable('relatorio', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    Status: text('Status').notNull(),
    InclusaoServico: integer('InclusaoServico').notNull(),
    Observacoes: text('Observacoes'),
    servico_ID: integer('servico_ID').references(() => servicoTable.id),
    representante_ID: integer('representante_ID').references(() => representanteTable.id),
    contrato_ID: integer('contrato_ID').references(() => contratoTable.id),
});

// Relações
export const relatorioRelations = relations(relatorioTable, ({ one }) => ({
    servico: one(servicoTable),
    representante: one(representanteTable),
}));

export type InsertRelatorio = {
    Status: string;
    InclusaoServico: number;
    Observacoes?: string;
    servico_ID: number;
    representante_ID: number;
};

export type SelectRelatorioById = {
    id: number;
    Status: string;
    InclusaoServico: number;
    Observacoes?: string;
    servico_ID: number;
    representante_ID: number;
    contrato_ID:number;
};
