'use client';

import MDEditor from "@uiw/react-md-editor";
import { type ChangeEvent, useMemo, useState } from "react";
import { Button } from "./button";
import { createArticle, type IArticle } from "@/api";
import { Input } from "./input";
import { useRouter } from "next/navigation";
import { updateArticle } from "@/actions";
import { toastArticleUpsert, toastInvalidArticleUrl } from "@/toaster";
import clsx from "clsx";
import type { PropsWithClassName } from "@/types";
import { getTitle, normalizeUrlSegment } from "@/utils";

// https://uiwjs.github.io/react-md-editor/
export function ArticleEditor({
	article,
	className,
}: PropsWithClassName & {
	article: IArticle | null,
}) {
	const router = useRouter();
	const [content, setContent] = useState(article?.content ?? "**Lets write something!**");
	const title = useMemo(() => getTitle(content) ?? '', [content]);
	const [url, setUrl] = useState(article?.url ?? '');
	const [metaDescription, setMetaDescription] = useState(article?.metaDescription ?? '');
	const [metaKeywords, setMetaKeywords] = useState(article?.metaKeywords ?? '');

	const onSave = async () => {
		if(url.length === 0) {
			toastInvalidArticleUrl();
			return;
		}

		const fields = {
			content,
			title,
			url,
			metaDescription,
			metaKeywords,
		}

		if(article === null) {
			const { data: articlePromise } = createArticle(fields);

			articlePromise.then(
				article => router.push(`/dashboard/editor/${article.id}`),
				console.error,
			);
		} else {
			const updated = updateArticle(article.id, fields);

			toastArticleUpsert(updated);
		}
	}

	const onChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
		setUrl(normalizeUrlSegment(e.currentTarget.value));
	}

	const onChangeMetaDescription = (e: ChangeEvent<HTMLInputElement>) => {
		setMetaDescription(e.currentTarget.value);
	}

	const onChangeMetaKeywords = (e: ChangeEvent<HTMLInputElement>) => {
		setMetaKeywords(e.currentTarget.value);
	}

	return (
		<div className={clsx(className, "h-full grid grid-rows-[auto_auto_1fr]")}>
			<div className="flex gap-2 p-1 mb-2">
				<Button onClick={onSave}>Сохранить</Button>
			</div>
			<div className="grid grid-cols-[auto_1fr] gap-y-3 gap-x-2 p-1 items-center mb-2">
				<p className="text-lg">Заголовок:</p>
				<Input spellCheck={false} value={title} disabled title="берется из статьи"/>
				<p className="text-lg">Ссылка:</p>
				<Input spellCheck={false} value={url} onChange={onChangeUrl}/>
				<p className="text-lg">Описание:</p>
				<Input spellCheck={false} value={metaDescription} onChange={onChangeMetaDescription}/>
				<p className="text-lg">Ключевые слова:</p>
				<Input spellCheck={false} value={metaKeywords} onChange={onChangeMetaKeywords}/>
			</div>
			<MDEditor
				height="100%"
				overflow={false}
				value={content}
				onChange={v => v && setContent(v)}
			/>
		</div>
	)
}