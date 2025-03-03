import { withoutController } from "@/api";
import { getMobileMenuLinks } from "@/api/value";
import useSWR from "swr";
import { norefreshSwrConfig } from "../../const";

export function useMobileMenuLinks() {
	return useSWR('mobileMenuLinks', withoutController(getMobileMenuLinks), {
		keepPreviousData: true,
		...norefreshSwrConfig,
	});
}