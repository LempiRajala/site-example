import { useEffect, type ComponentProps, type DependencyList } from "react";

export const useScroll = (
	handler: (e: Event) => void,
	deps: DependencyList = [],
) => {
	useEffect(() => {
		window.addEventListener('scroll', handler);
		return () => window.removeEventListener('scroll', handler);
	}, [handler, ...deps]);
}