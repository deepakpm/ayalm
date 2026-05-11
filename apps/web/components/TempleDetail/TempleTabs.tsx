"use client";

import React from 'react';
import styles from './TempleTabs.module.css';
import { useLanguage } from '../../context/LanguageContext';

interface TempleTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TempleTabs: React.FC<TempleTabsProps> = ({ activeTab, onTabChange }) => {
  const { t } = useLanguage();

  const TABS = [
    { id: 'Overview', label: t.templeDetail.tabs.overview },
    { id: 'Deities', label: t.templeDetail.tabs.deities },
    { id: 'Poojaa & Offerings', label: t.templeDetail.tabs.offerings },
    { id: 'Events', label: t.templeDetail.tabs.events },
    { id: 'Speciality', label: t.templeDetail.tabs.speciality },
    { id: 'Temple Info', label: t.templeDetail.tabs.info },
    { id: 'How to Reach', label: t.templeDetail.tabs.howToReach },
    { id: 'Gallery', label: t.templeDetail.tabs.gallery },
    { id: 'Reviews', label: t.templeDetail.tabs.reviews }
  ];

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsScroll}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TempleTabs;
