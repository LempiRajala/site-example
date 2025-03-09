import type { IArticle } from "@/api";
import type { PropsWithClassName } from "@/types";
import clsx from "clsx";
import { marked } from "marked";

export function Article({
	article,
	className,
}: PropsWithClassName & {
	article: IArticle
}) {
	return (
		<article
			className={clsx("article p-2 mx-auto w-full max-w-laptop", className)}
			dangerouslySetInnerHTML={{
				__html: marked(article.content),
			}}
		/>
	)
}