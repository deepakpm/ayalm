import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@repo/ui/button';
import styles from './Hero.module.css';

interface HeroProps {
  banners?: any[];
}

const Hero = ({ banners = [] }: HeroProps) => {
  // Fallback to static hero if no banners provided or db is empty
  const activeBanners = banners.length > 0 ? banners : [{
    id: 'static',
    imageUrl: '/images/hero_bg.png',
    title: 'Offer your prayers.\nReceive <span class="heading-primary">divine</span> blessings.',
    subtitle: 'Now offer your prayers and sacred offering to your beloved deities at renowned temples across Tamilnadu—from your home. Seek divine blessing on Alayam.',
    ctaText: 'Offer Now',
    linkUrl: '/offerings'
  }];

  return (
    <section className={styles.heroSection}>
      {/* Container for scroll-snap carousel */}
      <div className={styles.carouselContainer}>
        {activeBanners.map((banner, index) => (
          <div key={banner.id || index} className={styles.carouselSlide}>
            {/* Right Image Area Background */}
            <div className={styles.imageWrapper}>
              <Image 
                src={banner.imageUrl || '/images/hero_bg.png'} 
                alt="Divine banner" 
                fill
                className={styles.heroImage}
                priority={index === 0}
              />
            </div>

            <div className={`container ${styles.heroContainer}`}>
              {/* Left Content Area */}
              <div className={styles.content}>
                <h1 
                  className={styles.title} 
                  dangerouslySetInnerHTML={{ __html: banner.title.replace('\n', '<br />') }}
                />
                <p className={styles.subtitle}>{banner.subtitle}</p>
                
                {banner.linkUrl && (
                  <div className={styles.actionsGroup}>
                    <Link href={banner.linkUrl}>
                      <Button variant="primary" className={styles.ctaButton} rightIcon={<ArrowRight size={18} />}>
                        {banner.ctaText || 'Explore'}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;

