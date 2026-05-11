import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Card } from '@repo/ui/card';
import styles from './Sections.module.css';

const DEITIES = [
  {
    name: 'Arulmigu Meenakshi Amman',
    role: 'Main Deity',
    description: 'Goddess of Madurai, an incarnation of Parvati.',
    image: '/images/temple_meenakshi.png'
  },
  {
    name: 'Arulmigu Sundareswarar',
    role: 'Consort',
    description: 'Lord Shiva in the form of Sundareswarar.',
    image: '/images/temple_arunachaleswarar.png'
  },
  {
    name: 'Arulmigu Kallazhagar',
    role: 'Brother',
    description: 'Lord Vishnu, the brother of Goddess Meenakshi.',
    image: '/images/temple_ranganathaswamy.png'
  }
];

const DeitiesSection = () => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Deities</h2>
        <button className={styles.viewAllBtn}>View All</button>
      </div>

      <div className={styles.deitiesGrid}>
        {DEITIES.map((deity, idx) => (
          <Card key={idx} className={styles.deityCard}>
            <div className={styles.deityImage}>
              <Image src={deity.image} alt={deity.name} fill style={{ objectFit: 'cover' }} />
            </div>
            <div className={styles.deityContent}>
              <h3 className={styles.deityName}>{deity.name}</h3>
              <span className={styles.deityRole}>{deity.role}</span>
              <p className={styles.deityDesc}>{deity.description}</p>
              <a href="#" className={styles.learnMore}>Learn More <ArrowRight size={14} /></a>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default DeitiesSection;
