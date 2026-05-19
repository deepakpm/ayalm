import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function main() {
  const temples = await db.temple.findMany({ include: { translations: true, deities: { include: { translations: true } } } });
  
  for (const temple of temples) {
    const name = temple.translations[0]?.name || '';
    const deities = temple.deities.map(d => d.translations[0]?.name).join(', ');
    console.log(`${name} deities: ${deities}`);
  }
}
main().catch(console.error).finally(() => db.$disconnect());
