import { cookies } from 'next/headers';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TempleCard } from '@repo/ui/temple-card';
import styles from './TemplesCarousel.module.css';
import { templeApi } from '../lib/api';

const TemplesCarousel = async () => {
  const cookieStore = await cookies();
  const lang = cookieStore.get('ayalam_lang')?.value?.toUpperCase() || 'EN';

  let temples: any[] = [];
  try {
    temples = await templeApi.getMostPopular(lang);
  } catch (err) {
    console.error('Failed to fetch carousel temples:', err);
  }

  return (
    <section className={styles.templesSection}>
      <div className={`container`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Temples</h2>
          <Link href="/temples" className={styles.viewAll}>
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className={styles.carouselContainer}>
          {(temples || []).map((temple, idx) => {
            console.log(temple)
            return (
              <div key={temple.id || idx} className={styles.cardWrapper}>

                <TempleCard
                  slug={temple.slug}
                  title={temple.name}
                  location={`${temple.city}, ${temple.state}`}
                  imageSrc={temple.imageUrl}
                  badgeText={'Verified'}
                />

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TemplesCarousel;
