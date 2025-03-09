import { getManyArticlesLimit } from "../../const";
import { fetchApi, jsonHeader } from "./shared"

export interface IArticle {
	id: number;
	title: string;
	content: string;
	updatedAt: string;
	createdAt: string;
	url: string;
	metaKeywords: string;
	metaDescription: string;
}

export interface IGetManyArticles {
	limit?: number;
	offset: number;
}

export const getArticle = (
	id: number,
) => {
	const { controller, res } = fetchApi(`/articles/${id}`);
	return {
		controller,
		data: res.then(async res => {
			if(res.status === 404) {
				return null;
			}

			if(!res.ok) {
				throw new Error(`${res.status}: ${await res.text()}`);
			}

			return res.json() as Promise<IArticle>;
		}),
	}
}

export const getArticleByUrl = (
	url: string,
) => {
	const { controller, res } = fetchApi(`/articles/url/${url}`);
	return {
		controller,
		data: res.then(async res => {
			if(res.status === 404) {
				return null;
			}

			if(!res.ok) {
				throw new Error(`${res.status}: ${await res.text()}`);
			}

			return res.json() as Promise<IArticle>;
		}),
	}
}

export const getManyArticles = ({
	limit = getManyArticlesLimit,
	offset,
}: IGetManyArticles) => {
	const { controller, res } = fetchApi(`/articles?limit=${limit}&offset=${offset}`);
	return {
		controller,
		data: res.then(async res => {
			if(!res.ok) {
				throw new Error(`${res.status}: ${await res.text()}`);
			}

			return res.json() as Promise<IArticle[]>;
		}),
	}
}

export const createArticle = (
	data: Omit<IArticle, 'id' | 'updatedAt' | 'createdAt'>,
) => {
	const { controller, res } = fetchApi(
		`/articles`, {
			method: 'POST',
			headers: jsonHeader,
			body: JSON.stringify(data),
		});
	return {
		controller,
		data: res.then(async res => {
			if(!res.ok) {
				throw new Error(`${res.status}: ${await res.text()}`);
			}

			return res.json() as Promise<IArticle>;
		}),
	}
}

export const updateArticle = (
	id: number,
	data: Partial<Omit<IArticle, 'id'>>,
) => {
	const { controller, res } = fetchApi(
		`/articles/${id}`, {
			method: 'POST',
			headers: jsonHeader,
			body: JSON.stringify(data),
		});
	return {
		controller,
		data: res.then(async res => {
			if(!res.ok) {
				throw new Error(`${res.status}: ${await res.text()}`);
			}

			return res.json() as Promise<IArticle>;
		}),
	}
}

export const deleteArticle = (
	id: number,
) => {
	const { controller, res } = fetchApi(
		`/articles/${id}`, {
			method: 'DELETE',
		});
	return {
		controller,
		data: res.then(async res => {
			if(res.status === 404) {
				return null;
			}

			if(!res.ok) {
				throw new Error(`${res.status}: ${await res.text()}`);
			}

			return res.json() as Promise<IArticle>;
		}),
	}
}

export const watchArticle = (id: number) => {
	return new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/articles/watch/${id}`);
}