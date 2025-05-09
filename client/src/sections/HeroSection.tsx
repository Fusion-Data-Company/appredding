import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoError, setIsVideoError] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);

  // Preload the poster image
  useEffect(() => {
    const img = new Image();
    img.src = '/images/fire-water-gen4-turbo-poster.jpg';
    img.onload = () => setPosterLoaded(true);
  }, []);

  useEffect(() => {
    // Timer to freeze the video after 3.3 seconds
    let freezeTimer: NodeJS.Timeout | null = null;
    let hasVideoFrozen = false;

    // Function to pause and freeze the video
    const freezeVideoAt3Seconds = () => {
      if (videoRef.current && !hasVideoFrozen) {
        videoRef.current.pause();
        hasVideoFrozen = true;
        console.log("Video paused at 3.3 seconds");
      }
    };

    // Handle when video can play
    const handleCanPlay = () => {
      setIsLoading(false);
      
      // Once the video can play, set a timer to freeze it
      if (videoRef.current && !hasVideoFrozen) {
        freezeTimer = setTimeout(freezeVideoAt3Seconds, 3300); // 3.3 seconds
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
      if (videoRef.current && videoRef.current.currentTime >= 3.3 && !hasVideoFrozen) {
        freezeVideoAt3Seconds();
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

    // If loading takes too long, show content anyway after timeout
    const loadingTimeoutId = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        console.warn("Loading timeout reached, showing content anyway");
      }
    }, 2000); // 2 seconds timeout

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('error', handleError);
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('click', handleClick);
      
      // Start playing when component mounts with a shorter delay
      const playTimeoutId = setTimeout(() => {
        videoElement.play().catch(error => {
          console.error("Error playing video:", error);
          setIsLoading(false);
          setIsVideoError(true);
        });
      }, 50);
      
      // Cleanup event listeners and timeouts
      return () => {
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('error', handleError);
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('click', handleClick);
        
        clearTimeout(loadingTimeoutId);
        clearTimeout(playTimeoutId);
        if (freezeTimer) clearTimeout(freezeTimer);
      };
    }
    
    return () => {
      clearTimeout(loadingTimeoutId);
      if (freezeTimer) clearTimeout(freezeTimer);
    };
  }, []);

  return (
    <section className="relative flex flex-col bg-black">
      {/* Loading indicator with better UI */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20">
          <div className="w-16 h-16 border-t-4 border-orange-500 border-solid rounded-full animate-spin mb-3"></div>
          <p className="text-white/80 text-sm">Loading video...</p>
        </div>
      )}

      {/* Simple video container with natural dimensions */}
      <div className="w-full">
        {isVideoError ? (
          <img 
            src="/images/fire-water-gen4-turbo-poster.jpg" 
            alt="Fire and Water" 
            className="w-full h-auto"
          />
        ) : (
          <video 
            ref={videoRef}
            className="w-full h-auto will-change-contents"
            autoPlay
            muted
            playsInline
            poster="/images/fire-water-gen4-turbo-poster.jpg"
            preload="metadata"
          >
            {/* Smallest file first for faster loading */}
            <source src="/videos/fire-water-gen4-turbo-small.mp4" type="video/mp4" />
            <source src="/videos/fire-water-hands-optimized.mp4" type="video/mp4" />
            <source src="/videos/fire-water-gen4-turbo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Buttons below the video with smoother animations */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8 mb-10 animate-fadeIn" style={{animationDuration: '0.5s'}}>
        <a 
          href="#explore" 
          className="gradient-button py-3 px-8 rounded-md text-white font-semibold tracking-wide uppercase text-lg will-change-transform transition-transform duration-300 hover:scale-105"
        >
          Explore Applications
        </a>
        <a 
          href="#contact" 
          className="gradient-button-variant py-3 px-8 rounded-md text-white font-semibold tracking-wide uppercase text-lg will-change-transform transition-transform duration-300 hover:scale-105"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
