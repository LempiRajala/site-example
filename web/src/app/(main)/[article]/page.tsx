import { getArticleByUrl } from "@/api";
import { marked } from "marked";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = 'force-static';

type Params = Promise<{ article: string }>

export const generateMetadata = async (
  { params }: { params: Params }
): Promise<Metadata> => {
	const articlePath = (await params).article;
	const article = await getArticleByUrl(articlePath).article;

  return {
    title: article?.title,
		description: article?.metaDescription,
		keywords: article?.metaKeywords,
  }
}

export default async function ArticlePage({
	params,
}: {
	params: Params
}) {
	const articlePath = (await params).article;
	const article = await getArticleByUrl(articlePath).article;
	if(!article) {
		return notFound();
	}

	return (
		<article
			className="article p-2 mx-auto w-full max-w-laptop"
			dangerouslySetInnerHTML={{
				__html: `<h1>${article.title}</h1>${marked(article.content)}`
			}}
		/>
	);
}