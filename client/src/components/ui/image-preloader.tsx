import { useEffect, useState } from 'react';

interface ImagePreloaderProps {
  imageUrls: string[];
  children: React.ReactNode;
}

/**
 * Component that preloads images before rendering content
 * to prevent visual jumps during page load
 */
export function ImagePreloader({ imageUrls, children }: ImagePreloaderProps) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setImagesLoaded(true);
      return;
    }
    
    let loadedCount = 0;
    const totalImages = imageUrls.length;
    
    // Create image objects to track loading
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        console.warn(`Failed to preload image: ${url}`);
        if (loadedCount === totalImages) {
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
  }, [imageUrls]);

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