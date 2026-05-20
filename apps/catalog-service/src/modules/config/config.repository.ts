import { PrismaClient, TranslationLocale } from '@prisma/client';

const prisma = new PrismaClient();

export class ConfigRepository {
  static async getActiveFeatures(lang: TranslationLocale) {
    const features = await prisma.feature.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        translations: {
          where: { locale: lang }
        }
      }
    });

    // Flatten translations for easier frontend usage
    return features.map(f => {
      const trans = f.translations[0];
      return {
        id: f.id,
        slug: f.slug,
        imageUrl: f.imageUrl,
        icon: f.icon,
        linkUrl: f.linkUrl,
        order: f.order,
        title: trans?.title || f.slug,
        description: trans?.description || ''
      };
    });
  }

  static async getActiveBanners(lang: TranslationLocale) {
    const banners = await prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        translations: {
          where: { locale: lang }
        }
      }
    });

    return banners.map(b => {
      const trans = b.translations[0];
      return {
        id: b.id,
        imageUrl: b.imageUrl,
        linkUrl: b.linkUrl,
        order: b.order,
        title: trans?.title || '',
        subtitle: trans?.subtitle || '',
        ctaText: trans?.ctaText || 'Explore'
      };
    });
  }
}
