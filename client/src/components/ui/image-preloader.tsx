import { useEffect, useState } from 'react';

interface ImagePreloaderProps {
  imageUrls: string[];
  children: React.ReactNode;
  altTexts?: string[]; // Optional array of alt texts for accessibility
  lazyLoadBelowFold?: boolean; // Option to lazy-load non-critical images
}

/**
 * Component that preloads images before rendering content
 * to prevent visual jumps during page load
 * 
 * Enhanced with accessibility support and lazy loading options
 */
export function ImagePreloader({ imageUrls, altTexts, lazyLoadBelowFold = false, children }: ImagePreloaderProps) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setImagesLoaded(true);
      return;
    }
    
    let loadedCount = 0;
    const totalImages = imageUrls.length;
    
    // Identify critical (above-fold) images that need preloading
    const criticalImages = lazyLoadBelowFold 
      ? imageUrls.slice(0, Math.ceil(imageUrls.length * 0.5)) // Preload top 50% if lazy loading enabled
      : imageUrls;
    
    // Preload critical images
    criticalImages.forEach((url, index) => {
      // Skip invalid URLs or empty strings
      if (!url || url.trim() === '') {
        loadedCount++;
        if (loadedCount === criticalImages.length) {
          setImagesLoaded(true);
        }
        return;
      }
      
      const img = new Image();
      
      // Add alt text if available
      if (altTexts && altTexts[index]) {
        img.alt = altTexts[index];
      }
      
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === criticalImages.length) {
          console.log('✅ All critical images preloaded successfully');
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        console.warn(`⚠️ Failed to preload image: ${url}`);
        loadedCount++;
        if (loadedCount === criticalImages.length) {
          console.warn('⚠️ Some critical images failed to preload');
          setImagesLoaded(true);
        }
      };
    });
    
    // Set a timeout to display content even if images don't all load
    const timeout = setTimeout(() => {
      if (!imagesLoaded) {
        console.warn('Some images taking too long to load, showing content anyway');
        setImagesLoaded(true);
      }
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [imageUrls, altTexts, lazyLoadBelowFold]);

  if (!imagesLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-orange-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}