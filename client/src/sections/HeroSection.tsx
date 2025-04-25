import { GradientButton } from "@/components/ui/gradient-button";
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
    <section className="relative bg-black h-[85vh] flex flex-col items-center justify-end pb-10 overflow-hidden">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="w-16 h-16 border-t-4 border-orange-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Video background */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 to-black">
        {isVideoError ? (
          <div 
            className="absolute w-[160%] h-[95%] bg-contain bg-no-repeat bg-center mx-auto left-0 right-0 top-0 bottom-0 transform scale-100"
            style={{ backgroundImage: "url('/images/fire-water-gen4-turbo-poster.jpg')" }}
          />
        ) : (
          <video 
            ref={videoRef}
            className="absolute w-[160%] h-[95%] object-contain transform scale-100 mx-auto my-auto left-0 right-0 top-0 bottom-0"
            autoPlay
            muted
            playsInline
            poster="/images/fire-water-gen4-turbo-poster.jpg"
            preload="auto"
          >
            {/* Smaller Gen-4 Turbo video (better memory efficiency) - try this first */}
            <source src="/videos/fire-water-gen4-turbo-small.mp4" type="video/mp4" />
            {/* Medium quality Gen-4 Turbo video */}
            <source src="/videos/fire-water-gen4-turbo.mp4" type="video/mp4" />
            {/* 4K version - highest quality but larger file size */}
            <source src="/videos/fire-water-gen4-turbo-4k.mp4" type="video/mp4" />
            {/* Original videos as final fallback */}
            <source src="/videos/fire-water-hands-optimized.mp4" type="video/mp4" />
            <source src="/videos/fire-water-hands.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
