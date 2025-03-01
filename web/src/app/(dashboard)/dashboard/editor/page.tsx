'use client';

import { Button } from "@/components/button";
import { useArticles } from "@/hooks/useArticles";
import { PropsWithClassName } from "@/types";
import { isEven } from "@/utils";
import clsx from "clsx";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren } from "react";

const RowCell = ({ children, className } : PropsWithChildren & PropsWithClassName) => (
	<div className={clsx(className, "py-0.5 px-1")}>{children}</div>
)

function UpperRow() {
	return (
		<div className={clsx(
			"grid grid-cols-subgrid col-span-full divide-x-1 divide-border",
			"border-1 border-border bg-background",
		)}>
			<RowCell>ID</RowCell>
			<RowCell>Заголовок</RowCell>
			<RowCell>Последнее изменение</RowCell>
			<RowCell>Дата создания</RowCell>
		</div>
	)
}

function Row({
	id,
	title,
	updatedAt,
	createdAt,
	className,
	variant,
	href,
}: PropsWithClassName & {
	id: number;
	title: string;
	updatedAt: string;
	createdAt: string;
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
			<RowCell>{title}</RowCell>
			<RowCell className="font-mono">{dayjs(updatedAt).format('DD/MM/YY hh:mm')}</RowCell>
			<RowCell className="font-mono">{dayjs(createdAt).format('DD/MM/YY hh:mm')}</RowCell>
		</Link>
	)
}

export default function EditorPage() {
	const router = useRouter();
	const params = useSearchParams();
	const limit = 25;
	const page = parseInt(params.get('page') ?? '0');
	
	const { data: articles } = useArticles({ limit: 25, offset: page * limit });

	const onNew = () => router.push('/dashboard/editor/new');

	return (
		<div className="text-text p-2">
			<div className="border-0 border-b-1 border-border pb-2 mb-2">
				<Button onClick={onNew}>
					New 
				</Button>
			</div>
			<div className="grid grid-cols-4">
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
		</div>
	)
}