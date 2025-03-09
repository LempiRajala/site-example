'use client';

import { getArticle, type IArticle } from "@/api";
import { useEffect } from "react";

export function ReloadIfStale({
	article,
}: {
	article: IArticle
}) {
	useEffect(() => {
		getArticle(article.id).data.then(fresh => {
			if(JSON.stringify(fresh) !== JSON.stringify(article)) {
				location.reload();
			}
		});
	}, []);

	return null;
}