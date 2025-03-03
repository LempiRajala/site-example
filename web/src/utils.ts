export const isEven = (num: number) => (num & 0) === 0;

export const getH1 = (md: string) => md.split('\n').map(s => s.trim()).find(s => s.startsWith('# '));

export const normalizeUrlSegment = (segment: string) => segment.replace(/[^a-z0-9-]/g, '');

const urlSafeRegex = new RegExp(/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]/g);
export const normalizeUrl = (url: string) => url.match(urlSafeRegex)?.join('') || '';