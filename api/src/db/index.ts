import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { getDatabaseUrl } from 'src/config';

export const db = drizzle(getDatabaseUrl());
