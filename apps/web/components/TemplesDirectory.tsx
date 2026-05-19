"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, ChevronDown, ChevronRight, RotateCcw, X, Home, Loader2 } from 'lucide-react';
import { TempleCard } from '@repo/ui/temple-card';
import styles from './TemplesDirectory.module.css';
import { templeApi } from '../lib/api';
import { useLanguage } from '../context/LanguageContext';

const MOCK_TEMPLES = [
  {
    title: 'Arulmigu Meenakshi Amman Temple',
    location: 'Madurai, Tamil Nadu',
    imageSrc: '/images/temple_meenakshi.png',
    badgeText: 'Popular',
    offeringsCount: '25K+',
    deity: 'Amman',
    type: 'Popular Temples',
    popularity: 100
  },
  {
    title: 'Thanjavur Brihadeeswarar Temple',
    location: 'Thanjavur, Tamil Nadu',
    imageSrc: '/images/temple_brihadeeswarar.png',
    badgeText: 'Ancient',
    offeringsCount: '16K+',
    deity: 'Shiva',
    type: 'Ancient Temples',
    popularity: 95
  },
  {
    title: 'Ranganathaswamy Temple',
    location: 'Srirangam, Tamil Nadu',
    imageSrc: '/images/temple_ranganathaswamy.png',
    badgeText: 'Popular',
    offeringsCount: '22K+',
    deity: 'Vishnu',
    type: 'Ancient Temples',
    popularity: 98
  },
  {
    title: 'Kanyakumari Amman Temple',
    location: 'Kanyakumari, Tamil Nadu',
    imageSrc: '/images/temple_ranganathaswamy.png', // reusing image for mockup
    badgeText: 'Ancient',
    offeringsCount: '14K+',
    deity: 'Amman',
    type: 'Ancient Temples',
    popularity: 85
  },
  {
    title: 'Thiruvannamalai Annamalaiyar Temple',
    location: 'Tiruvannamalai, Tamil Nadu',
    imageSrc: '/images/temple_arunachaleswarar.png',
    badgeText: 'Popular',
    offeringsCount: '18K+',
    deity: 'Shiva',
    type: 'Parihara Temples',
    popularity: 92
  },
  {
    title: 'Chidambaram Nataraja Temple',
    location: 'Chidambaram, Tamil Nadu',
    imageSrc: '/images/temple_arunachaleswarar.png', // reusing image
    badgeText: 'Ancient',
    offeringsCount: '12K+',
    deity: 'Shiva',
    type: 'Ancient Temples',
    popularity: 90
  },
  {
    title: 'Palani Murugan Temple',
    location: 'Dindigul, Tamil Nadu',
    imageSrc: '/images/temple_meenakshi.png', // reusing image
    badgeText: 'Popular',
    offeringsCount: '15K+',
    deity: 'Murugan',
    type: 'Popular Temples',
    popularity: 88
  },
  {
    title: 'Arunachaleswarar Temple',
    location: 'Tiruvannamalai, Tamil Nadu',
    imageSrc: '/images/temple_arunachaleswarar.png',
    badgeText: 'Ancient',
    offeringsCount: '11K+',
    deity: 'Shiva',
    type: 'Sthala Purana Temples',
    popularity: 80
  }
];

interface TemplesDirectoryProps {
  initialTemples: any[];
}

const TemplesDirectory = ({ initialTemples }: TemplesDirectoryProps) => {
  const [activeTab, setActiveTab] = useState('All Temples');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedDeities, setSelectedDeities] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('Popularity');


  const toggleDeity = (deity: string) => {
    setSelectedDeities(prev => 
      prev.includes(deity) ? prev.filter(d => d !== deity) : [...prev, deity]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLocation('All Locations');
    setSelectedDeities([]);
    setSelectedTypes([]);
    setActiveTab('All Temples');
  };

  const availableDeities = useMemo(() => {
    const deitiesMap = new Map<string, { id: string, icon: string }>();
    initialTemples.forEach(temple => {
      temple.deities?.forEach((d: any) => {
        if (d.name) {
          let icon = '🙏';
          if (d.name.includes('Shiva')) icon = '🕉️';
          else if (d.name.includes('Vishnu')) icon = '🪔';
          else if (d.name.includes('Amman')) icon = '🌸';
          else if (d.name.includes('Murugan')) icon = '🦚';
          else if (d.name.includes('Ganesha')) icon = '🐘';
          else if (d.name.includes('Navagraha')) icon = '☀️';
          
          if (!deitiesMap.has(d.name)) {
            deitiesMap.set(d.name, { id: d.name, icon });
          }
        }
      });
    });
    return Array.from(deitiesMap.values());
  }, [initialTemples]);

  const availableTypes = useMemo(() => {
    const typeMap = new Map<string, { id: string, label: string }>();
    initialTemples.forEach(temple => {
      if (temple.type) {
        if (!typeMap.has(temple.type)) {
          let label = temple.type.split('_').map((w: string) => w.charAt(0) + w.slice(1).toLowerCase()).join(' ') + ' Temples';
          typeMap.set(temple.type, { id: temple.type, label });
        }
      }
    });
    return Array.from(typeMap.values());
  }, [initialTemples]);

  const availableLocations = useMemo(() => {
    const locations = new Set<string>();
    initialTemples.forEach(t => {
      if (t.state) locations.add(t.state);
      if (t.city) locations.add(t.city);
    });
    return Array.from(locations).sort();
  }, [initialTemples]);

  const filteredTemples = useMemo(() => {
    return initialTemples.filter(temple => {
      // 1. Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = temple.name.toLowerCase().includes(query);
        const matchesCity = temple.city?.toLowerCase().includes(query) || false;
        const matchesState = temple.state?.toLowerCase().includes(query) || false;
        
        // Format type to human-readable to match against query (e.g. 'STHALA_PURANA' -> 'sthala purana temples')
        const formattedType = temple.type ? (temple.type.split('_').join(' ') + ' temples').toLowerCase() : '';
        const matchesType = formattedType.includes(query) || (temple.type?.toLowerCase().includes(query) || false);
        
        const matchesDeity = temple.deities?.some((d: any) => d.name?.toLowerCase().includes(query)) || false;

        if (!matchesName && !matchesCity && !matchesState && !matchesType && !matchesDeity) {
          return false;
        }
      }

      // 1.5. Location Dropdown filter
      if (selectedLocation !== 'All Locations') {
        if (temple.state !== selectedLocation && temple.city !== selectedLocation) {
          return false;
        }
      }

      // 2. Tab filter
      if (activeTab !== 'All Temples') {
        const tabDeity = activeTab.replace(' Temples', '');
        if (!temple.deities?.some((d: any) => d.name.includes(tabDeity))) return false;
      }

      // 3. Deity filter
      if (selectedDeities.length > 0) {
        if (!temple.deities?.some((d: any) => selectedDeities.some(sd => d.name.includes(sd)))) return false;
      }

      // 4. Type filter
      if (selectedTypes.length > 0) {
        const isMatch = selectedTypes.includes(temple.type);
        if (!isMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'Popularity') {
        return b.rating - a.rating;
      }
      if (sortBy === 'Name (A-Z)') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [initialTemples, searchQuery, selectedLocation, activeTab, selectedDeities, selectedTypes, sortBy]);

  return (
    <div className={styles.directoryPage}>
      <div className="container">
        
        {/* Breadcrumb & Header */}
        <div className={styles.headerArea}>
          <div className={styles.headerContent}>
            <div className={styles.breadcrumbs}>
              <Link href="/" className={styles.breadcrumbLink}>
                <Home size={14} className={styles.homeIcon} /> Home
              </Link>
              <ChevronRight size={14} className={styles.breadcrumbChevron} /> 
              <span className={styles.activeBreadcrumb}>Temples</span>
            </div>
            <h1 className={styles.pageTitle}>Temples of Tamil Nadu</h1>
            <p className={styles.pageSubtitle}>Explore and connect with divine temples across Tamil Nadu.</p>
          </div>
          <div className={styles.headerInfoCard}>
            <div className={styles.infoIcon}>⛩️</div>
            <p>Discover temples, learn their history and offer your prayers.</p>
          </div>
        </div>

        {/* Search & Sort Bar */}
        <div className={styles.searchBar}>
          <div className={styles.searchInputWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search temples, deities or locations..." 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.locationDropdown}>
            <MapPin size={18} />
            <select 
              className={styles.sortSelectPlain}
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="All Locations">All Locations</option>
              {availableLocations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div className={styles.sortDropdown}>
            <span>Sort by:</span>
            <select 
              className={styles.sortSelectPlain}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Popularity">Popularity</option>
              <option value="Name (A-Z)">Name (A-Z)</option>
            </select>
          </div>
          
          {/* Mobile Filter Toggle */}
          <button 
            className={styles.mobileFilterBtn}
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            Filters
          </button>
        </div>

        {/* Main Layout */}
        <div className={styles.mainLayout}>
          
          {/* Left Sidebar */}
          <aside className={`${styles.sidebar} ${isMobileFilterOpen ? styles.sidebarOpen : ''}`}>
            <div className={styles.sidebarHeader}>
              <h3 className={styles.filterTitle}>Filter Temples</h3>
            </div>

            <div className={styles.filterSection}>
              <div className={styles.filterHeader}>
                <h4>By Deity</h4>
                <ChevronDown size={16} />
              </div>
              <ul className={styles.checkboxList}>
                {availableDeities.map(deity => (
                  <li key={deity.id}>
                    <label>
                      <input 
                        type="checkbox" 
                        checked={selectedDeities.includes(deity.id)}
                        onChange={() => toggleDeity(deity.id)}
                      /> 
                      <span className={styles.deityIcon}>{deity.icon}</span> {deity.id}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.filterSection}>
              <div className={styles.filterHeader}>
                <h4>By Type</h4>
                <ChevronDown size={16} />
              </div>
              <ul className={styles.checkboxList}>
                {availableTypes.map(typeObj => (
                  <li key={typeObj.id}>
                    <label>
                      <input 
                        type="checkbox" 
                        checked={selectedTypes.includes(typeObj.id)}
                        onChange={() => toggleType(typeObj.id)}
                      /> {typeObj.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <button className={styles.resetBtn} onClick={resetFilters}>
              <RotateCcw size={14} /> Reset Filters
            </button>
          </aside>

          {/* Right Content */}
          <div className={styles.contentArea}>
            
            {/* Category Tabs */}
            <div className={styles.categoryTabs}>
              {['All Temples', ...availableDeities.map(d => `${d.id} Temples`)].map((tab) => (
                <button 
                  key={tab} 
                  className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'All Temples' && <span className={styles.tabIcon}>⊞</span>}
                  {tab !== 'All Temples' && <span className={styles.tabIcon}>🙏</span>}
                  {tab}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className={styles.grid}>
              {filteredTemples.length > 0 ? (
                filteredTemples.map((temple, idx) => {
                  return (
                    <div key={temple.id || idx} className={styles.gridItem}>
                      <TempleCard
                        slug={temple.slug}
                        title={temple.name}
                        location={`${temple.city}, ${temple.state}`}
                        imageSrc={temple.imageUrl}
                        badgeText={temple.isVerified ? 'Verified' : 'Ancient'}
                        offeringsCount={temple.reviewCount > 1000 ? `${(temple.reviewCount/1000).toFixed(1)}K+` : temple.reviewCount.toString()}
                      />
                    </div>
                  );
                })
              ) : (
                <div className={styles.noResults}>
                  <p>No temples found matching your filters.</p>
                  <button onClick={resetFilters} className={styles.resetBtnSmall}>Clear Filters</button>
                </div>
              )}
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default TemplesDirectory;
