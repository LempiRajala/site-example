import { fetchApi, jsonHeader } from "./shared";

export enum VALUES {
	HEADER_LINKS = 'HEADER_LINKS',
	MOBILE_MENU_LINKS = 'MOBILE_MENU_LINKS',
	FOOTER_LINKS = 'FOOTER_LINKS',
}

export interface ILink {
	text: string;
	href: string;
}

export interface IValuesMap {
	[VALUES.HEADER_LINKS]: ILink[];
	[VALUES.MOBILE_MENU_LINKS]: ILink[];
	[VALUES.FOOTER_LINKS]: ILink[];
}

export const getValue = <T extends VALUES>(
	key: T
) => {
	const { res, controller } = fetchApi(`/values/${key}`);
	return {
		controller,
		data: res.then(async res => {
			if(!res.ok) {
				throw new Error(`${res.status}: ${await res.text()}`);
			}

			return res.json() as Promise<IValuesMap[T]>;
		}),
	}
}

export const setValue = <T extends VALUES>(
	key: T,
	value: IValuesMap[T],
) => {
	const { controller, res } = fetchApi(`/values/${key}`, {
		method: 'POST',
		headers: jsonHeader,
		body: JSON.stringify(value),
	});

	return {
		controller,
		data: res.then(async res => {
			if(!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
			return res.json() as Promise<IValuesMap[T]>;
		})
	}
}

export const getHeaderLinks = () => getValue(VALUES.HEADER_LINKS);

export const getMobileMenuLinks = () => getValue(VALUES.MOBILE_MENU_LINKS);

export const getFooterLinks = () => getValue(VALUES.FOOTER_LINKS);