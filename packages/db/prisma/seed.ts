import { PrismaClient, DeityRole, OfferingFrequency, TranslationLocale, TimeType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data in correct order due to foreign keys
  await prisma.rating.deleteMany();
  await prisma.offeringTranslation.deleteMany();
  await prisma.offering.deleteMany();
  await prisma.eventTranslation.deleteMany();
  await prisma.event.deleteMany();
  await prisma.deityTranslation.deleteMany();
  await prisma.deity.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.timings.deleteMany();
  await prisma.templeHighlight.deleteMany();
  await prisma.templeTranslation.deleteMany();
  await prisma.temple.deleteMany();
  await prisma.user.deleteMany();

  // Create a sample admin user
  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@alayam.com',
      role: 'ADMIN',
      preferredLanguage: 'en',
    },
  });

  console.log('👤 Admin user created');

  // Create Temples with Nested Multilingual Data
  await prisma.temple.create({
    data: {
      slug: 'meenakshi-amman-temple',
      imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1000',
      rating: 4.9,
      reviewCount: 15420,
      isVerified: true,
      isFeatured: true,
      translations: {
        create: [
          {
            locale: TranslationLocale.EN,
            name: 'Meenakshi Amman Temple',
            description: 'The historic Meenakshi Amman Temple is located on the southern bank of the Vaigai River in the temple city of Madurai, Tamil Nadu, India. It is dedicated to Meenakshi, a form of Parvati, and her consort, Sundareshwar, a form of Shiva.',
            city: 'Madurai',
            state: 'Tamil Nadu',
            address: 'Madurai Main, Madurai, Tamil Nadu 625001',
            history: 'The temple was originally built by Early Pandya King Kulasekara Pandyan, but the current structure was significantly expanded during the Nayak dynasty in the 16th and 17th centuries.',
            landmark: 'Near Madurai Junction',
            nearestAirport: 'Madurai International Airport (IXM) is 12 km away',
            nearestRailwayStation: 'Madurai Junction (MDU) is just 1.5 km away',
            roadDirections: 'The temple is in the heart of Madurai city, easily accessible by local buses, autos, and taxis from all parts of the city.',
          },
          {
            locale: TranslationLocale.TA,
            name: 'மீனாட்சி அம்மன் கோவில்',
            description: 'வரலாற்று சிறப்புமிக்க மீனாட்சி அம்மன் கோவில் இந்தியாவின் தமிழ்நாடு மாநிலத்தில் உள்ள கோவில் நகரமான மதுரையில் வைகை ஆற்றின் தென்கரையில் அமைந்துள்ளது. இது பார்வதியின் வடிவமான மீனாட்சி மற்றும் அவரது கணவரான சிவனின் வடிவமான சுந்தரேஸ்வரருக்கு அர்ப்பணிக்கப்பட்டுள்ளது.',
            city: 'மதுரை',
            state: 'தமிழ்நாடு',
            address: 'மதுரை மெயின், மதுரை, தமிழ்நாடு 625001',
            history: 'இந்தக் கோயில் முதலில் முற்கால பாண்டிய மன்னன் குலசேகர பாண்டியனால் கட்டப்பட்டது, ஆனால் தற்போதைய அமைப்பு 16 மற்றும் 17 ஆம் நூற்றாண்டுகளில் நாயக்க வம்சத்தின் போது கணிசமாக விரிவாக்கப்பட்டது.',
            landmark: 'மதுரை சந்திப்பு அருகில்',
            nearestAirport: 'மதுரை சர்வதேச விமான நிலையம் (IXM) 12 கி.மீ தொலைவில் உள்ளது',
            nearestRailwayStation: 'மதுரை சந்திப்பு (MDU) வெறும் 1.5 கி.மீ தொலைவில் உள்ளது',
            roadDirections: 'இந்தக் கோவில் மதுரை நகரின் மையப்பகுதியில் உள்ளது, நகரின் அனைத்துப் பகுதிகளிலிருந்தும் உள்ளூர் பேருந்துகள், ஆட்டோக்கள் மூலம் எளிதாகச் சென்றடையலாம்.',
          }
        ]
      },
      highlights: {
        create: [
          { locale: TranslationLocale.EN, text: 'Golden Lotus Pond', order: 0 },
          { locale: TranslationLocale.EN, text: 'Thousand Pillar Hall', order: 1 },
          { locale: TranslationLocale.EN, text: 'Hall of Eight Goddesses', order: 2 },
          { locale: TranslationLocale.EN, text: 'Daily Night Ceremony', order: 3 },
          { locale: TranslationLocale.TA, text: 'பொற்றாமரைக்குளம்', order: 0 },
          { locale: TranslationLocale.TA, text: 'ஆயிரங்கால் மண்டபம்', order: 1 },
          { locale: TranslationLocale.TA, text: 'அட்டசக்தி மண்டபம்', order: 2 },
          { locale: TranslationLocale.TA, text: 'தினசரி இரவு பள்ளிவறை பூஜை', order: 3 },
        ]
      },
      timings: {
        create: [
          { timeType: TimeType.MORNING, startTime: '05:00 AM', endTime: '12:30 PM' },
          { timeType: TimeType.EVENING, startTime: '04:00 PM', endTime: '10:00 PM' }
        ]
      },
      deities: {
        create: [
          {
            role: DeityRole.MAIN,
            imageUrl: 'https://images.unsplash.com/photo-1621274191316-0e107f917530?auto=format&fit=crop&q=80&w=400',
            displayOrder: 1,
            translations: {
              create: [
                {
                  locale: TranslationLocale.EN,
                  name: 'Meenakshi Amman',
                  description: 'The presiding goddess of Madurai, an incarnation of Goddess Parvati.',
                  subtitle: 'Main Deity',
                },
                {
                  locale: TranslationLocale.TA,
                  name: 'மீனாட்சி அம்மன்',
                  description: 'மதுரையின் முதன்மை தெய்வம், பார்வதி தேவியின் அவதாரம்.',
                  subtitle: 'மூலவர்',
                }
              ]
            }
          },
          {
            role: DeityRole.CONSORT,
            imageUrl: 'https://images.unsplash.com/photo-1621274191316-0e107f917530?auto=format&fit=crop&q=80&w=400',
            displayOrder: 2,
            translations: {
              create: [
                {
                  locale: TranslationLocale.EN,
                  name: 'Sundareshwarar',
                  description: 'The consort of Meenakshi, an incarnation of Lord Shiva.',
                  subtitle: 'Consort Deity',
                },
                {
                  locale: TranslationLocale.TA,
                  name: 'சுந்தரேஸ்வரர்',
                  description: 'மீனாட்சியின் கணவர், சிவபெருமானின் அவதாரம்.',
                  subtitle: 'உற்சவர்',
                }
              ]
            }
          }
        ]
      },
      offerings: {
        create: [
          {
            price: 150,
            currency: 'INR',
            frequency: OfferingFrequency.DAILY,
            translations: {
              create: [
                {
                  locale: TranslationLocale.EN,
                  name: 'Special Archana',
                  description: 'A personalized prayer performed in the name of the devotee.',
                },
                {
                  locale: TranslationLocale.TA,
                  name: 'சிறப்பு அர்ச்சனை',
                  description: 'பக்தரின் பெயரில் செய்யப்படும் தனிப்பயனாக்கப்பட்ட பிரார்த்தனை.',
                }
              ]
            }
          },
          {
            price: 500,
            currency: 'INR',
            frequency: OfferingFrequency.DAILY,
            translations: {
              create: [
                {
                  locale: TranslationLocale.EN,
                  name: 'Abishekam',
                  description: 'Sacred bathing ceremony of the deity with holy offerings.',
                },
                {
                  locale: TranslationLocale.TA,
                  name: 'அபிஷேகம்',
                  description: 'புனிதப் பொருட்களால் இறைவனுக்குச் செய்யப்படும் திருமஞ்சனம்.',
                }
              ]
            }
          }
        ]
      },
      events: {
        create: [
          {
            startDate: new Date('2026-04-20T00:00:00Z'),
            endDate: new Date('2026-05-01T23:59:59Z'),
            imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=400',
            translations: {
              create: [
                {
                  locale: TranslationLocale.EN,
                  name: 'Chithirai Festival',
                  description: 'The grand celestial wedding of Meenakshi and Sundareshwarar, spanning over 10 days.',
                },
                {
                  locale: TranslationLocale.TA,
                  name: 'சித்திரை திருவிழா',
                  description: 'மீனாட்சி - சுந்தரேஸ்வரர் திருக்கல்யாணத்தை உள்ளடக்கிய 10 நாட்கள் நடைபெறும் பிரம்மாண்டமான விழா.',
                }
              ]
            }
          }
        ]
      },
      gallery: {
        create: [
          {
            imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1000',
            caption: 'Main Tower Entrance',
            order: 0,
          },
          {
            imageUrl: 'https://images.unsplash.com/photo-1621274191316-0e107f917530?auto=format&fit=crop&q=80&w=1000',
            caption: 'Inside Corridor Pillars',
            order: 1,
          }
        ]
      }
    }
  });

  console.log('🕌 Meenakshi Amman Temple seeded successfully');

  await prisma.temple.create({
    data: {
      slug: 'brihadeeswarar-temple',
      imageUrl: 'https://images.unsplash.com/photo-1621274191316-0e107f917530?auto=format&fit=crop&q=80&w=1000',
      rating: 4.8,
      reviewCount: 12100,
      isVerified: true,
      isFeatured: false,
      translations: {
        create: [
          {
            locale: TranslationLocale.EN,
            name: 'Brihadeeswarar Temple',
            description: 'Brihadishvara temple, also called Rajarajeswaram or Peruvudaiyar Koyil, is a Hindu temple dedicated to Shiva located in Thanjavur, Tamil Nadu, India. It is one of the largest South Indian temples and an exemplary example of fully realized Dravidian architecture.',
            city: 'Thanjavur',
            state: 'Tamil Nadu',
            address: 'Membalam RD, Balaji Nagar, Thanjavur, Tamil Nadu 613007',
            history: 'Built by Chola emperor Rajaraja I between 1003 and 1010 AD, the temple is a part of the UNESCO World Heritage Site known as the Great Living Chola Temples.',
            landmark: 'Near Thanjavur Palace',
            nearestAirport: 'Tiruchirappalli International Airport (TRZ) is 58 km away',
            nearestRailwayStation: 'Thanjavur Junction (TJ) is 2 km away',
            roadDirections: 'Thanjavur is well-connected by state highways. You can take a local bus or auto-rickshaw from the Thanjavur Old Bus Stand.',
          },
          {
            locale: TranslationLocale.TA,
            name: 'பெருவுடையார் கோவில்',
            description: 'இராஜராஜேஸ்வரம் அல்லது பெருவுடையார் கோவில் என்றும் அழைக்கப்படும் பிரகதீஸ்வரர் கோவில், இந்தியாவின் தமிழ்நாடு மாநிலத்தில் உள்ள தஞ்சாவூரில் அமைந்துள்ள சிவனுக்கு அர்ப்பணிக்கப்பட்ட ஒரு இந்து கோவிலாகும். இது மிகப்பெரிய தென்னிந்திய கோவில்களில் ஒன்றாகும் மற்றும் முற்றிலும் உணரப்பட்ட திராவிட கட்டிடக்கலைக்கு ஒரு சிறந்த எடுத்துக்காட்டாகும்.',
            city: 'தஞ்சாவூர்',
            state: 'தமிழ்நாடு',
            address: 'மேம்பாலம் சாலை, பாலாஜி நகர், தஞ்சாவூர், தமிழ்நாடு 613007',
            history: 'கி.பி 1003 மற்றும் 1010 க்கு இடையில் சோழப் பேரரசர் இராஜராஜ சோழனால் கட்டப்பட்டது, இக்கோயில் யுனெஸ்கோ உலக பாரம்பரிய தளமான அழியாத சோழர் பெருங்கோயில்களின் ஒரு பகுதியாகும்.',
            landmark: 'தஞ்சாவூர் அரண்மனை அருகில்',
            nearestAirport: 'திருச்சிராப்பள்ளி சர்வதேச விமான நிலையம் (TRZ) 58 கி.மீ தொலைவில் உள்ளது',
            nearestRailwayStation: 'தஞ்சாவூர் சந்திப்பு (TJ) 2 கி.மீ தொலைவில் உள்ளது',
            roadDirections: 'தஞ்சாவூர் மாநில நெடுஞ்சாலைகளால் நன்கு இணைக்கப்பட்டுள்ளது. தஞ்சாவூர் பழைய பேருந்து நிலையத்திலிருந்து உள்ளூர் பேருந்து அல்லது ஆட்டோ மூலம் செல்லலாம்.',
          }
        ]
      },
      highlights: {
        create: [
          { locale: TranslationLocale.EN, text: 'UNESCO World Heritage Site', order: 0 },
          { locale: TranslationLocale.EN, text: 'Monolithic Nandi', order: 1 },
          { locale: TranslationLocale.EN, text: 'Giant Vimana Tower', order: 2 },
          { locale: TranslationLocale.EN, text: 'Ancient Tamil Inscriptions', order: 3 },
          { locale: TranslationLocale.TA, text: 'யுனெஸ்கோ உலக பாரம்பரிய தளம்', order: 0 },
          { locale: TranslationLocale.TA, text: 'ஒற்றைக்கல் நந்தி', order: 1 },
          { locale: TranslationLocale.TA, text: 'பிரம்மாண்ட விமான கோபுரம்', order: 2 },
          { locale: TranslationLocale.TA, text: 'பண்டைய தமிழ் கல்வெட்டுகள்', order: 3 },
        ]
      },
      timings: {
        create: [
          { timeType: TimeType.MORNING, startTime: '06:00 AM', endTime: '12:30 PM' },
          { timeType: TimeType.EVENING, startTime: '04:00 PM', endTime: '09:00 PM' }
        ]
      },
      deities: {
        create: [
          {
            role: DeityRole.MAIN,
            imageUrl: 'https://images.unsplash.com/photo-1621274191316-0e107f917530?auto=format&fit=crop&q=80&w=400',
            displayOrder: 1,
            translations: {
              create: [
                {
                  locale: TranslationLocale.EN,
                  name: 'Lord Brihadeeswarar',
                  description: 'A giant monolithic Shiva Lingam, representing the infinite nature of Lord Shiva.',
                  subtitle: 'Main Lingam',
                },
                {
                  locale: TranslationLocale.TA,
                  name: 'பெருவுடையார்',
                  description: 'சிவபெருமானின் எல்லையற்ற தன்மையைக் குறிக்கும் ஒரு பெரிய ஒற்றைக்கல் சிவலிங்கம்.',
                  subtitle: 'மூலவர்',
                }
              ]
            }
          }
        ]
      },
      offerings: {
        create: [
          {
            price: 1000,
            currency: 'INR',
            frequency: OfferingFrequency.DAILY,
            translations: {
              create: [
                {
                  locale: TranslationLocale.EN,
                  name: 'Anna Dhanam Contribution',
                  description: 'Contribution towards holy food distribution to devotees visiting the temple.',
                },
                {
                  locale: TranslationLocale.TA,
                  name: 'அன்னதான நன்கொடை',
                  description: 'கோயிலுக்கு வரும் பக்தர்களுக்கு வழங்கப்படும் புனித உணவு விநியோகத்திற்கான பங்களிப்பு.',
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log('🕌 Brihadeeswarar Temple seeded successfully');
  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
