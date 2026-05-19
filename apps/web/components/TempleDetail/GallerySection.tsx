"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import styles from './Sections.module.css';

const GALLERY_IMAGES = [
  '/images/temple_meenakshi.png',
  '/images/temple_arunachaleswarar.png',
  '/images/temple_ranganathaswamy.png',
  '/images/temple_brihadeeswarar.png',
  '/images/temple_kapaleeswarar.png',
  '/images/gopuram_side.png'
];

interface GallerySectionProps {
  gallery?: any[];
}

const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const displayImages = gallery && gallery.length > 0 
    ? gallery.map(item => item.imageUrl) 
    : GALLERY_IMAGES;

  return (
    <>
      <section className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Gallery</h2>
        </div>

        <div className={styles.galleryGrid}>
          {displayImages.map((img, idx) => (
            <div key={idx} className={styles.galleryItem} onClick={() => setSelectedImage(img)}>
              <Image 
                src={img} 
                alt={`Gallery Image ${idx + 1}`} 
                fill 
                style={{ objectFit: 'cover' }} 
                className={styles.galleryImage}
              />
            </div>
          ))}
        </div>
      </section>
      
      {/* Lightbox Modal */}
      {selectedImage && (
        <div className={styles.lightboxOverlay} onClick={() => setSelectedImage(null)}>
          <button className={styles.lightboxCloseBtn} onClick={() => setSelectedImage(null)}>
            <X size={24} />
          </button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <Image 
              src={selectedImage} 
              alt="Preview" 
              fill 
              style={{ objectFit: 'contain' }} 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GallerySection;
