import { Header } from "@/components/header";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
	return (
		<main>
			<Header/>
			{ children }
		</main>
	)
}