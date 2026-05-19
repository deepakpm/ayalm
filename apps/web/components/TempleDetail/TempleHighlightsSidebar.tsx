"use client";

import React from 'react';
import { Clock } from 'lucide-react';
import styles from './Sidebars.module.css';
import { useLanguage } from '../../context/LanguageContext';

interface TempleHighlightsSidebarProps {
  highlights?: string[];
  timings?: any;
}

const TempleHighlightsSidebar: React.FC<TempleHighlightsSidebarProps> = ({ highlights, timings }) => {
  const { t } = useLanguage();

  const displayHighlights = highlights && highlights.length > 0 ? highlights : ['Ancient Temple', 'Verified'];
  const morningTiming = timings?.morning ? `${timings.morning.open} - ${timings.morning.close}` : '05:00 AM - 12:30 PM';
  const eveningTiming = timings?.evening ? `${timings.evening.open} - ${timings.evening.close}` : '04:00 PM - 09:00 PM';

  return (
    <div className={styles.sidebarWidget}>
      <h3 className={styles.widgetTitle}>{t.templeDetail.sidebar.highlights}</h3>
      
      <ul className={styles.highlightsList}>
        {displayHighlights.map((highlight, idx) => (
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
          <p className={styles.timingText}>Morning: {morningTiming}</p>
          <p className={styles.timingText}>Evening: {eveningTiming}</p>
        </div>
      </div>
    </div>
  );
};

export default TempleHighlightsSidebar;
