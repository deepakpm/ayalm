"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, MapPin, ChevronDown, ChevronRight, RotateCcw, X, Home } from 'lucide-react';
import { TempleCard } from '@repo/ui/temple-card';
import styles from './TemplesDirectory.module.css';

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

const CATEGORY_TABS = ['All Temples', 'Shiva Temples', 'Vishnu Temples', 'Amman Temples', 'Murugan Temples'];

const DEITIES = [
  { id: 'Shiva', icon: '🕉️' },
  { id: 'Vishnu', icon: '🪔' },
  { id: 'Amman', icon: '🌸' },
  { id: 'Murugan', icon: '🦚' },
  { id: 'Ganesha', icon: '🐘' },
  { id: 'Navagraha', icon: '☀️' },
];

const TYPES = ['Ancient Temples', 'Popular Temples', 'Parihara Temples', 'Sthala Purana Temples'];

const TemplesDirectory = () => {
  const [activeTab, setActiveTab] = useState('All Temples');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
    setSelectedDeities([]);
    setSelectedTypes([]);
    setActiveTab('All Temples');
  };

  const filteredTemples = useMemo(() => {
    return MOCK_TEMPLES.filter(temple => {
      // 1. Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!temple.title.toLowerCase().includes(query) && !temple.location.toLowerCase().includes(query)) {
          return false;
        }
      }

      // 2. Tab filter
      if (activeTab !== 'All Temples') {
        const tabDeity = activeTab.replace(' Temples', '');
        if (temple.deity !== tabDeity) return false;
      }

      // 3. Checkbox Deities filter
      if (selectedDeities.length > 0 && !selectedDeities.includes(temple.deity)) {
        return false;
      }

      // 4. Checkbox Types filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(temple.type)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'Popularity') {
        return b.popularity - a.popularity;
      }
      if (sortBy === 'Name (A-Z)') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [searchQuery, activeTab, selectedDeities, selectedTypes, sortBy]);

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
            <span>All Tamil Nadu</span>
            <ChevronDown size={16} />
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
                {DEITIES.map(deity => (
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
                {TYPES.map(type => (
                  <li key={type}>
                    <label>
                      <input 
                        type="checkbox" 
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                      /> {type}
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
              {CATEGORY_TABS.map((tab) => (
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
                  const slug = temple.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                  return (
                    <Link href={`/temples/${slug}`} key={idx} className={styles.gridItemLink} style={{textDecoration: 'none', display: 'flex', flexDirection: 'column'}}>
                      <div className={styles.gridItem}>
                        <TempleCard
                          title={temple.title}
                          location={temple.location}
                          imageSrc={temple.imageSrc}
                          badgeText={temple.badgeText}
                          offeringsCount={temple.offeringsCount}
                        />
                      </div>
                    </Link>
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
