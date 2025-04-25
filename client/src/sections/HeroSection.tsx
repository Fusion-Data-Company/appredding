import { GradientButton } from "@/components/ui/gradient-button";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoError, setIsVideoError] = useState(false);

  useEffect(() => {
    // Performance optimization - load smaller video first then show it
    let hasVideoPlayedSuccessfully = false;
    let freezeFrameTimeout: NodeJS.Timeout | null = null;

    // Enhanced method to freeze on the last frame when video ends
    const handleVideoEnded = () => {
      if (videoRef.current) {
        // Set to exactly the last frame
        videoRef.current.currentTime = videoRef.current.duration - 0.01;
        
        // Add an additional check to make sure it stays on the last frame
        // This helps prevent any potential browser behaviors that might reset the position
        freezeFrameTimeout = setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.currentTime = videoRef.current.duration - 0.01;
          }
        }, 50);
        
        // Set a flag in state to know we're on the last frame
        hasVideoPlayedSuccessfully = true;
        console.log("Video ended and paused on last frame");
      }
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

    // Handle seeking to keep video on the last frame if needed
    const handleSeeking = () => {
      if (hasVideoPlayedSuccessfully && videoRef.current) {
        // If we've already played the video and it's seeking,
        // make sure it stays at the end
        videoRef.current.currentTime = videoRef.current.duration - 0.01;
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnded);
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('error', handleError);
      videoElement.addEventListener('seeking', handleSeeking);
      
      // Enhanced video loading performance
      videoElement.playsInline = true;
      videoElement.muted = true;
      videoElement.preload = "auto";
      videoElement.loop = false; // Ensure loop is disabled
      
      // Set normal playback rate for the new video
      videoElement.playbackRate = 1.0;
      
      // Start playing when component mounts
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
        videoElement.removeEventListener('seeking', handleSeeking);
      }
      
      if (freezeFrameTimeout) {
        clearTimeout(freezeFrameTimeout);
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
            className="absolute w-[140%] h-[95%] bg-contain bg-no-repeat bg-center mx-auto left-0 right-0 top-0 bottom-0 transform scale-100"
            style={{ backgroundImage: "url('/images/fire-water-gen4-turbo-poster.jpg')" }}
          />
        ) : (
          <video 
            ref={videoRef}
            className="absolute w-[140%] h-[95%] object-contain transform scale-100 mx-auto my-auto left-0 right-0 top-0 bottom-0"
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
