"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './Sections.module.css';
import { useLanguage } from '../../context/LanguageContext';

const PoojaiOfferingsSection = () => {
  const { t } = useLanguage();

  const OFFERINGS = [
    { name: t.templeDetail.offeringData.abhishekam, freq: t.templeDetail.offeringData.daily, price: '₹501', img: '/images/astrology_cat.png' },
    { name: t.templeDetail.offeringData.archana, freq: t.templeDetail.offeringData.daily, price: '₹251', img: '/images/offerings_cat.png' },
    { name: t.templeDetail.offeringData.sahasranama, freq: t.templeDetail.offeringData.daily, price: '₹751', img: '/images/temples_cat.png' },
    { name: t.templeDetail.offeringData.kalyana, freq: t.templeDetail.offeringData.daily, price: '₹2,501', img: '/images/viratham_cat.png' }
  ];

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{t.templeDetail.sections.poojaOfferings}</h2>
        <button className={styles.viewAllBtn}>{t.templeDetail.sections.viewAll} <ArrowRight size={14} style={{display: 'inline', verticalAlign: 'middle', marginLeft: 4}} /></button>
      </div>

      <div className={styles.offeringsScroll}>
        {OFFERINGS.map((offer, idx) => (
          <div key={idx} className={styles.offeringItem}>
            <div className={styles.offeringImg}>
              <Image src={offer.img} alt={offer.name} width={50} height={50} style={{ objectFit: 'contain' }} />
            </div>
            <div className={styles.offeringInfo}>
              <h4>{offer.name}</h4>
              <span className={styles.freq}>{offer.freq}</span>
              <span className={styles.price}>{offer.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PoojaiOfferingsSection;
