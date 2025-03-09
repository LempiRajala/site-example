'use server';

import { revalidatePath } from "next/cache";
import * as api from "./api";
import { type ILink, setValue, VALUES } from "./api/value";

export const updateArticle = async (...args: Parameters<typeof api.updateArticle>) => {
	const result = await api.updateArticle(...args).data;
	revalidatePath(`/${args[0]}`);
	return result;
}

export const deleteArticle = async (...args: Parameters<typeof api.deleteArticle>) => {
	const result = await api.deleteArticle(...args).data;
	revalidatePath(`/${args[0]}`);
	return result;
}

export const setHeaderLinks = async (
	links: ILink[],
) => {
	const result = await api.withoutController(setValue)(VALUES.HEADER_LINKS, links);
	revalidatePath('/', 'layout');
	return result;
}

export const setMobileMenuLinks = async (
	links: ILink[],
) => {
	const result = await api.withoutController(setValue)(VALUES.MOBILE_MENU_LINKS, links);
	revalidatePath('/', 'layout');
	return result;
}