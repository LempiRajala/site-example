import { getFooterLinks } from "@/api/value";
import type { PropsWithClassName } from "@/types";
import clsx from "clsx";
import Link from "next/link";

export async function Footer({
	className,
}: PropsWithClassName) {
	const links = await getFooterLinks().data;

	return (
		<footer className={clsx(
			"bg-background border-0 border-t-1 border-solid border-border py-1 px-2",
			className,
		)}>
			<div className={clsx(
				"font-geist text-text-secondary max-w-laptop mx-auto",
				links.length ?
					"flex justify-between items-center" :
					"flex justify-center items-center",
			)}>
				<p className="font-audiowide">© Tech&AI, {new Date().getFullYear()}</p>
				{
					links.map(({ href, text }, i) => (
						<Link
							key={i}
							className="transition-colors hover:text-text"
							href={href} 
							prefetch={false}
						>
							{text}
						</Link>
					))
				}
			</div>
		</footer>
	)
}