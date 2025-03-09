'use client';

import type { IArticle } from "@/api";
import { type ICommand } from "@uiw/react-md-editor";
import { FaExternalLinkAlt } from "react-icons/fa";

function PreviewButton({ id }: Pick<IArticle, 'id'>) {
	const gotoPreview = () => window.open(`/preview/${id}`);

	return (
		<button onClick={gotoPreview}>
			<FaExternalLinkAlt size={12}/>
		</button>
	)
}

export const makeCodePreviewCommand = (props: Pick<IArticle, 'id'>): ICommand => {
	return {
		name: "preview",
		keyCommand: "preview",
		value: "preview",
		icon: <PreviewButton {...props}/>
	}
}