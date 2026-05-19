import React from 'react';
import styles from './Sections.module.css';

const SPECIALITIES = [
  {
    icon: '🙏',
    title: 'Meenakshi Thirukalyanam',
    description: 'Famous for the celestial wedding of Meenakshi Amman and Sundareswarar.'
  },
  {
    icon: '🏛️',
    title: '1000 Pillar Mandapam',
    description: 'A masterpiece of Dravidian architecture with intricately carved pillars.'
  },
  {
    icon: '🎵',
    title: 'Musical Pillars',
    description: 'The pillars in the mandapam produce musical notes when tapped.'
  },
  {
    icon: '💧',
    title: 'Potramarai Kulam',
    description: 'The golden lotus pond believed to be sacred and ancient.'
  }
];

interface SpecialitySectionProps {
  highlights: string[];
}

const SpecialitySection: React.FC<SpecialitySectionProps> = ({ highlights }) => {
  if (!highlights || highlights.length === 0) return null;

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Speciality & Highlights</h2>
      </div>

      <div className={styles.specialityGrid}>
        {highlights.map((highlight, idx) => (
          <div key={idx} className={styles.specItem}>
            <div className={styles.specIcon}>✨</div>
            <div>
              <h4 className={styles.specTitle}>{highlight}</h4>
              <p className={styles.specDesc}>Significant feature of this sacred temple.</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpecialitySection;
