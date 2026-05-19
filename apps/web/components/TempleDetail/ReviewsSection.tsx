import React from 'react';
import { Star } from 'lucide-react';
import styles from './Sections.module.css';

const REVIEWS = [
  {
    name: 'Ramesh K.',
    date: '2 weeks ago',
    rating: 5,
    text: 'A truly divine experience. The architecture is breathtaking and the poojas are conducted with utmost devotion. Highly recommend visiting early in the morning.'
  },
  {
    name: 'Priya S.',
    date: '1 month ago',
    rating: 4,
    text: 'Beautiful temple with rich history. It gets very crowded on weekends, so plan your visit accordingly. The 1000 pillar mandapam is a must-see.'
  },
  {
    name: 'Anand V.',
    date: '3 months ago',
    rating: 5,
    text: 'Well maintained and spiritually uplifting. The priests are very knowledgeable and helpful.'
  }
];

interface ReviewsSectionProps {
  rating?: number;
  reviewCount?: number;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ rating, reviewCount }) => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Reviews</h2>
        <div className={styles.overallRating}>
          <Star size={20} fill="#C08A3E" color="#C08A3E" />
          <span className={styles.ratingScore}>{rating || 0}</span>
          <span className={styles.ratingCount}>({reviewCount || 0} Ratings)</span>
        </div>
      </div>

      <div className={styles.reviewsList}>
        {REVIEWS.map((review, idx) => (
          <div key={idx} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <div className={styles.reviewerAvatar}>
                {review.name.charAt(0)}
              </div>
              <div className={styles.reviewerInfo}>
                <h4 className={styles.reviewerName}>{review.name}</h4>
                <span className={styles.reviewDate}>{review.date}</span>
              </div>
              <div className={styles.reviewStars}>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < review.rating ? "#C08A3E" : "none"} 
                    color={i < review.rating ? "#C08A3E" : "#ccc"} 
                  />
                ))}
              </div>
            </div>
            <p className={styles.reviewText}>{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
