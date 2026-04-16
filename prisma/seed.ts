import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString =
  process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/redblueai';

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seed: starting clean — no seed data inserted.');
  // Add seed data here when needed.
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
