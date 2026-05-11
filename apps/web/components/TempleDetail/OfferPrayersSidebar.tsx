import React from 'react';
import { Button } from '@repo/ui/button';
import { ShieldCheck } from 'lucide-react';
import styles from './Sidebars.module.css';

const SIDEBAR_OFFERINGS = [
  { name: 'Archana', price: '₹251' },
  { name: 'Abhishekam', price: '₹501' },
  { name: 'Sahasranama Archana', price: '₹751' },
  { name: 'Kalyana Utsavam', price: '₹2,501' }
];

const OfferPrayersSidebar = () => {
  return (
    <div className={styles.sidebarWidget}>
      <h3 className={styles.widgetTitle}>Offer Your Prayers</h3>
      <p className={styles.widgetSubtitle}>
        Book poojas and offer your prayers to receive divine blessings.
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
        View All Offerings
      </Button>

      <div className={styles.trustBox}>
        <ShieldCheck size={20} className={styles.trustIcon} />
        <p>Pooja will be performed by verified priests as per temple rituals.</p>
      </div>
    </div>
  );
};

export default OfferPrayersSidebar;
