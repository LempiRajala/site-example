import { getManyArticles, withoutController, type IArticle } from "@/api";
import { useRef, useState } from "react"
import { getManyArticlesLimit } from "../../const";

export const useArticlesFeed = ({
	initial,
}: {
	initial: IArticle[],
} = {
	initial: [],
}) => {
	const [articles, setArticles] = useState<IArticle[]>(initial);
	const loading = useRef(false);
	const hasMore = useRef(true);
	
	const loadMore = async () => {
		if(loading.current || !hasMore.current) return;
		loading.current = true;
		
		try {
			const newArticles = await withoutController(getManyArticles)({
				offset: articles.length,
				limit: getManyArticlesLimit,
			});
			
			if(newArticles.length < getManyArticlesLimit) {
				hasMore.current = false;
			}

			setArticles(articles.concat(newArticles));
		} catch(e) {
			console.error(e);
		} finally {
			loading.current = false;
		}
	}

	return { loadMore, articles }
}