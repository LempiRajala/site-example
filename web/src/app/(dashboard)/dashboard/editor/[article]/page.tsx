import { getArticle } from "@/api";
import { ArticleEditor } from "@/components/article-editor";
import { notFound } from "next/navigation";

export default async function EditorPage({
	params,
}: {
	params: Promise<{ article: string }>
}) {
	const { article: articleId } = await params;

	const article = await getArticle(parseInt(articleId)).data;
	if(!article) notFound();

	return <ArticleEditor className="p-2" article={article}/>
}