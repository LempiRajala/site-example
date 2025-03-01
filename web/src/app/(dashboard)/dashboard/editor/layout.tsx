import { getSiteTitle } from "@/config";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: getSiteTitle() + ' - Статьи',
}

export default function DashboardArticlesLayout({
	children,
}: PropsWithChildren) {
	return children;
}