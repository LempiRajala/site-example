import { getApiUrl } from "../config"

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