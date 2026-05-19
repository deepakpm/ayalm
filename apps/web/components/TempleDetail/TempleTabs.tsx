"use client";

import React from 'react';
import styles from './TempleTabs.module.css';
import { useLanguage } from '../../context/LanguageContext';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface TempleTabsProps {
  activeTab: string;
}

const TempleTabs: React.FC<TempleTabsProps> = ({ activeTab }) => {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTabClick = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

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
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TempleTabs;
