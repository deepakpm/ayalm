import React from 'react';
import Image from 'next/image';
import { MapPin, Star, Users, ArrowRight } from 'lucide-react';
import { Card } from './card';
import { Badge } from './badge';
import styles from './temple-card.module.css';
import Link from 'next/link';

export interface TempleCardProps {
  title: string;
  location: string;
  imageSrc: string;
  rating?: number;
  reviewsCount?: string;
  badgeText?: string;
  slug: string;
  offeringsCount?: string;
  stats?: {
    label: string;
    icon: React.ReactNode;
    value: string;
  }[];
}

export const TempleCard: React.FC<TempleCardProps> = ({
  title,
  location,
  imageSrc,
  rating,
  reviewsCount,
  badgeText,
  offeringsCount,
  slug,
  stats = [],
}) => {
  return (
    <Link href={`/temples/${slug}`} style={{ textDecoration: 'none', display: 'block', width: "30%", height: '100%' }}>
      <Card hoverable className={styles.templeCard}>
        <div className={styles.imageContainer}>
          <Image src={imageSrc} alt={title} fill style={{ objectFit: 'cover' }} />
          {badgeText && (
            <div className={styles.imageBadge}>
              <Star size={12} fill="currentColor" /> {badgeText}
            </div>
          )}
          <button className={styles.favoriteBtn} aria-label="Favorite">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
          </button>
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.location}>
              <MapPin size={14} /> {location}
            </p>
            {rating && reviewsCount && (
              <div className={styles.rating}>
                <Star size={14} fill="#C08A3E" color="#C08A3E" />
                <span className={styles.score}>{rating}</span>
                <span className={styles.reviews}>({reviewsCount} Ratings)</span>
              </div>
            )}
          </div>

          {stats.length > 0 && (
            <div className={styles.statsGrid}>
              {stats.map((stat, idx) => (
                <div key={idx} className={styles.statItem}>
                  <div className={styles.statIcon}>{stat.icon}</div>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {offeringsCount && (
            <div className={styles.footer}>
              <div className={styles.offerings}>
                <Users size={14} />
                <span>{offeringsCount} offerings today</span>
              </div>
              <button className={styles.arrowBtn}>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};
