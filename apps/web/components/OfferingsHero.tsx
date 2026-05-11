import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bell, PlayCircle, ShieldCheck, Heart, MapPin, Star, ChevronRight, Home } from 'lucide-react';
import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
import styles from './OfferingsHero.module.css';

const OfferingsHero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.heroContainer}`}>
        
        {/* Left Content Area */}
        <div className={styles.content}>
          <div className={styles.eyebrow}>
            {/* Simple lamp representation or icon placeholder */}
            <span className={styles.eyebrowIcon}>🪔</span>
            <span>DIVINE CONNECTION, FROM YOUR HOME</span>
          </div>

          <h1 className={styles.title}>
            Offer your prayers.<br />
            Receive <span className="heading-primary">divine</span> blessings.
          </h1>
          <p className={styles.subtitle}>
            Now offer your prayers and sacred offering to your beloved deities at renowned temples across Tamilnadu—from your home. Seek divine blessing on Alayam.
          </p>
          
          <div className={styles.actionsGroup}>
            <Button variant="primary" className={styles.ctaButton} leftIcon={<Bell size={18} fill="currentColor" />} rightIcon={<ArrowRight size={18} />}>
              OFFER NOW
            </Button>
            <Button variant="secondary" className={styles.secondaryButton} leftIcon={<PlayCircle size={18} />}>
              HOW IT WORKS
            </Button>
          </div>

          <div className={styles.trustFeatures}>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}><ShieldCheck size={20} /></div>
              <span>100% Secure<br/>& Trusted</span>
            </div>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>🙏</div>
              <span>Offered by Verified<br/>Temples & Priests</span>
            </div>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}><Heart size={20} /></div>
              <span>Delivered with<br/>Devotion</span>
            </div>
          </div>
        </div>

        {/* Right Image Area */}
        <div className={styles.imageWrapper}>
          <Image 
            src="/images/hero_bg.png" 
            alt="Divine prayers thali" 
            width={800} 
            height={600} 
            className={styles.heroImage}
            priority
          />
          
          {/* Overlay Card */}
          <Card className={styles.overlayCard}>
            <div className={styles.cardContent}>
              <div className={styles.cardEyebrow}>
                <Star size={14} className={styles.starIcon} fill="currentColor" />
                <span>FEATURED TEMPLE</span>
              </div>
              <h3 className={styles.cardTitle}>Arulmigu Meenakshi<br/>Amman Temple</h3>
              <p className={styles.cardLocation}><MapPin size={14} /> Madurai, Tamil Nadu</p>
              
              <div className={styles.avatarsRow}>
                <div className={styles.avatars}>
                  {/* Dummy avatars using generic placeholders */}
                  <div className={styles.avatar}></div>
                  <div className={styles.avatar}></div>
                  <div className={styles.avatar}></div>
                </div>
                <span className={styles.avatarText}>25K+ devotees offered<br/>prayers today</span>
              </div>

              <Button variant="text" className={styles.cardLink} rightIcon={<ArrowRight size={16} />}>
                Offer Now
              </Button>
            </div>
            
            <div className={styles.cardImageWrapper}>
              <Image 
                src="/images/temple_meenakshi.png" 
                alt="Meenakshi Temple" 
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OfferingsHero;
