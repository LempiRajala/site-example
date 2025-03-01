import { getApiUrl } from "../config"

export interface IApiResponse <T>{
	controller: AbortController;
	data: Promise<T>;
}

export const fetchApi = (
	path: string,
	options?: RequestInit,
) => {
	const controller = new AbortController();
	const finalOptions: RequestInit = {
		signal: controller.signal,
		...options,
	}

	const res = fetch(getApiUrl() + path, finalOptions);

	return { res, controller }
}

export const jsonHeader = { 'Content-Type': 'application/json' }

export function withoutController<A extends any[], R>(
	func: (...args: A) => IApiResponse<R>,
) {
	return (...args: A) => func(...args).data;
}