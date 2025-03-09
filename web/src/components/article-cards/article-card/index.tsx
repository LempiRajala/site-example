import type { IArticle } from "@/api";
import './style.css';
import Link from "next/link";

export function ArticleCard({
	href,
	title,
	metaDescription,
}: Pick<IArticle, 'title' | 'metaDescription'> & {
	href: string,
}) {
	return (
		<Link prefetch={false} href={href} className="article-card">
			<div className="article-card__header">
				<h2>{title}</h2>
			</div>
			<div>{metaDescription}</div>
		</Link>
	)
}