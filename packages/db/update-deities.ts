import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function main() {
  await db.deityTranslation.updateMany({
    where: { name: 'Sundareshwarar' },
    data: { name: 'Sundareshwarar (Shiva)' }
  });
  await db.deityTranslation.updateMany({
    where: { name: 'Lord Brihadeeswarar' },
    data: { name: 'Lord Brihadeeswarar (Shiva)' }
  });
}
main().catch(console.error).finally(() => db.$disconnect());
