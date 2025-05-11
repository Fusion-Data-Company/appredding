import { useEffect, useState } from 'react';

interface ImagePreloaderProps {
  imageUrls: string[];
  children: React.ReactNode;
  timeout?: number;
}

/**
 * Component that efficiently preloads critical images before rendering content
 * Improved with optimized loading strategy and multiple format support
 */
export function ImagePreloader({ 
  imageUrls, 
  children,
  timeout = 2000 // Shorter timeout for better user experience
}: ImagePreloaderProps) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setImagesLoaded(true);
      return;
    }
    
    // Start the content display timer immediately
    const timeoutId = setTimeout(() => {
      if (!imagesLoaded) {
        console.warn('⚠️ Some critical images failed to preload');
        setImagesLoaded(true);
      }
    }, timeout);
    
    // Track only critical images (first few)
    const criticalImages = imageUrls.slice(0, 3); // Only preload the most important images
    let loadedCount = 0;
    const totalCriticalImages = criticalImages.length;
    
    // For each image URL, try to preload the most efficient format first
    criticalImages.forEach(url => {
      const baseUrl = url.substring(0, url.lastIndexOf('.')) || url;
      const img = new Image();
      
      // Set up handlers before setting src
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalCriticalImages) {
          clearTimeout(timeoutId);
          setImagesLoaded(true);
        }
      };
      
      img.onerror = () => {
        // If modern format fails, fall back to original
        const fallbackImg = new Image();
        fallbackImg.onload = img.onload; // Reuse the same handler
        fallbackImg.onerror = () => {
          // Count it anyway even if it fails
          loadedCount++;
          if (loadedCount === totalCriticalImages) {
            clearTimeout(timeoutId);
            setImagesLoaded(true);
          }
        };
        
        // Try the original format as fallback
        fallbackImg.src = url;
      };
      
      // First try WebP if supported by most browsers
      const optimizedUrl = `${baseUrl}.webp`;
      // Use fetchpriority attribute for the most critical images
      img.setAttribute('fetchpriority', 'high');
      img.src = optimizedUrl;
    });
    
    return () => clearTimeout(timeoutId);
  }, [imageUrls, timeout]);

  if (!imagesLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black/80 backdrop-blur-sm">
        <div className="text-center px-6 py-8 bg-black/60 rounded-xl border border-gray-700 shadow-2xl">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 border-t-4 border-b-4 border-orange-500 border-solid rounded-full animate-spin"></div>
            <div className="absolute inset-0 border-l-4 border-r-4 border-blue-500 border-solid rounded-full animate-spin animation-delay-500"></div>
          </div>
          <p className="text-gray-200 font-medium">Loading premium content...</p>
          <p className="text-gray-400 text-sm mt-2">Optimizing your experience</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}