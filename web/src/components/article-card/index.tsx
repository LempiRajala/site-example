import type { IArticle } from "@/api";
import './style.css';
import dayjs from "dayjs";

export function ArticleCard({
	title,
	createdAt,
	metaDescription,
}: Pick<IArticle, 'title' | 'createdAt' | 'metaDescription'>) {
	return (
		<div className="article-card">
			<div className="article-card__header">
				<h2>{title}</h2>
			</div>
			<div>{metaDescription}</div>
		</div>
	)
}