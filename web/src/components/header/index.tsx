import { ComponentProps } from "react";
import { StupidHeader } from "./stupid-header";
import { withoutController } from "@/api";
import { getHeaderLinks } from "@/api/value";

export async function Header(
	props: Omit<ComponentProps<typeof StupidHeader>, 'links'>,
) {
	const links = await withoutController(getHeaderLinks)();
	return <StupidHeader links={links} {...props}/>
}