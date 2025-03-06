import type { SWRConfiguration } from "swr";

export const getManyArticlesLimit = 25;

export const norefreshSwrConfig: SWRConfiguration = {
	revalidateOnFocus: false,    
	revalidateOnReconnect: false,
	refreshWhenOffline: false,
	refreshWhenHidden: false,
	refreshInterval: 0,
}