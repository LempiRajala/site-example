import { getSiteTitle } from "@/config";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: getSiteTitle() + ' - Статьи',
}

export default function DashboardArticlesLayout({
	children,
}: PropsWithChildren) {
	return children;
}