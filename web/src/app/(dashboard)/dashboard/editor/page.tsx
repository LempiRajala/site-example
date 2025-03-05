'use client';

import type { IArticle } from "@/api";
import { Button } from "@/components/button";
import { useArticles } from "@/hooks/useArticles";
import type { PropsWithClassName } from "@/types";
import { isEven } from "@/utils";
import clsx from "clsx";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type PropsWithChildren } from "react";
import { MdNavigateNext } from "react-icons/md";

function Paginator({
	page,
	className,
	nextDisabled,
	prevDisabled,
	onNext,
	onPrev,
}: PropsWithClassName & {
	page: number,
	nextDisabled: boolean,
	prevDisabled: boolean,
	onPrev: () => void,
	onNext: () => void,
}) {
	return (
		<div className={clsx(
			className,
			"grid grid-cols-[auto_1fr_auto] w-fit mx-auto gap-3",
		)}>
			<button onClick={onPrev} disabled={prevDisabled}>
				<MdNavigateNext
					size={22}
					className={clsx("rotate-180", prevDisabled && "opacity-50 cursor-not-allowed")}/>
			</button>
			<div className="text-center font-mono">
				{page}
			</div>
			<button onClick={onNext} disabled={nextDisabled}>
				<MdNavigateNext
					size={22}
					className={clsx(nextDisabled && "opacity-50 cursor-not-allowed")}/>
			</button>
		</div>
	)
}

const RowCell = ({ children, className } : PropsWithChildren & PropsWithClassName) => (
	<div className={clsx(className, "py-0.5 px-1")}>{children}</div>
)

function UpperRow() {
	return (
		<div className={clsx(
			"grid grid-cols-subgrid col-span-full divide-x-1 divide-border",
			"border-1 border-border bg-background",
		)}>
			<RowCell className="w-6">ID</RowCell>
			<RowCell>URL статьи</RowCell>
			<RowCell>Заголовок</RowCell>
			<RowCell>Последнее изменение</RowCell>
			<RowCell>Дата создания</RowCell>
		</div>
	)
}

function Row({
	id,
	url,
	title,
	updatedAt,
	createdAt,
	className,
	variant,
	href,
}: PropsWithClassName & IArticle & {
	variant: 'pale' | 'bright',
	href: string,
}) {
	return (
		<Link href={href} prefetch={false} className={clsx(
			className,
			"grid grid-cols-subgrid col-span-full divide-x-1 divide-border",
			"border-1 border-border",
			variant === 'pale' ? 'bg-foreground' : 'bg-background',
		)}>
			<RowCell className="font-mono">{id}</RowCell>
			<RowCell>{url}</RowCell>
			<RowCell>{title}</RowCell>
			<RowCell className="font-mono">{dayjs(updatedAt).format('DD/MM/YY hh:mm')}</RowCell>
			<RowCell className="font-mono">{dayjs(createdAt).format('DD/MM/YY hh:mm')}</RowCell>
		</Link>
	)
}

export default function EditorPage() {
	const router = useRouter();
	const [page, setPage] = useState(0);
	const limit = 25;
	
	const { data: articles } = useArticles({ limit: 25, offset: page * limit });

	const onNew = () => router.push('/dashboard/editor/new');

	const nextPageDisabled = articles ? articles.length < limit : true;

	const prevPageDisabled = page <= 0;

	const onNextPage = () => {
		if(nextPageDisabled) return;
		setPage(page + 1);
	}

	const onPrevPage = () => {
		if(prevPageDisabled) return;
		setPage(page - 1);
	}

	return (
		<div className="text-text p-2">
			<div className="border-0 border-b-1 border-border pb-2 mb-2">
				<Button onClick={onNew}>
					New 
				</Button>
			</div>
			<Paginator
				className="my-2"
				nextDisabled={nextPageDisabled}
				prevDisabled={prevPageDisabled}
				onNext={onNextPage}
				onPrev={onPrevPage}
				page={page}
			/>
			<div className="grid grid-cols-[auto_auto_auto_auto_auto]">
				<UpperRow/>
				{
					articles?.map((article, i) => (
						<Row
							key={article.id}
							{...article}
							variant={isEven(i) ? 'pale' : 'bright'}
							href={`/dashboard/editor/${article.id}`}
						/>
					))
				}
			</div>
			<Paginator
				className="mt-2"
				nextDisabled={nextPageDisabled}
				prevDisabled={prevPageDisabled}
				onNext={onNextPage}
				onPrev={onPrevPage}
				page={page}
			/>
		</div>
	)
}