import { cva } from "class-variance-authority";
import clsx from "clsx";
import type { ComponentProps } from "react";

const style = cva([
	'px-2 pt-2 pb-0.5 border-1 border-border rounded-tl-lg rounded-br-lg outline-none text-sm',
	'font-geist-mono transition-colors bg-transparent hover:bg-background focus:bg-background text-text-secondary',
	'placeholder-text-secondary'
], {
	variants: {
		intent: {
			primary: '',
			secondary: '',
		}
	},
	defaultVariants: {
		intent: 'primary',
	}
});

export function Input({
	className,
	...props
}: ComponentProps<'input'> & Parameters<typeof style>[0]) {
	return (
		<input {...props} className={clsx(style(props), className)}/>
	)
}