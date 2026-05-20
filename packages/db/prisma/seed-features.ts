import { PrismaClient, TranslationLocale } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Features and Banners...');

  // --- Features ---
  const features = [
    {
      slug: 'temples',
      isActive: true,
      imageUrl: '/images/temples_cat.png', // we can use placeholder or generated images later
      icon: 'Home', 
      linkUrl: '/temples',
      order: 1,
      translations: {
        en: { title: 'Temples', description: 'Connect with holy temples and pilgrimages across Tamilnadu.' },
        ta: { title: 'கோயில்கள்', description: 'தமிழ்நாடு முழுவதிலும் உள்ள புனிதமான கோயில்களைத் தேடுங்கள்.' }
      }
    },
    {
      slug: 'offerings',
      isActive: false, // User mentioned offer feature is not implemented
      imageUrl: '/images/offerings_cat.png',
      icon: 'Heart',
      linkUrl: '/offerings',
      order: 2,
      translations: {
        en: { title: 'Offerings', description: 'Offer poojas, archana, abishekam and more to your favourite deity.' },
        ta: { title: 'காணிக்கைகள்', description: 'உங்களுக்கு பிடித்த தெய்வத்திற்கு பூஜைகள் மற்றும் காணிக்கைகளை செலுத்துங்கள்.' }
      }
    },
    {
      slug: 'astrology',
      isActive: false,
      imageUrl: '/images/astrology_cat.png',
      icon: 'Star',
      linkUrl: '/astrology',
      order: 3,
      translations: {
        en: { title: 'Astrology', description: 'Get horoscope reports and consult experienced astrologers.' },
        ta: { title: 'ஜோதிடம்', description: 'ஜோதிட அறிக்கைகளைப் பெற்று அனுபவம் வாய்ந்த ஜோதிடர்களுடன் ஆலோசிக்கவும்.' }
      }
    },
    {
      slug: 'iyer-connect',
      isActive: false,
      imageUrl: '/images/iyer_cat.png',
      icon: 'Users',
      linkUrl: '/iyer-connect',
      order: 4,
      translations: {
        en: { title: 'Iyer Connect', description: 'Connect with verified priests for your poojas and rituals.' },
        ta: { title: 'ஐயர் இணைப்பு', description: 'உங்கள் பூஜைகள் மற்றும் சடங்குகளுக்கு சரிபார்க்கப்பட்ட அர்ச்சகர்களுடன் இணையுங்கள்.' }
      }
    }
  ];

  for (const f of features) {
    const existing = await prisma.feature.findUnique({ where: { slug: f.slug } });
    if (!existing) {
      await prisma.feature.create({
        data: {
          slug: f.slug,
          isActive: f.isActive,
          imageUrl: f.imageUrl,
          icon: f.icon,
          linkUrl: f.linkUrl,
          order: f.order,
          translations: {
            create: [
              { locale: TranslationLocale.EN, title: f.translations.en.title, description: f.translations.en.description },
              { locale: TranslationLocale.TA, title: f.translations.ta.title, description: f.translations.ta.description }
            ]
          }
        }
      });
      console.log(`Created feature: ${f.slug}`);
    } else {
      // Update existing to ensure flags are correct
      await prisma.feature.update({
        where: { slug: f.slug },
        data: { isActive: f.isActive, order: f.order }
      });
      console.log(`Updated feature: ${f.slug}`);
    }
  }

  // --- Banners ---
  // Let's clear existing banners first to avoid duplicates during dev seeding
  await prisma.banner.deleteMany({});
  
  await prisma.banner.create({
    data: {
      imageUrl: '/images/hero-banner-1.jpg',
      linkUrl: '/temples',
      isActive: true,
      order: 1,
      translations: {
        create: [
          {
            locale: TranslationLocale.EN,
            title: 'Offer your prayers.\nReceive divine blessings.',
            subtitle: 'Now offer your prayers and sacred offering to your beloved deities at renowned temples across Tamilnadu—from your home. Seek divine blessing on Alayam.',
            ctaText: 'Offer Now'
          },
          {
            locale: TranslationLocale.TA,
            title: 'உங்கள் வேண்டுதல்களை செலுத்துங்கள்.\nதெய்வீக ஆசிகளைப் பெறுங்கள்.',
            subtitle: 'தமிழ்நாட்டின் புகழ்பெற்ற கோயில்களில் உங்கள் வீட்டில் இருந்தபடியே உங்கள் விருப்ப தெய்வங்களுக்கு காணிக்கைகளை செலுத்துங்கள்.',
            ctaText: 'இப்போது செலுத்துங்கள்'
          }
        ]
      }
    }
  });
  console.log('Created Banner 1');

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
