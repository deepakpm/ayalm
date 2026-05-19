"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './Sections.module.css';
import { useLanguage } from '../../context/LanguageContext';

interface EventsSectionProps {
  events: any[];
}

const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  const { t } = useLanguage();

  if (!events || events.length === 0) return null;

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{t.templeDetail.sections.upcomingEvents}</h2>
        <button className={styles.viewAllBtn}>{t.templeDetail.sections.viewAll} <ArrowRight size={14} style={{display: 'inline', verticalAlign: 'middle', marginLeft: 4}} /></button>
      </div>

      <div className={styles.eventsScroll}>
        {events.map((evt, idx) => {
          const startDate = new Date(evt.startDate);
          const month = startDate.toLocaleString('default', { month: 'short' }).toUpperCase();
          const day = startDate.getDate();
          const dateRange = `${startDate.toLocaleDateString()} - ${new Date(evt.endDate).toLocaleDateString()}`;

          return (
            <div key={idx} className={styles.eventItem}>
              <div className={styles.eventDateBox}>
                <span className={styles.eventMonth}>{month}</span>
                <span className={styles.eventDay}>{day}</span>
              </div>
              <div className={styles.eventInfo}>
                <h4>{evt.name}</h4>
                <span className={styles.eventDateRange}>{dateRange}</span>
                <p className={styles.eventDesc}>{evt.description}</p>
                <a href="#" className={styles.viewDetails}>{t.templeDetail.sections.viewDetails} <ArrowRight size={14} /></a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EventsSection;
