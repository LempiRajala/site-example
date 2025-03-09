'use client';

import type { IArticle } from "@/api";
import { useArticlesFeed } from "@/hooks/useArticlesFeed";
import { useScroll } from "@/hooks/useScroll";
import type { PropsWithClassName } from "@/types";
import { ArticleCard } from "./article-card";

export function ArticleCards({
	initial,
	className,
}: PropsWithClassName & {
	initial: IArticle[],
}) {
	const { articles, loadMore } = useArticlesFeed({ initial });

	useScroll(() => {
		const scrollTrigger = 500;
		const htmlElement = document.body.parentElement!;
		const scrollBottom = htmlElement.scrollTop + htmlElement.clientHeight;
		if(htmlElement.scrollHeight - scrollBottom < scrollTrigger) {
			loadMore();
		}
	});

	return (
		<div className={className}>
			{
				articles.map(article => (
					<ArticleCard key={article.id} {...article} href={`/${article.url}`}/>
				))
			}
		</div>
	)
}