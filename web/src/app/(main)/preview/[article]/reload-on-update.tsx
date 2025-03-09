'use client';

import { watchArticle, type IArticle } from "@/api";
import { useEffect } from "react";

export function ReloadOnUpdate({ id }: Pick<IArticle, 'id'>) {
	useEffect(() => {
		const events = watchArticle(id);
		events.addEventListener('message', () => location.reload());
	}, []);
	
	return null;
}