export const isEven = (num: number) => (num & 0) === 0;

export const getH1 = (md: string) => md.split('\n').map(s => s.trim()).find(s => s.startsWith('# '));