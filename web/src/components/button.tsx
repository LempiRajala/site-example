import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";

const style = cva([
	'px-2 pb-0.5 pt-1 border-1 border-border rounded-tl-lg rounded-br-lg text-sm',
	'font-geist-mono transition-colors bg-background hover:bg-foreground',
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

export function Button({
	className,
	...props
}: ComponentProps<'button'> & Parameters<typeof style>[0]) {
	return (
		<button {...props} className={style(props)}/>
	)
}