import React from 'react';
import styles from './Sections.module.css';

const TAGS = ['Ancient Temple', 'Dravidian Architecture', 'Spiritual Significance', 'Cultural Heritage'];

const AboutTempleSection = () => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>About the Temple</h2>
      </div>

      <p className={styles.aboutText}>
        The temple is an architectural marvel built in Dravidian style. It is mentioned in ancient texts and has been a center of culture, devotion, and art for over 1000 years.
      </p>

      <div className={styles.tagsContainer}>
        {TAGS.map((tag, idx) => (
          <span key={idx} className={styles.aboutTag}>{tag}</span>
        ))}
      </div>
    </section>
  );
};

export default AboutTempleSection;
