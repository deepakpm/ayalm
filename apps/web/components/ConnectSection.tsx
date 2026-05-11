import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Heart, Users, MapPin } from 'lucide-react';
import { Button } from '@repo/ui/button';
import styles from './ConnectSection.module.css';

const ConnectSection = () => {
  return (
    <section className={styles.connectSection}>
      {/* Background Image Area */}
      <div className={styles.imageCol}>
        <Image 
          src="/images/gopuram_side.png" 
          alt="Majestic Temple Gopuram" 
          fill
          className={styles.mainImage}
        />
      </div>

      <div className={`container ${styles.container}`}>
        <div className={styles.contentCol}>
          <p className={styles.eyebrow}>CONNECT WITH</p>
          <h2 className={styles.title}>
            Holy Pilgrimages and<br />
            Divine Temples of Tamilnadu
          </h2>
          
          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <div className={styles.iconWrapper}><BookOpen size={24} /></div>
              <p>Learn about the culture and religious history of temples</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.iconWrapper}><Users size={24} /></div>
              <p>Connect with temples of your favourite deities</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.iconWrapper}><Heart size={24} /></div>
              <p>Offer charity work and donate in your favourite temples</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.iconWrapper}><MapPin size={24} /></div>
              <p>Connect with holy pilgrimages and divine temples</p>
            </div>
          </div>
          
          <Link href="/temples">
            <Button variant="primary" className={styles.ctaButton} rightIcon={<ArrowRight size={18} />}>
              Explore Temples
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
