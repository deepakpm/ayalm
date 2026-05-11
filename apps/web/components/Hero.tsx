import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@repo/ui/button';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      {/* Right Image Area Background */}
      <div className={styles.imageWrapper}>
        <Image 
          src="/images/hero_bg.png" 
          alt="Divine prayers thali" 
          fill
          className={styles.heroImage}
          priority
        />
      </div>

      <div className={`container ${styles.heroContainer}`}>
        {/* Left Content Area */}
        <div className={styles.content}>
          <h1 className={styles.title}>
            Offer your prayers.<br />
            Receive <span className="heading-primary">divine</span> blessings.
          </h1>
          <p className={styles.subtitle}>
            Now offer your prayers and sacred offering to your beloved deities at renowned temples across Tamilnadu—from your home. Seek divine blessing on Alayam.
          </p>
          
          <div className={styles.actionsGroup}>
            <Link href="/offerings">
              <Button variant="primary" className={styles.ctaButton} rightIcon={<ArrowRight size={18} />}>
                Offer Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

