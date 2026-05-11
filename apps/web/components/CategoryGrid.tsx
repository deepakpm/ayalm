import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { Card } from '@repo/ui/card';
import styles from './CategoryGrid.module.css';

const categories = [
  {
    title: 'Temples',
    desc: 'Connect with holy temples and pilgrimages across Tamilnadu.',
    img: '/images/temples_cat.png'
  },
  {
    title: 'Offerings',
    desc: 'Offer poojas, archana, abishekam and more to your favourite deity.',
    img: '/images/offerings_cat.png'
  },
  {
    title: 'Astrology',
    desc: 'Get horoscope reports and consult experienced astrologers.',
    img: '/images/astrology_cat.png'
  },
  {
    title: 'Iyer Connect',
    desc: 'Connect with verified priests for your poojas and rituals.',
    img: '/images/iyer_cat.png'
  },
  {
    title: 'Virathangal',
    desc: 'Observe vrathams and receive blessings and spiritual guidance.',
    img: '/images/viratham_cat.png'
  },
  {
    title: 'Online Store',
    desc: 'Shop authentic pooja items, books, idols and more.',
    img: '/images/store_cat.png'
  }
];

const CategoryGrid = () => {
  return (
    <section className={styles.categorySection}>
      <div className={`container ${styles.gridContainer}`}>
        {categories.map((cat, idx) => (
          <Card key={idx} hoverable className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image 
                src={cat.img} 
                alt={cat.title} 
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.content}>
              <div>
                <h3 className={styles.title}>{cat.title}</h3>
                <p className={styles.desc}>{cat.desc}</p>
              </div>
              <button className={styles.iconButton} aria-label={`Explore ${cat.title}`}>
                <ChevronRight size={20} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
