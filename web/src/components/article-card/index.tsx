import type { IArticle } from "@/api";
import './style.css';

export function ArticleCard({
	title,
	metaDescription,
}: Pick<IArticle, 'title' | 'metaDescription'>) {
	return (
		<div className="article-card">
			<div className="article-card__header">
				<h2>{title}</h2>
			</div>
			<div>{metaDescription}</div>
		</div>
	)
}