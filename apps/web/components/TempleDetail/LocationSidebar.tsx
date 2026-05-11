import React from 'react';
import Image from 'next/image';
import { Button } from '@repo/ui/button';
import { ExternalLink } from 'lucide-react';
import styles from './Sidebars.module.css';

const LocationSidebar = () => {
  return (
    <div className={styles.sidebarWidget}>
      <h3 className={styles.widgetTitle}>Temple Location</h3>
      
      <p className={styles.addressText}>
        Temple City, Madurai,<br />
        Tamil Nadu - 625001
      </p>

      <div className={styles.mapWrapper}>
        {/* Placeholder for actual map integration */}
        <div className={styles.mapPlaceholder}>
          <Image src="/images/hero_bg.png" alt="Map" fill style={{ objectFit: 'cover', opacity: 0.5 }} />
          <div className={styles.mapPin}>📍</div>
        </div>
      </div>

      <Button variant="secondary" className={styles.directionsBtn} leftIcon={<ExternalLink size={16} />}>
        Get Directions
      </Button>
    </div>
  );
};

export default LocationSidebar;
