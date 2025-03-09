import { withoutController } from "@/api";
import { getFooterLinks } from "@/api/value";
import useSWR from "swr";
import { norefreshSwrConfig } from "../../const";

export function useFooterLinks() {
	return useSWR('footerLinks', withoutController(getFooterLinks), {
		keepPreviousData: true,
		...norefreshSwrConfig,
	});
}