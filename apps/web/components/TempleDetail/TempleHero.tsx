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

interface TempleHeroProps {
  temple: any;
}

const TempleHero: React.FC<TempleHeroProps> = ({ temple }) => {
  const { t } = useLanguage();
  const gallery = (temple.gallery && temple.gallery.length > 0)
    ? temple.gallery.map((item: any) => item.imageUrl)
    : [temple.imageUrl, ...MOCK_IMAGES.slice(1)];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex(prev => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex(prev => Math.min(prev + 1, Math.max(0, gallery.length - 4)));
  };

  return (
    <div className={styles.heroContainer}>

      {/* Left Image Gallery */}
      <div className={styles.galleryCol}>
        <div className={styles.mainImageWrapper}>
          <Image
            src={gallery[activeImageIdx] || ''}
            alt={temple.name}
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
            {gallery.slice(startIndex, startIndex + 4).map((img: any, idx: number) => {
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
            disabled={startIndex >= gallery.length - 4}
            style={{ opacity: startIndex >= gallery.length - 4 ? 0.5 : 1, cursor: startIndex >= gallery.length - 4 ? 'not-allowed' : 'pointer' }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Right Info Details */}
      <div className={styles.infoCol}>
        <div className={styles.badgeWrapper}>
          <Badge variant="secondary" icon={<span style={{ fontSize: '10px' }}>⛩️</span>}>
            {temple.isVerified ? 'Verified Temple' : 'Ancient Temple'}
          </Badge>
        </div>

        <h1 className={styles.title}>{temple.name}</h1>

        <div className={styles.metaRow}>
          <span className={styles.location}>
            <MapPin size={16} /> {temple.city}, {temple.state}
          </span>
          <span className={styles.divider}>|</span>
          <span className={styles.rating}>
            <Star size={16} fill="#C08A3E" color="#C08A3E" /> {temple.rating} ({temple.reviewCount > 1000 ? `${(temple.reviewCount / 1000).toFixed(1)}K+` : temple.reviewCount} Ratings)
          </span>
        </div>

        <p className={styles.description}>
          {temple.description}
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
          <Link href={`/offerings?temple=${temple.id}`} style={{ flex: 1, textDecoration: 'none', display: 'flex' }}>
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
