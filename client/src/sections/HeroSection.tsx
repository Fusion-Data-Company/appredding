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

      {/* Buttons removed as requested */}
    </section>
  );
};

export default HeroSection;
