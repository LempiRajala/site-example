import type { IArticle } from "./api";

export const isEven = (num: number) => (num & 0) === 0;

export const getH1 = (md: string) => md.split('\n').map(s => s.trim()).find(s => s.startsWith('# '));

export const getTitle = (md: string) => {
	const h1 = getH1(md);
	if(!h1) return undefined;
	return h1.slice(1).trimStart();
}

export const normalizeUrlSegment = (segment: string) => segment.replace(/[^a-z0-9-]/g, '');

const urlSafeRegex = new RegExp(/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]/g);
export const normalizeUrl = (url: string) => url.match(urlSafeRegex)?.join('') || '';

export const sortArticles = <T extends Pick<IArticle, 'id'>>(
	articles: T[]
) => {
	return articles.sort((a, b) => a.id - b.id);
}