import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Loader2 } from 'lucide-react';
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
import { cookies } from 'next/headers';
import { en } from '../../i18n/en';
import { ta } from '../../i18n/ta';

interface TempleDetailLayoutProps {
  id: string;
  initialTemple?: any;
  activeTab?: string;
}

const TempleDetailLayout = async ({ id, initialTemple, activeTab = 'Overview' }: TempleDetailLayoutProps) => {
  const cookieStore = await cookies();
  const lang = cookieStore.get('ayalam_lang')?.value?.toUpperCase() || 'EN';
  const t = lang === 'TA' ? ta : en;

  const mapTranslations = (item: any) => {
    if (!item) return item;
    const translation = item.translations?.[0] || {};
    return { ...item, ...translation };
  };

  const mapTemple = (t: any) => {
    if (!t) return t;
    const mapped = mapTranslations(t);
    if (mapped.deities) mapped.deities = mapped.deities.map(mapTranslations);
    if (mapped.offerings) mapped.offerings = mapped.offerings.map(mapTranslations);
    if (mapped.events) mapped.events = mapped.events.map(mapTranslations);

    // Flatten highlights into an array of strings
    if (mapped.highlights) {
      mapped.highlights = mapped.highlights.map((h: any) => h.text || h);
    }

    // Map timings array to the expected object structure
    if (Array.isArray(mapped.timings)) {
      const timingsObj: any = {};
      mapped.timings.forEach((timing: any) => {
        if (timing.timeType === 'MORNING') {
          timingsObj.morning = { open: timing.startTime, close: timing.endTime };
        } else if (timing.timeType === 'EVENING') {
          timingsObj.evening = { open: timing.startTime, close: timing.endTime };
        }
      });
      mapped.timings = timingsObj;
    }

    return mapped;
  };

  const temple = mapTemple(initialTemple);
  const loading = false;
  const error = !temple ? 'Temple not found or failed to load' : null;

  const renderContent = () => {
    if (!temple) return null;

    switch (activeTab) {
      case 'Overview':
        return (
          <>
            <DeitiesSection deities={temple.deities} />
            <PoojaiOfferingsSection offerings={temple.offerings} />
            <EventsSection events={temple.events} />
            <SpecialitySection highlights={temple.highlights} />
            <AboutTempleSection description={temple.description} />
          </>
        );
      case 'Deities':
        return <DeitiesSection deities={temple.deities} />;
      case 'Poojaa & Offerings':
        return <PoojaiOfferingsSection offerings={temple.offerings} />;
      case 'Events':
        return <EventsSection events={temple.events} />;
      case 'Speciality':
        return <SpecialitySection highlights={temple.highlights} />;
      case 'Temple Info':
        return <AboutTempleSection description={temple.description} />;
      case 'How to Reach':
        console.log(temple)
        return (
          <HowToReachSection
            city={temple.city}
            state={temple.state}
            nearestAirport={temple.nearestAirport}
            nearestRailwayStation={temple.nearestRailwayStation}
            roadDirections={temple.roadDirections}
          />
        );
      case 'Gallery':
        return <GallerySection gallery={temple.gallery} />;
      case 'Reviews':
        return <ReviewsSection rating={temple.rating} reviewCount={temple.reviewCount} />;
      default:
        return (
          <div style={{ padding: '40px', textAlign: 'center', background: 'white', borderRadius: '8px' }}>
            <p>More information coming soon.</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader2 className={styles.spinner} />
        <p>Loading temple details...</p>
      </div>
    );
  }

  if (error || !temple) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error</h2>
        <p>{error || 'Temple not found'}</p>
        <Link href="/temples" className={styles.backBtn}>Back to Directory</Link>
      </div>
    );
  }

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
          <span className={styles.activeBreadcrumb}>{temple.name}</span>
        </div>

        {/* Hero Section */}
        <TempleHero temple={temple} />

        {/* Navigation Tabs */}
        <TempleTabs activeTab={activeTab} />

        {/* Main Content & Sidebar Grid */}
        <div className={styles.contentGrid}>

          {/* Left Column (Main Content) */}
          <div className={styles.mainColumn}>
            {renderContent()}
          </div>

          {/* Right Column (Sidebar) */}
          <div className={styles.sidebarColumn}>
            <div className={styles.stickySidebar}>
              <OfferPrayersSidebar offerings={temple.offerings?.slice(0, 3)} />
              <TempleHighlightsSidebar highlights={temple.highlights} timings={temple.timings} />
              <LocationSidebar city={temple.city} state={temple.state} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TempleDetailLayout;
