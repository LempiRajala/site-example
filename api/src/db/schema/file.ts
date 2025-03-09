import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { randomUUID } from "node:crypto";

export const fileTable = pgTable('file', {
	id: uuid().$defaultFn(() => randomUUID()).primaryKey(),
	hash: varchar({ length: 256 }).notNull(),
	mimeType: varchar('mime_type', { length: 256 }).notNull(),
});