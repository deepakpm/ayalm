import { Request, Response } from 'express';
import * as TempleService from './temples.service';
import { TranslationLocale } from '@repo/db';

export const getMostPopularTemples = async (req: Request, res: Response): Promise<void> => {
  try {
    let lang = req.query['lang'] as TranslationLocale | null
    if (!lang) {
      lang = TranslationLocale.EN
    }
    const temples = await TempleService.getMostPopularTemples(lang)
    res.status(200).json({ success: true, data: temples });
  } catch (error) {
    console.error('Failed to fetch temples', error);
    res.status(500).json({ error: 'Failed to fetch temples' });
  }
};

export const getTempleBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const slug = req.params['slug'];
    if (!slug) {
      res.status(400).json({ success: false, error: 'Slug is required' });
      return;
    }
    
    let lang = req.query['lang'] as TranslationLocale | null;
    if (!lang) {
      lang = TranslationLocale.EN;
    }
    
    const temple = await TempleService.getTempleBySlug(slug, lang);
    if (!temple) {
      res.status(404).json({ success: false, error: 'Temple not found' });
      return;
    }
    res.status(200).json({ success: true, data: temple });
  } catch (error) {
    console.error('Failed to fetch temple by slug', error);
    res.status(500).json({ success: false, error: 'Failed to fetch temple' });
  }
};
