import React from 'react';
import { Plane, Train, Bus, MapPin } from 'lucide-react';
import styles from './Sections.module.css';

interface HowToReachSectionProps {
  city?: string;
  state?: string;
  nearestAirport?: string;
  nearestRailwayStation?: string;
  roadDirections?: string;
}

const HowToReachSection: React.FC<HowToReachSectionProps> = ({ 
  city, 
  state, 
  nearestAirport, 
  nearestRailwayStation, 
  roadDirections 
}) => {
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
              {nearestAirport || `The nearest airport is ${city} International Airport, well connected to major global destinations.`}
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
              {nearestRailwayStation || `${city} Junction Railway Station is the main railhead connecting the temple to other parts of ${state}.`}
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
              {roadDirections || `Regular bus services are available from major cities in ${state} and neighboring states.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToReachSection;
