import type { PropsWithClassName } from "@/types";
import type { PropsWithChildren } from "react";
import clsx from "clsx";

export function Body({
	className,
	children,
}: PropsWithClassName & PropsWithChildren) {
	return (
		<body className={clsx("bg-ablack text-text font-geist", className)}>
			{children}
		</body>
	)
}