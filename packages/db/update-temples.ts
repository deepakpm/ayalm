import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function main() {
  const temples = await db.temple.findMany({ include: { translations: true } });
  
  for (const temple of temples) {
    const name = temple.translations[0]?.name || '';
    let type = 'POPULAR';
    
    if (name.includes('Ancient') || name.includes('Brihadeeswarar')) type = 'ANCIENT';
    else if (name.includes('Parihara')) type = 'PARIHARA';
    else if (name.includes('Arunachaleswarar')) type = 'STHALA_PURANA';
    
    await db.temple.update({
      where: { id: temple.id },
      data: { type: type as any }
    });
    console.log(`Updated ${name} to ${type}`);
  }
}
main().catch(console.error).finally(() => db.$disconnect());
