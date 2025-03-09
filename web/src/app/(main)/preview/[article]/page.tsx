import { getArticle } from "@/api";
import { Article } from "@/components/article";
import { notFound } from "next/navigation";
import { ReloadOnUpdate } from "./reload-on-update";
import { ReloadIfStale } from "./reload-if-stale";

export const dynamic = 'force-static';

export default async function PreviewPage({
	params,
}: {
	params: Promise<{ article: string }>
}) {
	const { article: articleId } = await params;

	const article = await getArticle(parseInt(articleId)).data;
	if(!article) notFound();

	return (
		<>
			<ReloadIfStale article={article}/>
			<ReloadOnUpdate id={article.id}/>
			<Article article={article}/>
		</>
	)
}