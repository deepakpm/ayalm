"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          {/* Using a placeholder text for logo to match design */}
          <span className={styles.logoIcon}>🕉</span>
          <span className={styles.logoText}>ALAYAM</span>
        </div>
        
        <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <li><Link href="/" className={isActive('/') ? styles.active : ''}>Home</Link></li>
          <li><Link href="/temples" className={isActive('/temples') ? styles.active : ''}>Temples</Link></li>
          <li><Link href="/offerings" className={isActive('/offerings') ? styles.active : ''}>Offerings</Link></li>
          <li><a href="#">Astrology</a></li>
          <li><a href="#">Iyer Connect</a></li>
          <li><a href="#">Virathangal</a></li>
          <li><a href="#">Online Store</a></li>
        </ul>

        <div className={styles.actions}>
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
