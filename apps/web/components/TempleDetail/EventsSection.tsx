"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './Sections.module.css';
import { useLanguage } from '../../context/LanguageContext';

const EventsSection = () => {
  const { t } = useLanguage();

  const EVENTS = [
    {
      month: t.templeDetail.eventData.event1.month,
      day: t.templeDetail.eventData.event1.day,
      title: t.templeDetail.eventData.event1.name,
      dateRange: t.templeDetail.eventData.event1.dateRange,
      description: t.templeDetail.eventData.event1.desc
    },
    {
      month: t.templeDetail.eventData.event2.month,
      day: t.templeDetail.eventData.event2.day,
      title: t.templeDetail.eventData.event2.name,
      dateRange: t.templeDetail.eventData.event2.dateRange,
      description: t.templeDetail.eventData.event2.desc
    },
    {
      month: t.templeDetail.eventData.event3.month,
      day: t.templeDetail.eventData.event3.day,
      title: t.templeDetail.eventData.event3.name,
      dateRange: t.templeDetail.eventData.event3.dateRange,
      description: t.templeDetail.eventData.event3.desc
    }
  ];

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{t.templeDetail.sections.upcomingEvents}</h2>
        <button className={styles.viewAllBtn}>{t.templeDetail.sections.viewAll} <ArrowRight size={14} style={{display: 'inline', verticalAlign: 'middle', marginLeft: 4}} /></button>
      </div>

      <div className={styles.eventsScroll}>
        {EVENTS.map((evt, idx) => (
          <div key={idx} className={styles.eventItem}>
            <div className={styles.eventDateBox}>
              <span className={styles.eventMonth}>{evt.month}</span>
              <span className={styles.eventDay}>{evt.day}</span>
            </div>
            <div className={styles.eventInfo}>
              <h4>{evt.title}</h4>
              <span className={styles.eventDateRange}>{evt.dateRange}</span>
              <p className={styles.eventDesc}>{evt.description}</p>
              <a href="#" className={styles.viewDetails}>{t.templeDetail.sections.viewDetails} <ArrowRight size={14} /></a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
