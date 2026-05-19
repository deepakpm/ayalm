import React from 'react';
import styles from './Sections.module.css';

interface AboutTempleSectionProps {
  description: string;
}

const AboutTempleSection: React.FC<AboutTempleSectionProps> = ({ description }) => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>About Temple</h2>
      </div>
      <div className={styles.aboutContent}>
        <p>{description}</p>
      </div>
    </section>
  );
};

export default AboutTempleSection;
