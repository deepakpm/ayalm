"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Card } from '@repo/ui/card';
import styles from './Sections.module.css';
import { useLanguage } from '../../context/LanguageContext';

const DeitiesSection = () => {
  const { t } = useLanguage();

  const DEITIES = [
    {
      name: t.templeDetail.deityData.meenakshi.name,
      role: t.templeDetail.deityData.meenakshi.role,
      description: t.templeDetail.deityData.meenakshi.desc,
      image: '/images/temple_meenakshi.png'
    },
    {
      name: t.templeDetail.deityData.sundareswarar.name,
      role: t.templeDetail.deityData.sundareswarar.role,
      description: t.templeDetail.deityData.sundareswarar.desc,
      image: '/images/temple_arunachaleswarar.png'
    },
    {
      name: t.templeDetail.deityData.kallazhagar.name,
      role: t.templeDetail.deityData.kallazhagar.role,
      description: t.templeDetail.deityData.kallazhagar.desc,
      image: '/images/temple_ranganathaswamy.png'
    }
  ];

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{t.templeDetail.sections.deities}</h2>
        <button className={styles.viewAllBtn}>{t.templeDetail.sections.viewAll}</button>
      </div>

      <div className={styles.deitiesGrid}>
        {DEITIES.map((deity, idx) => (
          <Card key={idx} className={styles.deityCard}>
            <div className={styles.deityImage}>
              <Image src={deity.image} alt={deity.name} fill style={{ objectFit: 'cover' }} />
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
