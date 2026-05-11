"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

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
          <li><Link href="/temples" className={isActive('/temples') ? styles.active : ''}>{t.navbar.temples}</Link></li>
          <li><Link href="/offerings" className={isActive('/offerings') ? styles.active : ''}>{t.navbar.offerings}</Link></li>
          <li><a href="#">Astrology</a></li>
          <li><a href="#">Iyer Connect</a></li>
          <li><a href="#">Virathangal</a></li>
          <li><a href="#">Online Store</a></li>
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
