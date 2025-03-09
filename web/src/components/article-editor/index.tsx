'use client';

import MDEditor, { commands } from "@uiw/react-md-editor";
import { type ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../button";
import { type IArticle } from "@/api";
import { Input } from "../input";
import { updateArticle } from "@/actions";
import { toastArticleUpsert, toastInvalidArticleUrl } from "@/toaster";
import clsx from "clsx";
import type { PropsWithClassName } from "@/types";
import { getTitle, normalizeUrlSegment } from "@/utils";
import { imageCommand } from "./commands/image";
import { makeCodePreviewCommand } from "./commands/codePreview";

// https://uiwjs.github.io/react-md-editor/
export function ArticleEditor({
	article,
	className,
}: PropsWithClassName & {
	article: IArticle,
}) {
	const [content, setContent] = useState(article.content);
	const title = useMemo(() => getTitle(content), [content]);
	const [url, setUrl] = useState(article.url);
	const [metaDescription, setMetaDescription] = useState(article.metaDescription);
	const [metaKeywords, setMetaKeywords] = useState(article.metaKeywords);
	const codePreviewCommand = useMemo(() => makeCodePreviewCommand(article), [article]);
	
	// TODO отрефакторить бы
	const localArticleData = useRef<Pick<IArticle, 'content' | 'title' | 'url' | 'metaDescription' | 'metaKeywords'>>({
		content,
		title: title ?? '',
		url,
		metaDescription,
		metaKeywords,
	});
	useEffect(() => void (localArticleData.current.content = content), [content]);
	useEffect(() => void (localArticleData.current.title = title ?? ''), [title]);
	useEffect(() => void (localArticleData.current.url = url), [url]);
	useEffect(() => void (localArticleData.current.metaDescription = metaDescription), [metaDescription]);
	useEffect(() => void (localArticleData.current.metaKeywords = metaKeywords), [metaKeywords]);

	const onSave = useCallback(() => {
		if(url.length === 0) {
			toastInvalidArticleUrl();
			return;
		}

		const updated = updateArticle(article.id, localArticleData.current);
		toastArticleUpsert(updated);
	}, [article]);

	useEffect(() => {
		const onkeydown = (e: KeyboardEvent) => {
			if(e.ctrlKey && e.code === 'KeyS') {
				e.preventDefault();
				onSave();
			}
		}

		document.addEventListener('keydown', onkeydown);
		
		return () => document.removeEventListener('keydown', onkeydown);
	}, [onSave]);

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
				<Input className="cursor-not-allowed" spellCheck={false} value={title} disabled title="берется из статьи"/>
				<p className="text-lg">Ссылка:</p>
				<Input spellCheck={false} value={url} onChange={onChangeUrl}/>
				<p className="text-lg">Описание:</p>
				<Input spellCheck={false} value={metaDescription} onChange={onChangeMetaDescription}/>
				<p className="text-lg">Ключевые слова:</p>
				<Input spellCheck={false} value={metaKeywords} onChange={onChangeMetaKeywords}/>
			</div>
			<MDEditor
				autoFocus
				preview="edit"
				height="100%"
				overflow={false}
				value={content}
				onChange={v => v && setContent(v)}
				commands={[
					commands.bold,
					commands.italic,
					commands.strikethrough,
					commands.title,
					commands.divider,
					commands.link,
					commands.quote,
					commands.code,
					commands.codeBlock,
					commands.comment,
					imageCommand,
					commands.divider,
					commands.unorderedListCommand,
					commands.orderedListCommand,
					commands.checkedListCommand,
					commands.divider,
					commands.help,
				]}
				extraCommands={[
					codePreviewCommand,
					commands.divider,
					commands.fullscreen,
				]}
			/>
		</div>
	)
}
