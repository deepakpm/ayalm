import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './Sections.module.css';

const EVENTS = [
  {
    month: 'MAY',
    day: '18',
    title: 'Chithirai Thiruvizha',
    dateRange: 'May 18 - May 28, 2025',
    description: 'Grand annual festival celebrating the celestial wedding of Meenakshi and Sundareswarar.'
  },
  {
    month: 'JUN',
    day: '10',
    title: 'Aani Thirumanjanam',
    dateRange: 'June 10, 2025',
    description: 'Special abhishekam for Lord Sundareswarar.'
  },
  {
    month: 'JUL',
    day: '21',
    title: 'Aadi Pooram',
    dateRange: 'July 21, 2025',
    description: 'Special celebration for Goddess Meenakshi.'
  }
];

const EventsSection = () => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Upcoming Events</h2>
        <button className={styles.viewAllBtn}>View All Events <ArrowRight size={14} style={{display: 'inline', verticalAlign: 'middle', marginLeft: 4}} /></button>
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
              <a href="#" className={styles.viewDetails}>View Details <ArrowRight size={14} /></a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
