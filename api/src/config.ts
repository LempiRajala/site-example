import {config} from 'dotenv';
config({ path: '../.env' });

const keys = [
	'BACK_PORT',
	'CORS_ORIGINS',
	'POSTGRES_PASSWORD',
	'POSTGRES_HOST',
	'POSTGRES_PORT',
	'POSTGRES_USER',
	'MINIO_HOST',
	'MINIO_PORT',
	'MINIO_CONSOLE_PORT',
	'MINIO_ROOT_USER',
	'MINIO_ROOT_PASSWORD',
]

const missingKeys = keys.filter(key => !(key in process.env));
if(missingKeys.length) {
	throw new Error(`missing keys in .env file: ${missingKeys.join(', ')}`);
}

export const getPort = () => process.env.BACK_PORT!;

export const getAllowedOrigins = () => process.env.CORS_ORIGINS?.split(',').map(o => o.trim())!;

export const getNodeEnv = () => process.env.NODE_ENV as 'development' | 'production';

export const getDatabaseUrl = () => `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_USER}?schema=public&connect_timeout=5000`;

export const getMinioHost = () => process.env.MINIO_HOST!;

export const getMinioPort = () => process.env.MINIO_PORT!;

export const getMinioRootUser = () => process.env.MINIO_ROOT_USER!;

export const getMinioRootPassword = () => process.env.MINIO_ROOT_PASSWORD!;