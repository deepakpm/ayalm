import { TranslationLocale } from '@prisma/client';
import { ConfigRepository } from './config.repository';

export class ConfigService {
  static async getHomeConfig(lang: TranslationLocale) {
    const [features, banners] = await Promise.all([
      ConfigRepository.getActiveFeatures(lang),
      ConfigRepository.getActiveBanners(lang)
    ]);
    
    return {
      features,
      banners
    };
  }
}
