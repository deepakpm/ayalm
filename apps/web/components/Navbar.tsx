"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

import { useLanguage } from '../context/LanguageContext';
import { configApi } from '../lib/api';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [features, setFeatures] = useState<any[]>([]);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await configApi.getHome(language.toUpperCase());
        setFeatures(data.features || []);
      } catch (err) {
        console.error('Failed to fetch navbar features', err);
      }
    };
    fetchConfig();
  }, [language]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🕉</span>
          <span className={styles.logoText}>ALAYAM</span>
        </div>
        
        <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <li><Link href="/" className={isActive('/') ? styles.active : ''}>{t.navbar.home}</Link></li>
          {features.map((feature) => (
            <li key={feature.id}>
              <Link href={feature.linkUrl} className={isActive(feature.linkUrl) ? styles.active : ''}>
                {feature.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <div className={styles.langToggle}>
            <button 
              className={language === 'en' ? styles.langActive : styles.langBtn} 
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <span className={styles.langDivider}>|</span>
            <button 
              className={language === 'ta' ? styles.langActive : styles.langBtn} 
              onClick={() => setLanguage('ta')}
            >
              தமிழ்
            </button>
          </div>
          <button className={styles.iconButton} aria-label="Search">
            <Search size={20} />
          </button>
          <button className={styles.iconButton} aria-label="User Profile">
            <User size={20} />
          </button>
          <button className={styles.menuButton} aria-label="Menu" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
