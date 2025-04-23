import { GradientButton } from "@/components/ui/gradient-button";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure smooth looping by handling the 'ended' event
    const handleVideoEnded = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.error("Error playing video:", error);
        });
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnded);
      
      // Start playing when component mounts
      videoElement.play().catch(error => {
        console.error("Error playing video:", error);
      });
    }

    // Cleanup event listener on unmount
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnded);
      }
    };
  }, []);

  return (
    <section className="relative bg-black h-[85vh] flex flex-col items-center justify-end pb-10 overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
        <video 
          ref={videoRef}
          className="absolute w-full h-full object-fill min-w-full min-h-full"
          autoPlay
          muted
          playsInline
          loop
        >
          <source src="/videos/fire-water-hands.mp4" type="video/mp4" />
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
