import type { IArticle } from "./api";

export const isEven = (num: number) => (num & 0) === 0;

export const getH1 = (md: string) => md.split('\n').map(s => s.trim()).find(s => s.startsWith('# '));

export const getTitle = (md: string) => {
	const h1 = getH1(md);
	if(!h1) return undefined;
	return h1.slice(1).trimStart();
}

export const validateUrlSegment = (segment: string) => segment.replace(/[^a-z0-9-]/g, '');

export const normalizeLink = (href: string) => (
	href.startsWith('http') ? href : `/${href}`
)

const urlSafeRegex = new RegExp(/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]/g);
export const validateUrl = (url: string) => url.match(urlSafeRegex)?.join('') || '';

export const sortArticles = <T extends Pick<IArticle, 'id'>>(
	articles: T[]
) => {
	return articles.sort((a, b) => a.id - b.id);
}

export const getImageFromUser = () => getFileFromUser("image/*");

export const getFileFromUser = (accept?: string): Promise<File | null> => {
  return new Promise(resolve => {
    const input = document.createElement("input");
    input.type = "file";
    if(accept) {
      input.accept = accept;
    }
    input.addEventListener("change", () => resolve(
      input.files?.length ? input.files[0] : null));
    input.click();
  });
}

export const getFilesFromUser = (accept?: string): Promise<File[]> => {
	return new Promise(resolve => {
		const input = document.createElement("input");
		input.type = "file";
		input.multiple = true;
		if(accept) {
			input.accept = accept;
		}
		input.addEventListener("change", () => resolve(Array.from(input.files ?? [])));
		input.click();
	});
}