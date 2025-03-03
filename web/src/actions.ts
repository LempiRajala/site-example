'use server';

import { revalidatePath } from "next/cache";
import * as api from "./api";
import { ILink, setValue, VALUES } from "./api/value";

export const updateArticle = async (...args: Parameters<typeof api.updateArticle>) => {
	revalidatePath(`/${args[0]}`);
	return api.updateArticle(...args).data;
}

export const deleteArticle = async (...args: Parameters<typeof api.deleteArticle>) => {
	revalidatePath(`/${args[0]}`);
	return api.deleteArticle(...args).data;
}

export const setHeaderLinks = async (
	links: ILink[],
) => {
	revalidatePath('/', 'layout');
	return await api.withoutController(setValue)(VALUES.HEADER_LINKS, links);
}

export const setMobileMenuLinks = async (
	links: ILink[],
) => {
	revalidatePath('/', 'layout');
	return await api.withoutController(setValue)(VALUES.MOBILE_MENU_LINKS, links);
}