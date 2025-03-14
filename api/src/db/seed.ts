import { readFileSync } from "node:fs";
import { db } from ".";
import { articleTable } from "./schema";
import { resolve } from "node:path";
import { HOUR, WEEK } from "../const ";
import { getTitle } from "../utils";

(async () => {
	await seedDatabase();
})();

async function seedDatabase() {
	const content = readFileSync(resolve(__dirname, './sample-artilce-content.md')).toString();
	const now = Date.now();

	for(let i = 0; i !== 50; i++) {
		const createdAt = new Date(now - Math.random() * WEEK + HOUR);
		await db
			.insert(articleTable)
			.values({
				createdAt,
				updatedAt: new Date(createdAt.getTime() + Math.random() * HOUR),
				content,
				title: getTitle(content) ?? 'заголовок',
				url: `sample-${i}`,
				metaKeywords: 'ai, tech, future',
				metaDescription: 'Будущее с ИИ',
			});
	}
}