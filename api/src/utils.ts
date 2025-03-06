export const getH1 = (md: string) => md.split('\n').map(s => s.trim()).find(s => s.startsWith('# '));

export const getTitle = (md: string) => {
	const h1 = getH1(md);
	if(!h1) return undefined;
	return h1.slice(1).trimStart();
}