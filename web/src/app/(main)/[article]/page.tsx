import { getArticleByUrl } from "@/api";
import { Article } from "@/components/article";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = 'force-static';

type Params = Promise<{ article: string }>

export const generateMetadata = async (
  { params }: { params: Params }
): Promise<Metadata> => {
	const articlePath = (await params).article;
	const article = await getArticleByUrl(articlePath).data;

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
	const article = await getArticleByUrl(articlePath).data;
	if(!article) {
		return notFound();
	}

	return (
		<>
			<main>
				<Article article={article}/>
			</main>
			<Footer/>
		</>
	);
}