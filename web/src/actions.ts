'use server';

import { revalidatePath } from "next/cache";
import * as api from "./api";

export const updateArticle = async (...args: Parameters<typeof api.updateArticle>) => {
	revalidatePath(`/${args[0]}`);
	return api.updateArticle(...args).data;
}

export const deleteArticle = async (...args: Parameters<typeof api.deleteArticle>) => {
	revalidatePath(`/${args[0]}`);
	return api.deleteArticle(...args).data;
}