import React from 'react';
import { Clock } from 'lucide-react';
import styles from './Sidebars.module.css';

const HIGHLIGHTS = [
  'Famous for Chithirai Thiruvizha',
  'Associated with Pandya Dynasty',
  'One of the 51 Shakti Peethas (believed)',
  'Also known as Southern Kasi',
  'Spreads peace, prosperity and harmony'
];

const TempleHighlightsSidebar = () => {
  return (
    <div className={styles.sidebarWidget}>
      <h3 className={styles.widgetTitle}>Temple Highlights</h3>
      
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
          <h4 className={styles.timingTitle}>Best Time to Visit</h4>
          <p className={styles.timingText}>Oct - Mar (6:00 AM - 12:00 PM,<br/>4:00 PM - 9:30 PM)</p>
        </div>
      </div>
    </div>
  );
};

export default TempleHighlightsSidebar;
