export const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL!;

export const getSiteTitle = () => process.env.NEXT_PUBLIC_SITE_TITLE!;

export const getNodeEnv = () => process.env.NODE_ENV as 'development' | 'production';