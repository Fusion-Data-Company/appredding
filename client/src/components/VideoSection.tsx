import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Info, Star } from "lucide-react";
import { GradientHeading } from "@/components/ui/gradient-heading";

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
  const [activeVideo, setActiveVideo] = useState<Video | null>(videos.length > 0 ? videos[0] : null);

  const categories = [
    "all",
    ...Array.from(new Set(videos.map((video) => video.category))),
  ];

  const filteredVideos = activeCategory === "all" 
    ? videos 
    : videos.filter((video) => video.category === activeCategory);

  return (
    <section className="py-24 bg-primary-900" id="videos">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <GradientHeading level={2} className="text-4xl mb-4" variant="mixed">Video Demonstrations</GradientHeading>
          <p className="text-lg text-gray-300">
            Watch our experts demonstrate application techniques and showcase the superior performance of our protective coatings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            {activeVideo ? (
              <div className="bg-primary-950 rounded-xl overflow-hidden border border-primary-800">
                <div className="relative pb-[56.25%] h-0 overflow-hidden">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${activeVideo.id}`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <GradientHeading level={3} className="text-xl mb-2" variant="fire">{activeVideo.title}</GradientHeading>
                  <p className="text-gray-300 mb-4">{activeVideo.description}</p>
                  <div className="flex flex-wrap items-center justify-between">
                    <span className="bg-primary-800 text-primary-300 px-3 py-1 rounded-full text-sm font-medium">
                      {activeVideo.category}
                    </span>
                    <span className="text-gray-400 text-sm">
                      <i className="fas fa-clock mr-1"></i> {activeVideo.duration}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-primary-950 rounded-xl border border-primary-800 p-8 flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-800 mb-4">
                    <Play className="h-8 w-8 text-primary-500" />
                  </div>
                  <GradientHeading level={3} className="text-xl mb-2" variant="blue">No Videos Available</GradientHeading>
                  <p className="text-gray-400 max-w-md">
                    Please check back later for video demonstrations.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-primary-950 rounded-xl border border-primary-800 p-6">
              <GradientHeading level={3} className="text-xl mb-4 pb-3 border-b border-primary-800" variant="mixed">
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
                      className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        activeVideo?.id === video.id
                          ? "bg-primary-700"
                          : "bg-primary-800 hover:bg-primary-700"
                      }`}
                      onClick={() => setActiveVideo(video)}
                    >
                      <div className="relative flex-shrink-0 w-20 h-20 bg-primary-900 rounded-md overflow-hidden">
                        <img
                          src={video.thumbnail || `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-10 transition-all">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="font-medium text-sm mb-1 line-clamp-2">{video.title}</h4>
                        <div className="flex items-center text-xs text-gray-400">
                          <span>{video.duration}</span>
                          <span className="mx-1">•</span>
                          <span className="capitalize">{video.category}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 bg-primary-800/30 rounded-lg">
                    <Info className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400">No videos in this category</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-primary-800">
                <Button variant="outline" className="w-full">
                  <i className="fab fa-youtube mr-2 text-red-500"></i> Visit Our YouTube Channel
                </Button>
              </div>
            </div>

            <div className="bg-primary-950 rounded-xl border border-primary-800 p-6 mt-6">
              <div className="flex items-start">
                <div className="mr-4">
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
                <div>
                  <GradientHeading level={4} className="text-lg mb-2" variant="fire">Request Custom Demonstration</GradientHeading>
                  <p className="text-gray-300 text-sm mb-4">
                    Need to see a specific application technique? Request a personalized video demonstration from our experts.
                  </p>
                  <Button size="sm">Request Demo</Button>
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