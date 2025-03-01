import { getManyArticles, withoutController } from "@/api";
import useSWR from "swr";

export function useArticles(args: Parameters<typeof getManyArticles>[0]) {
	return useSWR(args, withoutController(getManyArticles), {
		keepPreviousData: true,
	});
}