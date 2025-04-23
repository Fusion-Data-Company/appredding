import { GradientButton } from "@/components/ui/gradient-button";
import { useEffect, useRef, useState } from "react";
// Import directly from assets directory for better build optimization
import fireWaterHandsVideo from "../assets_dir/videos/fire-water-hands-optimized.mp4";
import posterImage from "../assets_dir/images/fire-water-hands-poster.jpg";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Freeze on the last frame when video ends
    const handleVideoEnded = () => {
      if (videoRef.current) {
        // Do not replay - keep the last frame visible
        videoRef.current.currentTime = videoRef.current.duration - 0.01;
      }
    };

    // Handle when video can play
    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnded);
      videoElement.addEventListener('canplay', handleCanPlay);
      
      // Preload the video
      videoElement.preload = "auto";
      
      // Start playing when component mounts
      videoElement.play().catch(error => {
        console.error("Error playing video:", error);
        // If we can't autoplay, at least show the video
        setIsLoading(false);
      });
    }

    // Cleanup event listeners on unmount
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnded);
        videoElement.removeEventListener('canplay', handleCanPlay);
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
        <video 
          ref={videoRef}
          className="absolute w-full h-full object-fill min-w-full min-h-full"
          autoPlay
          muted
          playsInline
          poster={posterImage}
        >
          <source src={fireWaterHandsVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
