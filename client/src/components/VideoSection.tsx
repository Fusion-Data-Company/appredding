import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Info, Star } from "lucide-react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { GradientButton } from "@/components/ui/gradient-button";
// Import the video from assets_dir
import productDemoVideo from "../assets_dir/videos/product-demo.mp4";
// Import the hero image to use as background
import { PRAETORIAN_HERO_IMAGE } from "../assets_dir/imageExports";
// Import the Praetorian logo with fire background
import praetorianLogoFire from "../assets_dir/images/praetorian-logo-fire.png";

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
      className="py-24 relative" 
      id="videos"
      style={{ 
        backgroundImage: `url(${PRAETORIAN_HERO_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "#111111",
        position: "relative", 
        zIndex: 0
      }}
    >
      {/* Enhanced gradient overlay with more depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/60" style={{ zIndex: 1 }}></div>
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-orange-500/10 filter blur-[100px] animate-pulse-slow" style={{ zIndex: 1 }}></div>
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-blue-500/10 filter blur-[100px] animate-pulse-slow-delayed" style={{ zIndex: 1 }}></div>
      
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-16">
          <div className="relative group mx-auto max-w-4xl mb-10 inline-block transform transition-all duration-500">
            {/* Multiple layered background effects */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
            
            {/* Main card container */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl py-12 px-12 z-10 border border-orange-500/30 overflow-hidden group hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500">
              {/* Subtle dots and squares pattern background in burnt orange - increased opacity for visibility */}
              <div className="absolute inset-0 opacity-25 z-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjQ5LDExNSwyMiwwLjQpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
              </div>
              
              {/* Ambient glow effect - positioned away from text */}
              <div className="absolute -top-60 -right-40 w-80 h-80 bg-orange-600/15 rounded-full filter blur-[100px] animate-pulse-slow-delayed"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
              
              {/* Corner accent with gradient - top-right corner only */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20 z-10">
                <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/40 to-blue-500/40 rounded-tr-xl blur-[2px]"></div>
              </div>
              
              {/* Additional corner accent lines */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500/70 rounded-tr-lg"></div>
                <div className="absolute top-0 right-0 w-3 h-3 bg-red-500/50 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/70 rounded-bl-lg"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500/70 rounded-br-lg"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500/50 rounded-full blur-[2px]"></div>
              </div>
              
              {/* Badge removed per user request */}
              
              {/* Shimmer heading */}
              <div className="relative z-10 mb-8 px-6 py-2 overflow-hidden">
                {/* Animated glow behind text */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-blue-500/20 to-orange-600/10 opacity-50 blur-xl animate-pulse-slow"></div>
                
                {/* Heading with enhanced enterprise styling and shadows */}
                <div className="shimmer-fire-text font-bold text-5xl tracking-tight relative z-10">
                  {/* Background glow for letter definition */}
                  <div className="absolute inset-0 flex justify-center items-center text-5xl font-bold tracking-tight text-orange-900/10 blur-[5px] scale-110">
                    Video Demonstrations
                  </div>
                  
                  {/* Main text with white color - moved up 0.25 inch - reduced glow/shadow effects */}
                  <span className="relative text-white
                    drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] 
                    [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]
                    transform -translate-y-[0.25in]">
                    Video Demonstrations
                  </span>
                  
                  {/* Top glossy reflection */}
                  <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent rounded-t-lg"></div>
                </div>
                
                {/* Multiple text shadows for depth - reduced blur effects */}
                <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold tracking-tight opacity-10 blur-[3px] text-orange-700/30 -z-10 transform scale-105">
                  Video Demonstrations
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold tracking-tight opacity-20 blur-[1px] text-red-900/20 -z-10">
                  Video Demonstrations
                </div>
                
                {/* Positioned cool glowing decorative accent line under the S extending to PP on hover - moved down 0.5 inch */}
                <div className="absolute left-[8%] bottom-[-0.5in] transform group w-14 h-2.5 rounded-full overflow-hidden z-50 transition-all duration-700 hover:w-72">
                  {/* Base gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-blue-600"></div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-blue-600 blur-md opacity-70"></div>
                  
                  {/* Pulsing dots */}
                  <div className="absolute h-full w-4 bg-white/80 right-4 rounded-full blur-[1px] animate-pulse-slow"></div>
                  <div className="absolute h-full w-3 bg-white/80 right-24 rounded-full blur-[1px] animate-pulse-slow-delayed opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                </div>
              </div>
              
              {/* Enhanced description */}
              <p className="text-gray-200 text-xl max-w-2xl mx-auto relative">
                {/* Left accent - animated pulse - longer and moved to top */}
                <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-1.5 h-20 bg-gradient-to-b from-orange-500/0 via-orange-500/70 to-orange-500/0 rounded-full animate-pulse-slow z-20"></span>
                
                Watch our experts demonstrate application techniques and showcase the superior performance of our protective coatings.
                
                {/* Right accent - animated pulse with delay - longer and moved to top */}
                <span className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-1.5 h-20 bg-gradient-to-b from-orange-500/0 via-orange-500/70 to-orange-500/0 rounded-full animate-pulse-slow-delayed z-20"></span>
              </p>
              
              {/* Move blue/orange gradient square to top left corner instead of bottom left */}
              <div className="absolute top-0 left-0 w-32 h-32 opacity-20 z-10">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/40 to-orange-500/40 rounded-tl-xl blur-[2px]"></div>
              </div>
              
              {/* Subtle animated overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-30 rounded-xl"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 -translate-x-full animate-shimmer-slow transform rounded-xl overflow-hidden"></div>
            </div>
            
            {/* Bottom reflection */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent rounded-full"></div>
          </div>
        </div>
        
        {/* Add keyframes for animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; transform: scale(0.9); }
            50% { opacity: 0.6; transform: scale(1.1); }
          }
          
          @keyframes pulse-slow-delayed {
            0%, 100% { opacity: 0.3; transform: scale(0.9); }
            50% { opacity: 0.6; transform: scale(1.1); }
            animation-delay: 1s;
          }
          
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          
          @keyframes slideRightDiagonal {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(500%); }
          }
          
          @keyframes slideUp {
            0% { transform: translateY(100%); }
            100% { transform: translateY(-100%); }
          }
        `}} />

        {/* Premium grid with enhanced shadows and animations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            {activeVideo ? (
              <div className="group relative transform hover:scale-[1.01] transition-all duration-700">
                {/* Premium video player container with enhanced styling */}
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/98 to-gray-900/95 backdrop-blur-xl rounded-xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] z-10">
                  {/* Premium dual-layer gradient border effect */}
                  <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/60 via-blue-500/30 to-orange-500/60 opacity-80"></div>
                  <div className="absolute inset-[1px] p-0.5 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-30 pointer-events-none"></div>
                  
                  {/* Corner accent decorations */}
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/40 to-red-500/40 rounded-tr-xl blur-[2px]"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/40 to-red-500/40 rounded-bl-xl blur-[2px]"></div>
                  </div>

                  {/* Video player with enhanced styling */}
                  <div className="relative pb-[56.25%] h-0 overflow-hidden z-10">
                    {/* Premium video frame with glow effect */}
                    <div className="absolute inset-4 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
                         style={{ boxShadow: '0 0 50px rgba(239, 68, 68, 0.4), 0 0 100px rgba(251, 113, 36, 0.2)' }}>
                    </div>
                    
                    {activeVideo.id === "localVideo" ? (
                      <div className="absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center">
                        {/* Premium video player controls */}
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
                  
                  {/* Enhanced content section with premium styling */}
                  <div className="p-8 relative z-10">
                    {/* Premium label with enhanced styling */}
                    <div className="absolute top-4 right-4">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-gray-900/95 to-gray-950/95 border border-gray-800 shadow-[0_5px_15px_rgba(0,0,0,0.3)] relative">
                        <div className="absolute inset-0 p-0.5 rounded-full bg-gradient-to-r from-orange-500/50 to-blue-500/50 opacity-70"></div>
                        <span className="text-orange-300 text-xs font-medium relative z-10 flex items-center">
                          <i className="fas fa-fire-alt mr-1.5"></i>
                          Premium Demo
                        </span>
                      </div>
                    </div>
                    
                    {/* Enhanced title with premium gradient */}
                    <div className="mb-4 pb-2 relative">
                      <GradientHeading level={3} className="text-2xl md:text-3xl mb-1" variant="fire">
                        {activeVideo.title}
                      </GradientHeading>
                      {/* Animated underline */}
                      <div className="absolute bottom-0 left-0 w-1/4 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 group-hover:w-1/2 transition-all duration-700 rounded-full"></div>
                    </div>
                    
                    {/* Enhanced description with premium styling */}
                    <p className="text-gray-300 text-lg mb-6">
                      {activeVideo.description}
                    </p>
                    
                    {/* Enhanced footer with premium styling */}
                    <div className="flex flex-wrap items-center justify-between">
                      <div className="relative group/badge">
                        <div className="absolute inset-0 rounded-full opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500"
                             style={{ boxShadow: '0 0 15px rgba(251, 113, 36, 0.4)' }}>
                        </div>
                        <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-gray-900/80 to-gray-800/80 text-md font-medium border border-orange-500/30 relative">
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-500">
                            {activeVideo.category}
                          </span>
                        </span>
                      </div>
                      
                      <span className="text-gray-400 text-sm flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500/20 to-blue-500/20 flex items-center justify-center mr-2 border border-orange-500/30">
                          <i className="fas fa-clock text-orange-400 text-xs"></i>
                        </div>
                        <span className="text-orange-200">{activeVideo.duration}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Bottom reflection effect */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              </div>
            ) : (
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/98 to-gray-900/95 backdrop-blur-xl rounded-xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] flex items-center justify-center h-full">
                {/* Premium dual-layer gradient border effect - Fire themed */}
                <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-orange-500/60 via-blue-500/30 to-orange-500/60 opacity-80"></div>
                <div className="absolute inset-[1px] p-0.5 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-30 pointer-events-none"></div>
                
                <div className="text-center">
                  {/* Praetorian Logo with Fire/Blue Background */}
                  <div className="w-full max-w-md mx-auto mb-6 relative">
                    <img 
                      src={praetorianLogoFire} 
                      alt="Praetorian SmartCoat" 
                      className="w-full h-auto object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950/30 pointer-events-none"></div>
                  </div>
                  <GradientHeading level={3} className="text-2xl mb-3" variant="fire">No Videos Available</GradientHeading>
                  <p className="text-gray-300 max-w-md text-lg">
                    Please check back later for video demonstrations.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Premium sidebar with enhanced styling */}
          <div className="space-y-8">
            {/* Video library container with premium enterprise styling - matching the design from screenshot */}
            <div className="group/library relative">
              {/* Premium ambient glow effects - positioned BEHIND the card */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/15 rounded-full filter blur-[150px] animate-pulse-slow pointer-events-none"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/20 rounded-full filter blur-[130px] animate-pulse-slow-delayed pointer-events-none"></div>
              
              {/* Main container with premium enterprise styling */}
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 backdrop-blur-xl rounded-xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.4)] overflow-hidden border border-orange-500/30 z-10 transform transition-all duration-500 hover:shadow-[0_15px_60px_rgba(249,115,22,0.2)] hover:-translate-y-1">
                {/* Subtle dots and squares pattern background */}
                <div className="absolute inset-0 opacity-25 z-0">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjMyLDEyMSw1OCwwLjIpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
                </div>
                
                {/* Corner accent with uniform styling across all corners */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/70 rounded-tl-lg"></div>
                  <div className="absolute top-0 left-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/70 rounded-tr-lg"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500/70 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-blue-500/50 rounded-full blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-10">
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/70 rounded-br-lg"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-orange-500/50 rounded-full blur-[2px]"></div>
                </div>
                
                {/* Premium heading with white text and drop shadow */}
                <div className="mb-6 pb-4 relative">
                  <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15)] mb-1">
                    Video Library
                  </h3>
                  {/* Animated underline with mixed-themed gradient */}
                  <div className="absolute bottom-0 left-0 w-20 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 group-hover/library:w-1/3 transition-all duration-700 rounded-full opacity-70 shadow-[0_0_5px_rgba(251,113,36,0.4),_0_0_5px_rgba(59,130,246,0.4)]"></div>
                </div>

                {/* Premium filter buttons with enhanced styling */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category, idx) => (
                      <div key={category} className="relative group/btn">
                        {/* Animated glow effect on hover */}
                        <div className={`absolute inset-0 rounded-full opacity-0 ${activeCategory === category ? 'opacity-40' : 'group-hover/btn:opacity-30'} transition-opacity duration-300`}
                             style={{ 
                               boxShadow: idx % 3 === 0 ? '0 0 15px rgba(239, 68, 68, 0.5)' : 
                                         idx % 3 === 1 ? '0 0 15px rgba(59, 130, 246, 0.5)' :
                                                        '0 0 15px rgba(139, 92, 246, 0.5)'
                             }}>
                        </div>
                        <button
                          onClick={() => setActiveCategory(category)}
                          className={`px-4 py-1.5 rounded-full capitalize text-sm font-medium relative overflow-hidden group-hover/btn:scale-105 transition-all duration-300 ${
                            activeCategory === category 
                              ? 'bg-black text-white border-2 border-orange-500'
                              : 'bg-black text-gray-400 border border-gray-700/40 hover:text-gray-300 hover:border-orange-500/50'
                          }`}
                        >
                          {activeCategory === category && (
                            <span className="absolute inset-0 opacity-30" 
                                 style={{ boxShadow: '0 0 15px 2px rgba(251, 113, 36, 0.6)' }}>
                            </span>
                          )}
                          
                          {/* Reflection effect - only visible when active */}
                          {activeCategory === category && (
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent opacity-0 group-hover/btn:opacity-100 transition-all duration-700"
                                 style={{
                                   clipPath: 'polygon(0 0, 30% 0, 20% 100%, 0% 100%)',
                                   transform: 'translateX(-100%)',
                                   animation: 'slideRightDiagonal 2.5s ease-in-out infinite',
                                   animationPlayState: 'paused'
                                 }}
                                 onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'running'}
                                 onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'paused'}>
                            </div>
                          )}
                          
                          <span className="relative z-10">
                            {category}
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Premium video list with enhanced styling */}
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredVideos.length > 0 ? (
                    filteredVideos.map((video, idx) => (
                      <div
                        key={video.id}
                        className={`relative group/item p-4 rounded-lg cursor-pointer transition-all ${
                          activeVideo?.id === video.id
                            ? "bg-gradient-to-r from-gray-800/90 to-gray-700/90 transform scale-[1.02]"
                            : "bg-gradient-to-r from-gray-900/80 to-gray-800/80 hover:scale-[1.02]"
                        }`}
                        onClick={() => setActiveVideo(video)}
                      >
                        {/* Premium gradient border effect */}
                        <div className={`absolute inset-0 p-0.5 rounded-lg bg-gradient-to-r 
                          ${idx % 3 === 0 ? 'from-orange-500/40 to-red-500/40' : 
                                   idx % 3 === 1 ? 'from-blue-500/40 to-cyan-500/40' :
                                                  'from-orange-500/40 to-blue-500/40'} 
                          opacity-${activeVideo?.id === video.id ? '70' : '40'}`}>
                        </div>
                        
                        <div className="flex gap-4 relative z-10">
                          {/* Enhanced thumbnail with premium styling */}
                          <div className="relative flex-shrink-0 w-[100px] h-[60px] bg-gray-800 rounded-md overflow-hidden">
                            {video.id === "localVideo" ? (
                              <div className="w-full h-full bg-gradient-to-br from-orange-900 to-red-700 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgZD0iTTAgMGgydjJIMHptMiAyaDJ2MkgyeiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
                                <div className="absolute -top-4 -left-6 w-20 h-20 bg-orange-600/30 rounded-full filter blur-xl animate-pulse-slow-delayed"></div>
                                <i className="fas fa-fire text-lg text-white"></i>
                              </div>
                            ) : (
                              <img
                                src={video.thumbnail || `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                                alt={video.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                            
                            {/* Premium play button overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover/item:bg-black/20 transition-all">
                              <div className="w-8 h-8 rounded-full bg-orange-500/90 flex items-center justify-center transform group-hover/item:scale-110 transition-transform">
                                <Play className="h-4 w-4 text-white" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Enhanced content with premium styling */}
                          <div className="flex-grow min-w-0">
                            <h4 className="font-medium text-md mb-1.5 line-clamp-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-100 group-hover/item:from-orange-100 group-hover/item:to-white transition-colors">
                              {video.title}
                            </h4>
                            <div className="flex items-center text-xs text-gray-400">
                              <span className="text-orange-300 group-hover/item:text-orange-200 transition-colors">{video.duration}</span>
                              <span className="mx-1.5 text-gray-500">•</span>
                              <span className="capitalize text-blue-300 group-hover/item:text-blue-200 transition-colors">{video.category}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 rounded-lg py-8 px-6 text-center">
                      {/* Premium gradient border effect */}
                      <div className="absolute inset-0 p-0.5 rounded-lg bg-gradient-to-r from-gray-700/40 to-gray-600/40 opacity-70"></div>
                      
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-800/80 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-700/50 to-gray-600/50"></div>
                        <Info className="h-6 w-6 text-gray-400 relative z-10" />
                      </div>
                      <p className="text-gray-400 text-lg">No videos in this category</p>
                    </div>
                  )}
                </div>

                {/* Premium YouTube button with enhanced styling */}
                <div className="mt-8 pt-6 border-t border-gray-700/30 relative">
                  {/* Decorative line */}
                  <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                  
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                     className="group/yt relative block w-full py-3 px-4 rounded-lg bg-gradient-to-r from-gray-900/90 to-gray-800/90 text-gray-200 hover:text-white transition-colors">
                    {/* Premium gradient border effect */}
                    <div className="absolute inset-0 p-0.5 rounded-lg bg-gradient-to-r from-red-600/50 to-red-500/50 opacity-60 group-hover/yt:opacity-80 transition-opacity"></div>
                    
                    <div className="flex items-center justify-center">
                      <i className="fab fa-youtube text-xl mr-2 text-red-500"></i>
                      <span className="text-md font-medium">Visit Our YouTube Channel</span>
                      <div className="ml-2 opacity-0 group-hover/yt:opacity-100 transform group-hover/yt:translate-x-1 transition-all">
                        <i className="fas fa-arrow-right text-sm"></i>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              
              {/* Bottom reflection effect - Fire themed */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            </div>

            {/* Request demo card with premium styling */}
            <div className="group relative transform hover:scale-[1.01] transition-all duration-700">
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/98 to-gray-900/95 backdrop-blur-xl rounded-xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] z-10">
                {/* Premium dual-layer gradient border effect */}
                <div className="absolute inset-0 p-0.5 rounded-xl bg-gradient-to-r from-yellow-500/60 via-amber-500/30 to-yellow-500/60 opacity-80"></div>
                <div className="absolute inset-[1px] p-0.5 rounded-xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-30 pointer-events-none"></div>
                
                {/* Corner accent decorations */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-bl from-yellow-500/40 to-amber-500/40 rounded-tr-xl blur-[2px]"></div>
                </div>
                
                <div className="flex items-start gap-6 relative z-10">
                  {/* Enhanced icon with premium styling */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-600 to-amber-600 opacity-20 animate-pulse-slow"></div>
                      <div className="absolute inset-2 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500"></div>
                      <Star className="h-8 w-8 text-white relative z-10" />
                    </div>
                    
                    {/* Animated concentric ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-yellow-500/30 scale-[1.2] opacity-0 group-hover:opacity-100 group-hover:scale-[1.5] transition-all duration-1000"></div>
                  </div>
                  
                  <div>
                    {/* Enhanced heading with premium styling */}
                    <GradientHeading level={4} className="text-xl mb-2" variant="fire">
                      Request Custom Demonstration
                    </GradientHeading>
                    
                    {/* Enhanced description with premium styling */}
                    <p className="text-gray-300 text-md mb-5 leading-relaxed">
                      Need to see a specific application technique? Request a personalized video demonstration from our experts.
                    </p>
                    
                    {/* Enhanced button with premium styling */}
                    <button className="relative px-5 py-2.5 rounded-lg bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-medium transition-transform hover:scale-105 hover:-translate-y-0.5 group/btn">
                      <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 opacity-0 group-hover/btn:opacity-100 transition-opacity blur-[2px]"></span>
                      <span className="relative z-10 flex items-center">
                        Request Demo
                        <i className="fas fa-chevron-right ml-2 text-xs transform group-hover/btn:translate-x-1 transition-transform"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Bottom reflection effect */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;