"use client";

import React from 'react';
import styles from './TempleTabs.module.css';

const TABS = [
  'Overview',
  'Deities',
  'Poojaa & Offerings',
  'Events',
  'Speciality',
  'Temple Info',
  'How to Reach',
  'Gallery',
  'Reviews'
];

interface TempleTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TempleTabs: React.FC<TempleTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsScroll}>
        {TABS.map(tab => (
          <button
            key={tab}
            className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TempleTabs;
