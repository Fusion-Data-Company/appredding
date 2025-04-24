import { GradientButton } from "@/components/ui/gradient-button";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoError, setIsVideoError] = useState(false);

  useEffect(() => {
    // Performance optimization - load smaller video first then show it
    let hasVideoPlayedSuccessfully = false;

    // Freeze on the last frame when video ends
    const handleVideoEnded = () => {
      if (videoRef.current) {
        // Do not replay - keep the last frame visible
        videoRef.current.currentTime = videoRef.current.duration - 0.01;
      }
      hasVideoPlayedSuccessfully = true;
    };

    // Handle when video can play
    const handleCanPlay = () => {
      setIsLoading(false);
    };

    // Handle video loading error
    const handleError = () => {
      console.error("Video loading error");
      setIsVideoError(true);
      setIsLoading(false);
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnded);
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('error', handleError);
      
      // Enhance video loading performance
      videoElement.playsInline = true;
      videoElement.muted = true;
      videoElement.preload = "auto";
      
      // Set low playback rate initially to prevent skipping
      videoElement.playbackRate = 0.9;
      
      // Start playing when component mounts with low priority
      setTimeout(() => {
        if (!hasVideoPlayedSuccessfully) {
          videoElement.play().catch(error => {
            console.error("Error playing video:", error);
            // If we can't autoplay, at least show the poster
            setIsLoading(false);
          });
        }
      }, 100);
    }

    // Cleanup event listeners on unmount
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnded);
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('error', handleError);
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
      <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
        {isVideoError ? (
          <div 
            className="absolute w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/images/fire-water-hands-poster.jpg')" }}
          />
        ) : (
          <video 
            ref={videoRef}
            className="absolute w-full h-full object-cover min-w-full min-h-full"
            autoPlay
            muted
            playsInline
            poster="/images/fire-water-hands-poster.jpg"
            preload="auto"
          >
            {/* MP4 (smaller file) for faster initial loading */}
            <source src="/videos/fire-water-hands-optimized.mp4" type="video/mp4" />
            {/* WebM as fallback */}
            <source src="/videos/fire-water-hands.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      
      {/* Buttons */}
      <div className="z-10">
        <div className="space-x-4">
          <a 
            href="#applications" 
            className="inline-block"
          >
            <GradientButton>
              Explore Applications
            </GradientButton>
          </a>
          <a 
            href="#contact" 
            className="inline-block"
          >
            <GradientButton variant="variant">
              Contact Us
            </GradientButton>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
