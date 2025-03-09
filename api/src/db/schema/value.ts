import { jsonb, pgEnum, pgTable } from "drizzle-orm/pg-core";
import { enumToPgEnum } from "./shared";
import { db } from "..";
import { eq } from "drizzle-orm";

export enum VALUES {
	HEADER_LINKS = 'HEADER_LINKS',
	MOBILE_MENU_LINKS = 'MOBILE_MENU_LINKS',
	FOOTER_LINKS = 'FOOTER_LINKS',
}

export const pgValuesEnum = pgEnum('values_keys', enumToPgEnum(VALUES));

export const valueTable = pgTable('value', {
	key: pgValuesEnum().primaryKey(),
	value: jsonb().notNull(),
});

export interface ILink {
	text: string;
	href: string;
}

export interface IValuesMap {
	[VALUES.HEADER_LINKS]: ILink[];
	[VALUES.MOBILE_MENU_LINKS]: ILink[];
	[VALUES.FOOTER_LINKS]: ILink[];
}

export const getValue = async <T extends VALUES>(
	key: T
): Promise<IValuesMap[T] | null> => {
	const list = await db.select().from(valueTable).where(eq(valueTable.key, key));
	const first = list.at(0);
	if(first) {
		return first.value as IValuesMap[T];
	} else {
		return null;
	}
}

export const setValue = async <T extends VALUES>(
	key: T,
	value: IValuesMap[T],
) => {
	const list = await db
		.insert(valueTable)
		.values({ key, value })
		.onConflictDoUpdate({
			target: valueTable.key,
			set: { value },
		})
		.returning();
	return list[0] as { key: T, value: IValuesMap[T] };
}