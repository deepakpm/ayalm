"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@repo/ui/button';
import { ExternalLink } from 'lucide-react';
import styles from './Sidebars.module.css';
import { useLanguage } from '../../context/LanguageContext';

const LocationSidebar = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.sidebarWidget}>
      <h3 className={styles.widgetTitle}>{t.templeDetail.sidebar.location}</h3>
      
      <p className={styles.addressText}>
        Temple City, Madurai,<br />
        Tamil Nadu - 625001
      </p>

      <div className={styles.mapWrapper}>
        <div className={styles.mapPlaceholder}>
          <Image src="/images/hero_bg.png" alt="Map" fill style={{ objectFit: 'cover', opacity: 0.5 }} />
          <div className={styles.mapPin}>📍</div>
        </div>
      </div>

      <Button variant="secondary" className={styles.directionsBtn} leftIcon={<ExternalLink size={16} />}>
        {t.templeDetail.sidebar.directions}
      </Button>
    </div>
  );
};

export default LocationSidebar;
