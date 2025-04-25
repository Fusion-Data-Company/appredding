import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoError, setIsVideoError] = useState(false);

  useEffect(() => {
    // We'll have a timer to freeze the video after 3.3 seconds
    let freezeTimer: NodeJS.Timeout | null = null;
    let hasVideoFrozen = false;

    // Function to pause and freeze the video
    const freezeVideoAt3Seconds = () => {
      if (videoRef.current && !hasVideoFrozen) {
        // Pause the video at exactly 3.3 seconds
        videoRef.current.pause();
        hasVideoFrozen = true;
        console.log("Video paused at 3.3 seconds");
      }
    };

    // Handle when video can play
    const handleCanPlay = () => {
      setIsLoading(false);
      
      // Once the video can play, set a timer to freeze it after 3.3 seconds
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

    // Also handle timeupdate events to make sure we freeze at the right time
    const handleTimeUpdate = () => {
      if (videoRef.current && videoRef.current.currentTime >= 3.3 && !hasVideoFrozen) {
        freezeVideoAt3Seconds();
      }
    };

    // Prevent playing again if user clicks on the video
    const handleClick = (e: Event) => {
      if (hasVideoFrozen) {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.pause(); // Make sure it stays paused
        }
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('error', handleError);
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('click', handleClick);
      
      // Enhanced video loading performance
      videoElement.playsInline = true;
      videoElement.muted = true;
      videoElement.preload = "auto";
      videoElement.loop = false; // Ensure loop is disabled
      
      // Set normal playback rate for the new video
      videoElement.playbackRate = 1.0;
      
      // Start playing when component mounts
      setTimeout(() => {
        if (!hasVideoFrozen) {
          videoElement.play().catch(error => {
            console.error("Error playing video:", error);
            setIsLoading(false);
          });
        }
      }, 100);
    }

    // Cleanup event listeners on unmount
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
    <section className="relative h-[85vh] flex flex-col items-center justify-end pb-10 overflow-hidden">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="w-16 h-16 border-t-4 border-orange-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}

      {/* Fire-water diamond plate background as direct HTML */}
      <div 
        className="absolute top-0 left-0 w-full h-full" 
        style={{ 
          backgroundImage: "url('/images/optimized/diamond-plate-fire-water.jpg')", 
          backgroundSize: "cover" 
        }}
      ></div>
      
      {/* Video container (back to original size) */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {isVideoError ? (
          <img 
            src="/images/fire-water-gen4-turbo-poster.jpg" 
            alt="Fire and Water" 
            className="w-[160%] h-[95%] object-contain" 
          />
        ) : (
          <video 
            ref={videoRef}
            className="w-[160%] h-[95%] object-contain"
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
    </section>
  );
};

export default HeroSection;
