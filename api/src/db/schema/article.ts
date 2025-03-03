import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const articleTable = pgTable('article', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	title: text().notNull(),
	content: text().notNull(),
	updatedAt: timestamp().defaultNow().$onUpdate(() => new Date()).notNull(),
	createdAt: timestamp().defaultNow().notNull(),

	metaDescription: varchar('meta_description', { length: 256 }).notNull(),
	metaKeywords: varchar('meta_keywords', { length: 256 }).notNull(),

	url: varchar({ length: 256 }).notNull().unique(),
});