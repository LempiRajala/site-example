import { SWRConfiguration } from "swr";

export const norefreshSwrConfig: SWRConfiguration = {
	revalidateOnFocus: false,    
	revalidateOnReconnect: false,
	refreshWhenOffline: false,
	refreshWhenHidden: false,
	refreshInterval: 0,
}