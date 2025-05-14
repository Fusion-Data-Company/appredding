import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Info, Star } from "lucide-react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { GradientButton } from "@/components/ui/gradient-button";
// Import the video from assets_dir
import productDemoVideo from "../assets_dir/videos/product-demo.mp4";
// Import the hero image to use as background
import { PRAETORIAN_HERO_IMAGE } from "../assets_dir/imageExports";

interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  duration: string;
}

interface VideoSectionProps {
  videos: Video[];
}

const VideoSection = ({ videos }: VideoSectionProps) => {
  const [activeCategory, setActiveCategory] = useState("all");
  // Set the local video as active by default if it exists
  const localVideo = videos.find(video => video.id === "localVideo");
  const [activeVideo, setActiveVideo] = useState<Video | null>(localVideo || (videos.length > 0 ? videos[0] : null));
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Try to load the video when the component mounts
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  const categories = [
    "all",
    ...Array.from(new Set(videos.map((video) => video.category))),
  ];

  const filteredVideos = activeCategory === "all" 
    ? videos 
    : videos.filter((video) => video.category === activeCategory);

  return (
    <section 
      className="py-20 relative" 
      id="videos"
      style={{ 
        backgroundImage: `url(${PRAETORIAN_HERO_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center center", // Standardized position
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", // This creates the parallax effect
        backgroundColor: "#111111",
        position: "relative", 
        zIndex: 0
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/50" style={{ zIndex: 1 }}></div>
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-16">
          <div className="dark:bg-gray-800/60 bg-gray-100/90 backdrop-blur-xl rounded-xl dark:border dark:border-gray-600/40 border border-gray-300 dark:shadow-[0_0_20px_rgba(255,255,255,0.25)] shadow-[0_0_20px_rgba(0,0,0,0.25)] py-8 px-6 md:px-10 mx-auto max-w-3xl mb-8 inline-block">
            <GradientHeading level={2} className="text-4xl mb-4" variant="mixed">Video Demonstrations</GradientHeading>
            <p className="text-lg dark:text-gray-300 text-gray-700">
              Watch our experts demonstrate application techniques and showcase<br />
              the superior performance of our protective coatings.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            {activeVideo ? (
              <div className="dark:bg-gradient-to-r dark:from-gray-800/90 dark:to-gray-700/90 bg-gray-100/90 rounded-xl overflow-hidden border-0 premium-gradient-border dark:shadow-[0_0_20px_rgba(255,255,255,0.25)] shadow-[0_0_20px_rgba(0,0,0,0.25)]">
                <div className="relative pb-[56.25%] h-0 overflow-hidden">
                  {activeVideo.id === "localVideo" ? (
                    <div className="absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center">
                      <video 
                        ref={videoRef}
                        className="w-full h-full object-contain"
                        src={productDemoVideo}
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        onLoadedData={() => console.log("Video loaded successfully")}
                        onError={(e) => console.error("Video error:", e)}
                      ></video>
                    </div>
                  ) : (
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${activeVideo.id}`}
                      title={activeVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
                <div className="p-6">
                  <GradientHeading level={3} className="text-xl mb-2" variant="fire">{activeVideo.title}</GradientHeading>
                  <p className="dark:text-gray-300 text-gray-700 mb-4">{activeVideo.description}</p>
                  <div className="flex flex-wrap items-center justify-between">
                    <span className="dark:bg-primary-800 dark:text-primary-300 bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium border dark:border-gray-600/40 border-gray-300">
                      {activeVideo.category}
                    </span>
                    <span className="dark:text-gray-400 text-gray-500 text-sm">
                      <i className="fas fa-clock mr-1"></i> {activeVideo.duration}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="dark:bg-gradient-to-r dark:from-gray-800/90 dark:to-gray-700/90 bg-gray-100/90 rounded-xl border-0 premium-gradient-border dark:shadow-[0_0_20px_rgba(255,255,255,0.25)] shadow-[0_0_20px_rgba(0,0,0,0.25)] p-8 flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full dark:bg-primary-800 bg-gray-200 mb-4">
                    <Play className="h-8 w-8 dark:text-primary-500 text-primary-600" />
                  </div>
                  <GradientHeading level={3} className="text-xl mb-2" variant="blue">No Videos Available</GradientHeading>
                  <p className="dark:text-gray-400 text-gray-500 max-w-md">
                    Please check back later for video demonstrations.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="dark:bg-gradient-to-r dark:from-gray-800/90 dark:to-gray-700/90 bg-gray-100/90 rounded-xl border-0 premium-gradient-border dark:shadow-[0_0_20px_rgba(255,255,255,0.25)] shadow-[0_0_20px_rgba(0,0,0,0.25)] p-6">
              <GradientHeading level={3} className="text-xl mb-4 pb-3 dark:border-b dark:border-gray-600/40 border-b border-gray-300" variant="mixed">
                Video Library
              </GradientHeading>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={activeCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(category)}
                      className="capitalize"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredVideos.length > 0 ? (
                  filteredVideos.map((video) => (
                    <div
                      key={video.id}
                      className={`flex flex-col gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        activeVideo?.id === video.id
                          ? "dark:bg-gray-700/80 bg-gray-200/90"
                          : "dark:bg-gray-800/60 dark:hover:bg-gray-700/70 bg-gray-100/90 hover:bg-gray-200/80"
                      }`}
                      onClick={() => setActiveVideo(video)}
                    >
                      <div className="relative flex-shrink-0 w-[200px] h-[95px] bg-gray-800 rounded-md overflow-hidden mx-auto">
                        {video.id === "localVideo" ? (
                          <div className="w-full h-full bg-gradient-to-br from-primary-900 to-primary-700 flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="absolute top-2 left-2 bg-primary-600 text-white text-[10px] px-2 py-0.5 rounded-sm">Premium</div>
                            <div className="text-white text-xs font-semibold">Coating Application</div>
                            <div className="text-primary-300 text-[10px]">3:58 • Application</div>
                          </div>
                        ) : (
                          <img
                            src={video.thumbnail || `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-10 transition-all">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-grow min-w-0 text-center">
                        <h4 className="font-medium text-sm mb-1 line-clamp-2">{video.title}</h4>
                        <div className="flex items-center justify-center text-xs text-gray-400">
                          <span>{video.duration}</span>
                          <span className="mx-1">•</span>
                          <span className="capitalize">{video.category}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 dark:bg-gray-800/60 bg-gray-100/90 rounded-lg border-0 premium-gradient-border shadow-[0_0_15px_rgba(0,0,0,0.15)]">
                    <Info className="h-8 w-8 dark:text-gray-500 text-gray-500 mx-auto mb-2" />
                    <p className="dark:text-gray-400 text-gray-600">No videos in this category</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 dark:border-t dark:border-gray-600/40 border-t border-gray-300">
                <Button variant="outline" className="w-full">
                  <i className="fab fa-youtube mr-2 text-red-500"></i> Visit Our YouTube Channel
                </Button>
              </div>
            </div>

            <div className="dark:bg-gradient-to-r dark:from-gray-800/90 dark:to-gray-700/90 bg-gray-100/90 rounded-xl border-0 premium-gradient-border dark:shadow-[0_0_20px_rgba(255,255,255,0.25)] shadow-[0_0_20px_rgba(0,0,0,0.25)] p-6 mt-6">
              <div className="flex items-start">
                <div className="mr-4">
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
                <div>
                  <GradientHeading level={4} className="text-lg mb-2" variant="fire">Request Custom Demonstration</GradientHeading>
                  <p className="dark:text-gray-300 text-gray-700 text-sm mb-4">
                    Need to see a specific application technique? Request a personalized video demonstration from our experts.
                  </p>
                  <GradientButton size="sm">Request Demo</GradientButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;