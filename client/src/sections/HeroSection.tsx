import { LazyVideo } from "@/components/ui/lazy-video";

const HeroSection = () => {
  const videoSources = [
    // Smallest file first for fastest loading
    { src: "/videos/fire-water-gen4-turbo-small.mp4", type: "video/mp4" },
    { src: "/videos/fire-water-hands-optimized.mp4", type: "video/mp4" },
    { src: "/videos/fire-water-gen4-turbo.mp4", type: "video/mp4" }
  ];

  return (
    <section className="relative flex flex-col bg-black">
      {/* Optimized video with lazy loading and performance enhancements */}
      <LazyVideo 
        sources={videoSources}
        poster="/images/fire-water-gen4-turbo-poster.jpg"
        freezeAt={3.3}
        className="h-auto"
      />

      {/* Buttons below the video with smoother animations */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8 mb-10 animate-fadeIn" 
           style={{animationDuration: '0.6s', animationDelay: '0.3s', animationFillMode: 'both'}}>
        <a 
          href="#explore" 
          className="gradient-button py-3 px-8 rounded-md text-white font-semibold tracking-wide uppercase text-lg will-change-transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Explore Applications
        </a>
        <a 
          href="#contact" 
          className="gradient-button-variant py-3 px-8 rounded-md text-white font-semibold tracking-wide uppercase text-lg will-change-transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
