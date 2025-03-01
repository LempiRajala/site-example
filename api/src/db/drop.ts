import { eq } from "drizzle-orm";
import { db } from ".";
import { articleTable } from "./schema";

(async () => {
	const list = await db
		.select({ id: articleTable.id })
		.from(articleTable);
	await Promise.all(list.map(({ id }) => (
		db
			.delete(articleTable)
			.where(eq(articleTable.id, id))
	)));
})();