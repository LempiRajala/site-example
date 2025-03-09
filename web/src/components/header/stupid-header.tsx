'use client';

import type { ILink } from "@/api/value";
import type { PropsWithClassName } from "@/types";
import { normalizeLink } from "@/utils";
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation";

function Logo() {
	return (
		<Link href="/" className="font-audiowide text-2xl">
			Tech<span className="text-xl text-text-secondary">&</span>AI
		</Link>
	)
}

export function StupidHeader({
	className,
	links,
}: PropsWithClassName & {
	links: ILink[];
}) {
	const pathname = usePathname();

	return (
		<header className={clsx(className, "p-2 bg-background border-b-border border-1 border-t-0 border-l-0 border-r-0")}>
			<div className="max-w-laptop flex items-center justify-between mx-auto">
				<Logo/>
				<nav className="flex gap-5 font-audiowide text-text-secondary transition-colors mt-1">
					{
						links.map(({ href, text }) => (
							<Link key={text} href={normalizeLink(href)} className={clsx(
								"relative transition-colors hover:text-text",
								pathname === href && 'text-text',
							)}>
								{text}
								<span className={clsx(
									"absolute bottom-0 left-0 w-full h-[2px] rounded-sm bg-primary",
									pathname === href ? 'opacity-100' : 'opacity-0',
								)}/>
							</Link>
						))
					}
				</nav>
			</div>
		</header>
	)
}