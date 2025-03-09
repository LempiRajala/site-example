import { Body } from "@/components/body";
import { Header } from "@/components/header";
import type { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
	return (
		<>
			<Body className="grid grid-rows-[auto_1fr_auto]">
				<Header/>
        {children}
      </Body>
		</>
	)
}