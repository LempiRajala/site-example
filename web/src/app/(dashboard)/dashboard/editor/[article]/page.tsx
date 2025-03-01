import { getArticle, IArticle } from "@/api";
import { ArticleEditor } from "@/components/article-editor";
import { notFound } from "next/navigation";

export default async function EditorPage({
	params,
}: {
	params: Promise<{ article: string }>
}) {
	const { article: articleId } = await params;

	const article = (
		articleId === 'new' ?
		null :
		await getArticle(parseInt(articleId)).article
	);

	if(!article) notFound();

	return <ArticleEditor className="p-2" article={article}/>
}