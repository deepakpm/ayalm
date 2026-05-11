"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import styles from './TempleDetailLayout.module.css';
import TempleHero from './TempleHero';
import TempleTabs from './TempleTabs';
import DeitiesSection from './DeitiesSection';
import PoojaiOfferingsSection from './PoojaiOfferingsSection';
import EventsSection from './EventsSection';
import SpecialitySection from './SpecialitySection';
import AboutTempleSection from './AboutTempleSection';
import HowToReachSection from './HowToReachSection';
import GallerySection from './GallerySection';
import ReviewsSection from './ReviewsSection';
import OfferPrayersSidebar from './OfferPrayersSidebar';
import TempleHighlightsSidebar from './TempleHighlightsSidebar';
import LocationSidebar from './LocationSidebar';
import { useLanguage } from '../../context/LanguageContext';

interface TempleDetailLayoutProps {
  id: string;
}

const TempleDetailLayout: React.FC<TempleDetailLayoutProps> = ({ id }) => {
  // Normally we would fetch temple data here based on the ID.
  // We'll use static mock data for now to match the design.
  const [activeTab, setActiveTab] = React.useState('Overview');
  const { t } = useLanguage();

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <>
            <DeitiesSection />
            <PoojaiOfferingsSection />
            <EventsSection />
            <SpecialitySection />
            <AboutTempleSection />
          </>
        );
      case 'Deities':
        return <DeitiesSection />;
      case 'Poojaa & Offerings':
        return <PoojaiOfferingsSection />;
      case 'Events':
        return <EventsSection />;
      case 'Speciality':
        return <SpecialitySection />;
      case 'Temple Info':
        return <AboutTempleSection />;
      case 'How to Reach':
        return <HowToReachSection />;
      case 'Gallery':
        return <GallerySection />;
      case 'Reviews':
        return <ReviewsSection />;
      default:
        return (
          <div style={{ padding: '40px', textAlign: 'center', background: 'white', borderRadius: '8px' }}>
            <p>More information coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.pageBackground}>
      <div className="container">
        
        {/* Breadcrumbs */}
        <div className={styles.breadcrumbs}>
          <Link href="/" className={styles.breadcrumbLink}>
            <Home size={14} className={styles.homeIcon} /> {t.navbar.home}
          </Link>
          <ChevronRight size={14} className={styles.breadcrumbChevron} /> 
          <Link href="/temples" className={styles.breadcrumbLink}>
            {t.navbar.temples}
          </Link>
          <ChevronRight size={14} className={styles.breadcrumbChevron} />
          <span className={styles.activeBreadcrumb}>Arulmigu Meenakshi Amman Temple</span>
        </div>

        {/* Hero Section */}
        <TempleHero />

        {/* Navigation Tabs */}
        <TempleTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Content & Sidebar Grid */}
        <div className={styles.contentGrid}>
          
          {/* Left Column (Main Content) */}
          <div className={styles.mainColumn}>
            {renderContent()}
          </div>

          {/* Right Column (Sidebar) */}
          <div className={styles.sidebarColumn}>
            <div className={styles.stickySidebar}>
              <OfferPrayersSidebar />
              <TempleHighlightsSidebar />
              <LocationSidebar />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TempleDetailLayout;
