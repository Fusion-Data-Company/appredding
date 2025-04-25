import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoError, setIsVideoError] = useState(false);

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

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('error', handleError);
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('click', handleClick);
      
      // Start playing when component mounts
      setTimeout(() => {
        videoElement.play().catch(error => {
          console.error("Error playing video:", error);
          setIsLoading(false);
        });
      }, 100);
    }

    // Cleanup event listeners
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('error', handleError);
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('click', handleClick);
      }
      
      if (freezeTimer) {
        clearTimeout(freezeTimer);
      }
    };
  }, []);

  return (
    <section className="relative flex flex-col bg-black">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
          <div className="w-16 h-16 border-t-4 border-orange-500 border-solid rounded-full animate-spin"></div>
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
            className="w-full h-auto"
            autoPlay
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/fire-water-gen4-turbo-small.mp4" type="video/mp4" />
            <source src="/videos/fire-water-gen4-turbo.mp4" type="video/mp4" />
            <source src="/videos/fire-water-hands-optimized.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Buttons below the video */}
      <div className="flex justify-center gap-6 mt-8 mb-10">
        <a 
          href="#explore" 
          className="gradient-button py-3 px-8 rounded-md text-white font-semibold tracking-wide uppercase text-lg"
        >
          Explore Applications
        </a>
        <a 
          href="#contact" 
          className="gradient-button-variant py-3 px-8 rounded-md text-white font-semibold tracking-wide uppercase text-lg"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
