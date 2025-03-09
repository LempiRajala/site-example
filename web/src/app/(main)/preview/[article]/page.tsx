import { getArticle } from "@/api";
import { Article } from "@/components/article";
import { notFound } from "next/navigation";

export default async function EditorPage({
	params,
}: {
	params: Promise<{ article: string }>
}) {
	const { article: articleId } = await params;

	const article = await getArticle(parseInt(articleId)).data;
	if(!article) notFound();

	return <Article article={article}/>
}