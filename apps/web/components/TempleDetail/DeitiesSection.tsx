"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Card } from '@repo/ui/card';
import styles from './Sections.module.css';
import { useLanguage } from '../../context/LanguageContext';

interface DeitiesSectionProps {
  deities: any[];
}

const DeitiesSection: React.FC<DeitiesSectionProps> = ({ deities }) => {
  const { t } = useLanguage();

  if (!deities || deities.length === 0) return null;

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{t.templeDetail.sections.deities}</h2>
        <button className={styles.viewAllBtn}>{t.templeDetail.sections.viewAll}</button>
      </div>

      <div className={styles.deitiesGrid}>
        {deities.map((deity, idx) => (
          <Card key={idx} className={styles.deityCard}>
            <div className={styles.deityImage}>
              <Image src={deity.imageUrl} alt={deity.name} fill style={{ objectFit: 'cover' }} />
            </div>
            <div className={styles.deityContent}>
              <h3 className={styles.deityName}>{deity.name}</h3>
              <span className={styles.deityRole}>{deity.role}</span>
              <p className={styles.deityDesc}>{deity.description}</p>
              <a href="#" className={styles.learnMore}>{t.templeDetail.sections.learnMore} <ArrowRight size={14} /></a>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default DeitiesSection;
