import { useRef, useState, useEffect } from "react";

interface LazyVideoProps {
  sources: Array<{
    src: string;
    type: string;
  }>;
  poster: string;
  className?: string;
  freezeAt?: number; // Time in seconds to freeze the video
}

export function LazyVideo({ 
  sources, 
  poster, 
  className = "", 
  freezeAt = 3.3 
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPosterLoaded, setIsPosterLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  
  // Preload poster image for immediate display
  useEffect(() => {
    const img = new Image();
    img.src = poster;
    img.onload = () => setIsPosterLoaded(true);
    
    // Fallback if poster doesn't load in reasonable time
    const timeoutId = setTimeout(() => {
      if (!isPosterLoaded) {
        console.warn("Poster image taking too long to load");
        setIsPosterLoaded(true);
      }
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [poster]);

  useEffect(() => {
    let freezeTimer: NodeJS.Timeout | null = null;
    let hasVideoFrozen = false;
    let loadingTimeoutId: NodeJS.Timeout | null = null;
    let playTimeoutId: NodeJS.Timeout | null = null;

    // Function to pause video at specified time
    const freezeVideoAt = () => {
      if (videoRef.current && !hasVideoFrozen) {
        videoRef.current.pause();
        hasVideoFrozen = true;
      }
    };

    // Handle video can play event
    const handleCanPlay = () => {
      setIsLoading(false);
      
      // Set timer to freeze video
      if (videoRef.current && !hasVideoFrozen) {
        freezeTimer = setTimeout(freezeVideoAt, freezeAt * 1000);
      }
    };

    // Handle video loading error
    const handleError = () => {
      console.error("Video loading error");
      setIsVideoError(true);
      setIsLoading(false);
    };

    // Backup timeupdate check
    const handleTimeUpdate = () => {
      if (videoRef.current && videoRef.current.currentTime >= freezeAt && !hasVideoFrozen) {
        freezeVideoAt();
      }
    };

    // Prevent playing again if user clicks
    const handleClick = (e: Event) => {
      if (hasVideoFrozen) {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }
    };

    // Don't block UI if video takes too long to load
    loadingTimeoutId = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        console.warn("Loading timeout reached, showing content anyway");
      }
    }, 2000);

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('error', handleError);
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('click', handleClick);
      
      // Start playing with minimal delay
      playTimeoutId = setTimeout(() => {
        videoElement.play().catch(error => {
          console.error("Error playing video:", error);
          setIsLoading(false);
          setIsVideoError(true);
        });
      }, 50);
    }

    // Cleanup function to remove event listeners and timeouts
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('error', handleError);
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('click', handleClick);
      }
      
      if (freezeTimer) clearTimeout(freezeTimer);
      if (loadingTimeoutId) clearTimeout(loadingTimeoutId);
      if (playTimeoutId) clearTimeout(playTimeoutId);
    };
  }, [freezeAt]);

  if (isVideoError) {
    return (
      <img 
        src={poster} 
        alt="Video fallback" 
        className={className}
      />
    );
  }

  return (
    <div className="relative w-full">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20">
          <div className="w-14 h-14 border-t-4 border-orange-500 border-solid rounded-full animate-spin mb-3"></div>
          <p className="text-white/80 text-sm">Loading video...</p>
        </div>
      )}

      <video 
        ref={videoRef}
        className={`w-full ${className} will-change-contents`}
        poster={poster}
        muted
        playsInline
        preload="metadata"
      >
        {sources.map((source, index) => (
          <source key={index} src={source.src} type={source.type} />
        ))}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default LazyVideo;