import { drizzle } from 'drizzle-orm/node-postgres';
import { getDatabaseUrl } from '@config';

export * from './schema'

export const db = drizzle(getDatabaseUrl());