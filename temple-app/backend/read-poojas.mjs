import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const poojas = await prisma.pooja.findMany({ orderBy: { id: 'asc' } });
  console.log(JSON.stringify(poojas, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
