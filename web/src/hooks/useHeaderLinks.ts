import { withoutController } from "@/api";
import { getHeaderLinks } from "@/api/value";
import useSWR from "swr";
import { norefreshSwrConfig } from "../../const";

export function useHeaderLinks() {
	return useSWR('headerLink', withoutController(getHeaderLinks), {
		keepPreviousData: true,
		...norefreshSwrConfig,
	});
}