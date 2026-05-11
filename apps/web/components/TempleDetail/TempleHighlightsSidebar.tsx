"use client";

import React from 'react';
import { Clock } from 'lucide-react';
import styles from './Sidebars.module.css';
import { useLanguage } from '../../context/LanguageContext';

const HIGHLIGHTS = [
  'Famous for Chithirai Thiruvizha',
  'Associated with Pandya Dynasty',
  'One of the 51 Shakti Peethas (believed)',
  'Also known as Southern Kasi',
  'Spreads peace, prosperity and harmony'
];

const TempleHighlightsSidebar = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.sidebarWidget}>
      <h3 className={styles.widgetTitle}>{t.templeDetail.sidebar.highlights}</h3>
      
      <ul className={styles.highlightsList}>
        {HIGHLIGHTS.map((highlight, idx) => (
          <li key={idx} className={styles.highlightItem}>
            <span className={styles.highlightIcon}>🏵️</span>
            {highlight}
          </li>
        ))}
      </ul>

      <div className={styles.timingBox}>
        <Clock size={20} className={styles.timingIcon} />
        <div>
          <h4 className={styles.timingTitle}>{t.templeDetail.sidebar.timings}</h4>
          <p className={styles.timingText}>{t.templeDetail.sidebar.timingsText}</p>
        </div>
      </div>
    </div>
  );
};

export default TempleHighlightsSidebar;
