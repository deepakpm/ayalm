import React from 'react';
import { Plane, Train, Bus, MapPin } from 'lucide-react';
import styles from './Sections.module.css';

const HowToReachSection = () => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>How to Reach</h2>
      </div>

      <div className={styles.reachGrid}>
        <div className={styles.reachCard}>
          <div className={styles.reachIconWrapper}>
            <Plane size={24} color="var(--color-primary)" />
          </div>
          <div className={styles.reachContent}>
            <h4 className={styles.reachTitle}>By Air</h4>
            <p className={styles.reachDesc}>
              The nearest airport is Madurai International Airport (IXM), located about 12 km from the temple.
            </p>
          </div>
        </div>

        <div className={styles.reachCard}>
          <div className={styles.reachIconWrapper}>
            <Train size={24} color="var(--color-primary)" />
          </div>
          <div className={styles.reachContent}>
            <h4 className={styles.reachTitle}>By Train</h4>
            <p className={styles.reachDesc}>
              Madurai Junction Railway Station is just 2 km away and is well connected to major cities.
            </p>
          </div>
        </div>

        <div className={styles.reachCard}>
          <div className={styles.reachIconWrapper}>
            <Bus size={24} color="var(--color-primary)" />
          </div>
          <div className={styles.reachContent}>
            <h4 className={styles.reachTitle}>By Road</h4>
            <p className={styles.reachDesc}>
              Mattuthavani and Periyar bus stands offer regular bus services from all parts of Tamil Nadu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToReachSection;
