'use client';

import { PropsWithClassName } from "@/types";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCircleUser } from "react-icons/fa6";

const links: { text: string, path: string }[] = [{
	text: 'Editor',
	path: '/dashboard/editor',
}, {
	text: 'Profile',
	path: '/dashboard/profile',
}]

function ProfileAvatar({ className }: PropsWithClassName) {
	return (
		<div className={clsx(className, "rounded-full w-full")}>
			<FaCircleUser className="w-full h-full stroke-1 fill-gray-600"/>
			{/* <div className="pt-[100%]"/> */}
		</div>
	)
}

function ProfileInfo() {
	return (
		<div className="flex flex-col items-center gap-2 p-2 border-0 border-b-1 border-border">
			<ProfileAvatar className="max-w-[50%] shadow-lg"/>
			<p>You signed as <span className="font-bold font-geist">Admin</span></p>
		</div>
	)
}

export function DashboardSidebar() {
	const pathname = usePathname();

	return (
		<div className="relative w-full max-w-72">
			<div className="sticky top-0 h-full w-full bg-foreground border-0 border-r-1 border-solid border-r-border">
				<ProfileInfo/>
				<nav className="p-2 flex flex-col gap-2 text-xl">
					{
						links.map(({ path, text }) => (
							<div key={text}>
								<Link href={path} className={clsx(
									"w-fit relative transition-colors hover:text-text",
									pathname.startsWith(path) ? "text-text" : 'text-text-secondary',
								)}>
									{text}
									<span className={clsx(
										"absolute bottom-0 left-0 w-full h-[2px] rounded-sm bg-primary",
										pathname.startsWith(path) ? 'opacity-100' : 'opacity-0',
									)}/>
								</Link>
							</div>
						))
					}
				</nav>
			</div>
		</div>
	)
}