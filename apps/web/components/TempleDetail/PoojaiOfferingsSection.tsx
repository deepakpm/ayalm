"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './Sections.module.css';
import { useLanguage } from '../../context/LanguageContext';

interface PoojaiOfferingsSectionProps {
  offerings: any[];
}

const PoojaiOfferingsSection: React.FC<PoojaiOfferingsSectionProps> = ({ offerings }) => {
  const { t } = useLanguage();

  if (!offerings || offerings.length === 0) return null;

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{t.templeDetail.sections.poojaOfferings}</h2>
        <button className={styles.viewAllBtn}>{t.templeDetail.sections.viewAll} <ArrowRight size={14} style={{display: 'inline', verticalAlign: 'middle', marginLeft: 4}} /></button>
      </div>

      <div className={styles.offeringsScroll}>
        {offerings.map((offer, idx) => (
          <div key={idx} className={styles.offeringItem}>
            <div className={styles.offeringImg}>
              <Image 
                src={offer.imageUrl || '/images/offerings_cat.png'} 
                alt={offer.name} 
                width={50} 
                height={50} 
                style={{ objectFit: 'contain' }} 
              />
            </div>
            <div className={styles.offeringInfo}>
              <h4>{offer.name}</h4>
              <span className={styles.freq}>{offer.frequency}</span>
              <span className={styles.price}>{offer.currency === 'INR' ? '₹' : offer.currency}{offer.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PoojaiOfferingsSection;
