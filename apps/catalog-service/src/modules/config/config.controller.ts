import { Request, Response } from 'express';
import { ConfigService } from './config.service';
import { TranslationLocale } from '@prisma/client';

export const getHomeConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    let lang = req.query['lang'] as TranslationLocale | null;
    if (!lang || !Object.values(TranslationLocale).includes(lang)) {
      lang = TranslationLocale.EN;
    }
    
    const config = await ConfigService.getHomeConfig(lang);
    res.status(200).json({ success: true, data: config });
  } catch (error) {
    console.error('Failed to fetch home config', error);
    res.status(500).json({ success: false, error: 'Failed to fetch home configuration' });
  }
};
