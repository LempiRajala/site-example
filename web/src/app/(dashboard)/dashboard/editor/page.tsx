'use client';

import { Button } from "@/components/button";
import { useArticles } from "@/hooks/useArticles";
import { PropsWithClassName } from "@/types";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";

function Row({
	values,
	className,
}: PropsWithClassName & {
	values: string[],
}) {
	return (
		<div className={clsx(className, "grid grid-cols-subgrid col-span-full")}>
			{
				values.map((value, i) => (
					<div key={i}>{value}</div>
				))
			}
		</div>
	)
}

export default function EditorPage() {
	const router = useRouter();
	const params = useSearchParams();
	const limit = 25;
	const page = parseInt(params.get('page') ?? '0');
	
	const { data: articles, mutate } = useArticles({ limit: 25, offset: page * limit });

	const onNew = () => router.push('/dashboard/editor/new');

	return (
		<div className="text-text p-2">
			<div className="border-0 border-b-1 border-border pb-2 mb-2">
				<Button onClick={onNew}>
					New 
				</Button>
			</div>
			<div className="grid grid-cols-3">
				<Row values={['id', 'title', 'last update']}/>
			</div>
		</div>
	)
}