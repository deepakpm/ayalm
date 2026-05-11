"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star, Share, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@repo/ui/button';
import { Badge } from '@repo/ui/badge';
import styles from './TempleHero.module.css';
import { useLanguage } from '../../context/LanguageContext';

const MOCK_IMAGES = [
  '/images/temple_meenakshi.png',
  '/images/temple_meenakshi.png',
  '/images/temple_arunachaleswarar.png',
  '/images/temple_ranganathaswamy.png',
  '/images/temple_brihadeeswarar.png',
];

const TempleHero = () => {
  const { t } = useLanguage();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex(prev => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex(prev => Math.min(prev + 1, Math.max(0, MOCK_IMAGES.length - 4)));
  };

  return (
    <div className={styles.heroContainer}>

      {/* Left Image Gallery */}
      <div className={styles.galleryCol}>
        <div className={styles.mainImageWrapper}>
          <Image
            src={MOCK_IMAGES[activeImageIdx] || ''}
            alt="Temple Main Image"
            fill
            style={{ objectFit: 'cover' }}
            className={styles.mainImage}
          />
        </div>
        <div className={styles.thumbnailStrip}>
          <button
            className={styles.navBtn}
            onClick={handlePrev}
            disabled={startIndex === 0}
            style={{ opacity: startIndex === 0 ? 0.5 : 1, cursor: startIndex === 0 ? 'not-allowed' : 'pointer' }}
          >
            <ChevronLeft size={16} />
          </button>
          <div className={styles.thumbnails}>
            {MOCK_IMAGES.slice(startIndex, startIndex + 4).map((img, idx) => {
              const actualIdx = startIndex + idx;
              return (
                <div
                  key={actualIdx}
                  className={`${styles.thumbnailWrapper} ${activeImageIdx === actualIdx ? styles.activeThumb : ''}`}
                  onClick={() => setActiveImageIdx(actualIdx)}
                >
                  <Image src={img} alt="Thumbnail" fill style={{ objectFit: 'cover' }} />
                </div>
              );
            })}
          </div>
          <button
            className={styles.navBtn}
            onClick={handleNext}
            disabled={startIndex >= MOCK_IMAGES.length - 4}
            style={{ opacity: startIndex >= MOCK_IMAGES.length - 4 ? 0.5 : 1, cursor: startIndex >= MOCK_IMAGES.length - 4 ? 'not-allowed' : 'pointer' }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Right Info Details */}
      <div className={styles.infoCol}>
        <div className={styles.badgeWrapper}>
          <Badge variant="secondary" icon={<span style={{ fontSize: '10px' }}>⛩️</span>}>
            Ancient Temple
          </Badge>
        </div>

        <h1 className={styles.title}>Arulmigu Meenakshi<br />Amman Temple</h1>

        <div className={styles.metaRow}>
          <span className={styles.location}>
            <MapPin size={16} /> Madurai, Tamil Nadu
          </span>
          <span className={styles.divider}>|</span>
          <span className={styles.rating}>
            <Star size={16} fill="#C08A3E" color="#C08A3E" /> 4.9 (2.5K+ Ratings)
          </span>
        </div>

        <p className={styles.description}>
          One of the most sacred temples dedicated to Goddess Meenakshi and Lord Sundareswarar, a symbol of divine grace and prosperity.
        </p>

        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>⛩️</span>
            <div>
              <div className={styles.statValue}>1000+</div>
              <div className={styles.statLabel}>Years Old</div>
            </div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>🙏</span>
            <div>
              <div className={styles.statValue}>25K+</div>
              <div className={styles.statLabel}>Devotees Daily</div>
            </div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>🪔</span>
            <div>
              <div className={styles.statValue}>{t.templeDetail.hero.daily}</div>
              <div className={styles.statLabel}>{t.templeDetail.hero.poojas}</div>
            </div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>🛡️</span>
            <div>
              <div className={styles.statValue}>{t.templeDetail.hero.verified}</div>
              <div className={styles.statLabel}>{t.templeDetail.hero.priests}</div>
            </div>
          </div>
        </div>

        <div className={styles.actionRow}>
          <Link href="/offerings" style={{ flex: 1, textDecoration: 'none', display: 'flex' }}>
            <Button variant="primary" className={styles.offerBtn} leftIcon={<span style={{ fontSize: '16px' }}>🙏</span>}>
              {t.templeDetail.hero.offerNow}
            </Button>
          </Link>
          <Button variant="secondary" className={styles.shareBtn} leftIcon={<Share size={16} />}>
            {t.templeDetail.hero.share}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TempleHero;
