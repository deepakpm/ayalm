import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TempleCard } from '@repo/ui/temple-card';
import styles from './TemplesCarousel.module.css';

const temples = [
  {
    name: 'Meenakshi Amman Temple',
    location: 'Madurai',
    img: '/images/temple_meenakshi.png'
  },
  {
    name: 'Arunachaleswarar Temple',
    location: 'Tiruvannamalai',
    img: '/images/temple_arunachaleswarar.png'
  },
  {
    name: 'Ranganathaswamy Temple',
    location: 'Srirangam',
    img: '/images/temple_ranganathaswamy.png'
  },
  {
    name: 'Brihadeeswarar Temple',
    location: 'Thanjavur',
    img: '/images/temple_brihadeeswarar.png'
  },
  {
    name: 'Kapaleeswarar Temple',
    location: 'Chennai',
    img: '/images/temple_kapaleeswarar.png'
  }
];

const TemplesCarousel = () => {
  return (
    <section className={styles.templesSection}>
      <div className={`container`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Temples</h2>
          <Link href="/temples" className={styles.viewAll}>
            View All Temples <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className={styles.carouselContainer}>
          {temples.map((temple, idx) => {
            const slug = temple.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            return (
              <div key={idx} className={styles.cardWrapper}>
                <Link href={`/temples/${slug}`} style={{textDecoration: 'none', display: 'block', height: '100%'}}>
                  <TempleCard
                    title={temple.name}
                    location={temple.location}
                    imageSrc={temple.img}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TemplesCarousel;
