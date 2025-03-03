import { defineConfig } from 'drizzle-kit';
import { getDatabaseUrl } from '@config';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: getDatabaseUrl(),
  },
});