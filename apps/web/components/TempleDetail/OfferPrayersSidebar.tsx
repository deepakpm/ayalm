"use client";

import React from 'react';
import { Button } from '@repo/ui/button';
import { ShieldCheck } from 'lucide-react';
import styles from './Sidebars.module.css';
import { useLanguage } from '../../context/LanguageContext';

const SIDEBAR_OFFERINGS = [
  { name: 'Archana', price: '₹251' },
  { name: 'Abhishekam', price: '₹501' },
  { name: 'Sahasranama Archana', price: '₹751' },
  { name: 'Kalyana Utsavam', price: '₹2,501' }
];

const OfferPrayersSidebar = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.sidebarWidget}>
      <h3 className={styles.widgetTitle}>{t.templeDetail.sidebar.bookOfferings}</h3>
      <p className={styles.widgetSubtitle}>
        {t.templeDetail.sidebar.bookDesc}
      </p>

      <ul className={styles.prayersList}>
        {SIDEBAR_OFFERINGS.map((offer, idx) => (
          <li key={idx} className={styles.prayerItem}>
            <span className={styles.prayerIcon}>⛩️</span>
            <span className={styles.prayerName}>{offer.name}</span>
            <span className={styles.prayerPrice}>{offer.price}</span>
          </li>
        ))}
      </ul>

      <Button variant="primary" className={styles.viewAllOfferingsBtn}>
        {t.templeDetail.sidebar.viewAllOfferings}
      </Button>

      <div className={styles.trustBox}>
        <ShieldCheck size={20} className={styles.trustIcon} />
        <p>{t.templeDetail.sidebar.trustBoxText}</p>
      </div>
    </div>
  );
};

export default OfferPrayersSidebar;
