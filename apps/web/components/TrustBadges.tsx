import React from 'react';
import { ShieldCheck, Landmark, Users } from 'lucide-react';
import styles from './TrustBadges.module.css';

export interface TrustBadgeProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const defaultBadges: TrustBadgeProps[] = [
  { icon: <ShieldCheck size={28} />, title: 'Trusted by', subtitle: '500K+ Devotees' },
  { icon: <Landmark size={28} />, title: '1000+', subtitle: 'Temples' },
  { icon: <Users size={28} />, title: '50K+', subtitle: 'Poojas Performed' },
  { icon: <ShieldCheck size={28} />, title: '100% Safe &', subtitle: 'Secure' },
];

export interface TrustBadgesSectionProps {
  badges?: TrustBadgeProps[];
  className?: string;
}

const TrustBadges: React.FC<TrustBadgesSectionProps> = ({ badges = defaultBadges, className = '' }) => {
  return (
    <section className={`${styles.badgesSection} ${className}`}>
      <div className={`container ${styles.container}`}>
        {badges.map((badge, idx) => (
          <React.Fragment key={idx}>
            <div className={styles.badge}>
              <div className={styles.icon}>{badge.icon}</div>
              <div className={styles.text}>
                <span className={styles.title}>{badge.title}</span>
                <span className={styles.subtitle}>{badge.subtitle}</span>
              </div>
            </div>
            {idx < badges.length - 1 && <div className={styles.divider}></div>}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default TrustBadges;
