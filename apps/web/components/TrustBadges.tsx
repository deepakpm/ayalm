"use client";

import React from 'react';
import { ShieldCheck, Landmark, Users } from 'lucide-react';
import styles from './TrustBadges.module.css';
import { useLanguage } from '../context/LanguageContext';

export interface TrustBadgeProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export interface TrustBadgesSectionProps {
  badges?: TrustBadgeProps[];
  className?: string;
}

const TrustBadges: React.FC<TrustBadgesSectionProps> = ({ badges, className = '' }) => {
  const { t } = useLanguage();

  const translatedDefaultBadges: TrustBadgeProps[] = [
    { icon: <Users size={28} />, title: t.templeDetail.trustBadges.devotees.title, subtitle: t.templeDetail.trustBadges.devotees.subtitle },
    { icon: <Landmark size={28} />, title: t.templeDetail.trustBadges.temples.title, subtitle: t.templeDetail.trustBadges.temples.subtitle },
    { icon: <Users size={28} />, title: t.templeDetail.trustBadges.poojas.title, subtitle: t.templeDetail.trustBadges.poojas.subtitle },
    { icon: <ShieldCheck size={28} />, title: t.templeDetail.trustBadges.secure.title, subtitle: t.templeDetail.trustBadges.secure.subtitle },
  ];

  const displayBadges = badges || translatedDefaultBadges;
  return (
    <section className={`${styles.badgesSection} ${className}`}>
      <div className={`container ${styles.container}`}>
        {displayBadges.map((badge, idx) => (
          <React.Fragment key={idx}>
            <div className={styles.badge}>
              <div className={styles.icon}>{badge.icon}</div>
              <div className={styles.text}>
                <span className={styles.title}>{badge.title}</span>
                <span className={styles.subtitle}>{badge.subtitle}</span>
              </div>
            </div>
            {idx < displayBadges.length - 1 && <div className={styles.divider}></div>}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default TrustBadges;
