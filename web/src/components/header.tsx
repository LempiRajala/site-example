'use client';

import { PropsWithClassName } from "@/types";
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

const links: { text: string, path: string }[] = [{
	path: '/about',
	text: 'About us',
}, {
	path: '/contacts',
	text: 'Contacts',
}];

export function Header({ className }: PropsWithClassName) {
	const pathname = usePathname();

	return (
		<header className={clsx(className, "p-2 bg-background border-b-border border-1 border-t-0 border-l-0 border-r-0")}>
			<div className="max-w-laptop flex items-center justify-between mx-auto">
				<Logo/>
				<nav className="flex gap-5 font-audiowide text-text-secondary transition-colors">
					{
						links.map(({ path, text }) => (
							<Link key={text} href={path} className={clsx(
								"relative hover:text-text",
								pathname === path && 'text-text',
							)}>
								{text}
								<span className={clsx(
									"absolute bottom-0 left-0 w-full h-[2px] rounded-sm bg-primary",
									pathname === path ? 'opacity-100' : 'opacity-0',
								)}/>
							</Link>
						))
					}
				</nav>
			</div>
		</header>
	)
}