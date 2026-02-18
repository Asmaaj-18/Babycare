import  { defineConfig } from '@prisma/client';

export default defineConfig({
  datasourceUrl: 'file:./dev.db',
  // Or if using PostgreSQL later:
  // datasourceUrl: process.env.DATABASE_URL,
});
