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
      className="pt-24 pb-32 relative" 
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
        <div className="text-center mb-20">
          {/* Card with premium enterprise styling matching Testimonials Section */}
          <div className="relative group mx-auto max-w-4xl mb-12 inline-block transform hover:scale-[1.02] transition-all duration-700 hover:-translate-y-1 hover:z-10">
            {/* Multiple layered background effects - matching Testimonials Section */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
            
            {/* Main card container - enhanced to match Testimonials Section */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl py-12 px-12 z-10 border border-orange-500/30 overflow-hidden group hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500">
              
              {/* Enhanced ambient glow - matching Testimonials Section */}
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-orange-500/20 rounded-full filter blur-[100px] opacity-70 animate-pulse-slow"></div>
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/25 rounded-full filter blur-[100px] opacity-70 animate-pulse-slow-delayed"></div>
              
              {/* Additional background gradient areas - matching Testimonials Section */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20 z-5">
                <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/40 to-blue-500/40 rounded-tr-xl blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-32 opacity-20 z-5">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/40 to-orange-500/40 rounded-bl-xl blur-[2px]"></div>
              </div>
              
              {/* Corner accents - exactly matching Testimonials Section */}
              <div className="absolute top-4 left-4 w-12 h-12 z-10">
                <div className="absolute left-0 top-0 w-6 h-6 border-l-2 border-t-2 border-orange-500/40 rounded-tl-md"></div>
                <div className="absolute left-1 top-1 w-8 h-8 border-l border-t border-blue-500/30 rounded-tl-md"></div>
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 z-10">
                <div className="absolute right-0 top-0 w-6 h-6 border-r-2 border-t-2 border-orange-500/40 rounded-tr-md"></div>
                <div className="absolute right-1 top-1 w-8 h-8 border-r border-t border-blue-500/30 rounded-tr-md"></div>
              </div>
              <div className="absolute bottom-4 right-4 w-12 h-12 z-10">
                <div className="absolute right-0 bottom-0 w-6 h-6 border-r-2 border-b-2 border-orange-500/40 rounded-br-md"></div>
                <div className="absolute right-1 bottom-1 w-8 h-8 border-r border-b border-amber-500/30 rounded-br-md"></div>
              </div>
              <div className="absolute bottom-4 left-4 w-12 h-12 z-10">
                <div className="absolute left-0 bottom-0 w-6 h-6 border-l-2 border-b-2 border-orange-500/40 rounded-bl-md"></div>
                <div className="absolute left-1 bottom-1 w-8 h-8 border-l border-b border-amber-500/30 rounded-bl-md"></div>
              </div>
              
              {/* Background blur text - matching Testimonials Section */}
              <div className="absolute inset-0 flex justify-center items-center text-5xl font-bold tracking-tight text-orange-900/10 blur-[5px] scale-110 pointer-events-none">
                Video Demonstrations
              </div>
              
              <div className="relative z-10">
                {/* Main title with premium text styling - matching Testimonials Section */}
                <h2 className="text-white
                drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] 
                [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]
                text-4xl md:text-5xl font-bold relative z-30 mb-6">
                  Video Demonstrations
                </h2>
                
                {/* Multiple text shadows for depth - reduced blur effects */}
                <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold tracking-tight opacity-10 blur-[3px] text-orange-700/30 z-10 transform scale-105 pointer-events-none">
                  Video Demonstrations
                </div>
                
                <p className="text-gray-300 text-xl max-w-2xl mx-auto relative z-30">
                  Watch our expert demonstrations of Praetorian's cutting-edge coating solutions in action.
                </p>
                
                {/* Decorative accent line */}
                <div className="absolute left-1/2 bottom-4 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-orange-500/70 to-transparent rounded-full"></div>
              </div>
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
              <div className="group/video relative">
                {/* Premium ambient glow effects - positioned BEHIND the card */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/15 rounded-full filter blur-[180px] animate-pulse-slow-delayed pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full filter blur-[200px] animate-pulse-slow pointer-events-none"></div>
                
                {/* Main container with premium enterprise styling */}
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 backdrop-blur-xl rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-orange-500/30 z-10 transform transition-all duration-500 hover:shadow-[0_15px_60px_rgba(249,115,22,0.2)] hover:-translate-y-1">
                  {/* Subtle dots and squares pattern background */}
                  <div className="absolute inset-0 opacity-20 z-0">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjU1LDEzOCwwLDAuMikiIGQ9Ik0wIDBoMnYySDB6bTIgMmgydjJIMnoiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjYSkiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48L3N2Zz4=')]"></div>
                  </div>
                  
                  {/* Shining edge effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-1000"
                      style={{
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 8s linear infinite',
                        animationPlayState: 'paused'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'running'}
                      onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'paused'}>
                  </div>
                  
                  {/* Fading squares animation */}
                  <div className="absolute top-4 right-4 w-12 h-12 border border-orange-500/40 rounded opacity-0 group-hover/video:opacity-70 transition-all duration-700 animate-pulse-slow"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border border-blue-500/40 rounded opacity-0 group-hover/video:opacity-70 transition-all duration-700 delay-100 animate-pulse-slow-delayed"></div>
                  
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

                  {/* Video player with premium enterprise styling */}
                  <div className="relative pb-[56.25%] h-0 overflow-hidden z-10">
                    {/* Premium glow effect on hover - positioned BEHIND video */}
                    <div className="absolute inset-4 rounded-lg opacity-0 group-hover/video:opacity-30 transition-opacity duration-700 pointer-events-none"
                         style={{ boxShadow: '0 0 50px rgba(251, 113, 36, 0.3), 0 0 80px rgba(59, 130, 246, 0.2)' }}>
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
                          onError={(e) => }
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
                  
                  {/* Enhanced content section with premium enterprise styling */}
                  <div className="p-8 relative z-10">
                    {/* Premium enterprise badge with corner accents */}
                    <div className="absolute top-4 right-4">
                      <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-gradient-to-r from-gray-900/95 via-gray-950/95 to-black/95 border border-orange-500/40 shadow-[0_4px_12px_rgba(0,0,0,0.3)] relative overflow-hidden">
                        {/* Small corner accents - subtle version */}
                        <div className="absolute top-0 left-0 w-3 h-3 pointer-events-none">
                          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-orange-500/50 rounded-tl-sm"></div>
                        </div>
                        <div className="absolute top-0 right-0 w-3 h-3 pointer-events-none">
                          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-blue-500/50 rounded-tr-sm"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-3 h-3 pointer-events-none">
                          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-blue-500/50 rounded-bl-sm"></div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none">
                          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-orange-500/50 rounded-br-sm"></div>
                        </div>
                        
                        {/* Subtle glow behind label text */}
                        <div className="absolute inset-0 opacity-30 rounded-full"
                             style={{ boxShadow: 'inset 0 0 10px rgba(251, 113, 36, 0.5)' }}>
                        </div>
                        
                        <span className="text-white text-xs font-semibold relative z-10 flex items-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mr-1.5 shadow-sm">
                            <i className="fas fa-fire-alt text-[8px] text-white"></i>
                          </div>
                          Premium Demo
                        </span>
                      </div>
                    </div>
                    
                    {/* Premium white text title with drop shadow */}
                    <div className="mb-5 pb-3 relative">
                      <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15)] mb-1">
                        {activeVideo.title}
                      </h3>
                      {/* Animated underline with enhanced styling */}
                      <div className="absolute bottom-0 left-0 w-1/4 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 group-hover:w-1/2 transition-all duration-700 rounded-full opacity-80 shadow-[0_0_5px_rgba(251,113,36,0.4),_0_0_5px_rgba(59,130,246,0.4)]"></div>
                    </div>
                    
                    {/* Enhanced description with premium styling and better readability */}
                    <p className="text-gray-300 text-lg mb-7 leading-relaxed max-w-3xl">
                      {activeVideo.description}
                    </p>
                    
                    {/* Enhanced footer with premium enterprise styling */}
                    <div className="flex flex-wrap items-center justify-between">
                      {/* Category badge with premium styling */}
                      <div className="relative group/badge">
                        {/* Glow effect behind badge - only visible on hover */}
                        <div className="absolute inset-0 rounded-full opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500 pointer-events-none"
                             style={{ boxShadow: '0 0 20px rgba(251, 113, 36, 0.3), 0 0 10px rgba(59, 130, 246, 0.2)' }}>
                        </div>
                        
                        {/* Premium enterprise badge */}
                        <div className="px-5 py-2 rounded-full bg-gradient-to-r from-gray-900/95 via-gray-950/95 to-black/95 text-md font-medium border border-orange-500/30 relative group-hover/badge:border-orange-500/50 transition-colors duration-300">
                          {/* Mini corner accents */}
                          <div className="absolute top-0 left-0 w-3 h-3 pointer-events-none">
                            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-orange-500/50 rounded-tl-sm"></div>
                          </div>
                          <div className="absolute top-0 right-0 w-3 h-3 pointer-events-none">
                            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-blue-500/50 rounded-tr-sm"></div>
                          </div>
                          <div className="absolute bottom-0 left-0 w-3 h-3 pointer-events-none">
                            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-blue-500/50 rounded-bl-sm"></div>
                          </div>
                          <div className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none">
                            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-orange-500/50 rounded-br-sm"></div>
                          </div>
                          
                          {/* White text with drop shadow instead of gradient */}
                          <span className="text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] relative z-10">
                            {activeVideo.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Premium duration indicator */}
                      <div className="text-gray-300 text-sm flex items-center">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-900 to-black border border-orange-500/30 flex items-center justify-center mr-2.5 shadow-md">
                          <i className="fas fa-clock text-orange-500 text-xs"></i>
                        </div>
                        <span className="text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">{activeVideo.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom reflection effect */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              </div>
            ) : (
              <div className="group/no-video relative">
                {/* Premium ambient glow effects - positioned BEHIND the card */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/15 rounded-full filter blur-[200px] animate-pulse-slow-delayed pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/15 rounded-full filter blur-[180px] animate-pulse-slow pointer-events-none"></div>
                
                {/* Main container with premium enterprise styling */}
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 backdrop-blur-xl rounded-xl p-10 shadow-[0_10px_40px_rgba(0,0,0,0.4)] overflow-hidden border border-orange-500/30 z-10 flex items-center justify-center h-full">
                  {/* Subtle dots and squares pattern background */}
                  <div className="absolute inset-0 opacity-20 z-0">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjU1LDEzOCwwLDAuMikiIGQ9Ik0wIDBoMnYySDB6bTIgMmgydjJIMnoiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjYSkiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48L3N2Zz4=')]"></div>
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
                  
                  <div className="text-center relative z-10">
                    {/* Praetorian Logo with enhanced premium styling */}
                    <div className="w-full max-w-md mx-auto mb-8 relative">
                      <div className="absolute -inset-4 opacity-30 rounded-3xl filter blur-xl" 
                           style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, rgba(59,130,246,0.15) 70%)' }}>
                      </div>
                      <img 
                        src={praetorianLogoFire} 
                        alt="Praetorian SmartCoat" 
                        className="w-full h-auto object-contain relative z-10 drop-shadow-[0_5px_15px_rgba(249,115,22,0.3)]"
                      />
                    </div>
                    
                    {/* White text heading with drop shadow */}
                    <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15)] mb-4">
                      No Videos Available
                    </h3>
                    
                    {/* Enhanced description with improved styling */}
                    <p className="text-gray-300 max-w-md text-lg mx-auto leading-relaxed">
                      Please check back later for video demonstrations.
                    </p>
                  </div>
                </div>
                
                {/* Bottom reflection effect */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rounded-full blur-[1px] opacity-0 group-hover/no-video:opacity-100 transition-all duration-700"></div>
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
                
                {/* Shining edge effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/library:opacity-100 transition-opacity duration-1000"
                    style={{
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 8s linear infinite',
                      animationPlayState: 'paused'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'running'}
                    onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'paused'}>
                </div>
                
                {/* Fading squares animation */}
                <div className="absolute top-4 right-4 w-10 h-10 border border-orange-500/40 rounded opacity-0 group-hover/library:opacity-70 transition-all duration-700 animate-pulse-slow"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border border-blue-500/40 rounded opacity-0 group-hover/library:opacity-70 transition-all duration-700 delay-100 animate-pulse-slow-delayed"></div>
                
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

                {/* Premium enterprise-styled video list */}
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredVideos.length > 0 ? (
                    filteredVideos.map((video, idx) => (
                      <div
                        key={video.id}
                        className="relative group/item rounded-lg cursor-pointer"
                        onClick={() => setActiveVideo(video)}
                      >
                        {/* Orange/Blue ambient glow effect behind card */}
                        <div className={`absolute w-full h-full rounded-lg opacity-0 ${
                          activeVideo?.id === video.id ? 'opacity-30' : 'group-hover/item:opacity-20'
                        } transition-opacity duration-300 pointer-events-none`}
                        style={{ 
                          boxShadow: idx % 2 === 0 
                            ? '0 0 20px 2px rgba(251, 113, 36, 0.45)' 
                            : '0 0 20px 2px rgba(59, 130, 246, 0.45)' 
                        }}>
                        </div>
                        
                        {/* Main content card with premium styling */}
                        <div className={`relative p-3.5 rounded-lg border transition-all duration-300 ${
                          activeVideo?.id === video.id
                            ? "bg-gradient-to-r from-gray-900/95 via-gray-950/95 to-black/95 border-orange-500/40 transform scale-[1.02] shadow-[0_8px_25px_rgba(0,0,0,0.3)]"
                            : "bg-gradient-to-r from-gray-900/95 via-gray-950/95 to-black/95 border-gray-700/40 group-hover/item:border-orange-500/30 group-hover/item:scale-[1.02] group-hover/item:shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
                        }`}>
                          {/* Corner accent elements - smaller size for list items */}
                          <div className="absolute top-0 left-0 w-10 h-10 pointer-events-none">
                            <div className={`absolute top-0 left-0 w-4 h-4 border-t border-l rounded-tl-md ${
                              activeVideo?.id === video.id ? 'border-orange-500/70' : 'border-blue-500/40 group-hover/item:border-orange-500/50'
                            } transition-colors duration-300`}></div>
                          </div>
                          <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
                            <div className={`absolute top-0 right-0 w-4 h-4 border-t border-r rounded-tr-md ${
                              activeVideo?.id === video.id ? 'border-blue-500/70' : 'border-orange-500/40 group-hover/item:border-blue-500/50'
                            } transition-colors duration-300`}></div>
                          </div>
                          <div className="absolute bottom-0 left-0 w-10 h-10 pointer-events-none">
                            <div className={`absolute bottom-0 left-0 w-4 h-4 border-b border-l rounded-bl-md ${
                              activeVideo?.id === video.id ? 'border-blue-500/70' : 'border-blue-500/40 group-hover/item:border-blue-500/50'
                            } transition-colors duration-300`}></div>
                          </div>
                          <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none">
                            <div className={`absolute bottom-0 right-0 w-4 h-4 border-b border-r rounded-br-md ${
                              activeVideo?.id === video.id ? 'border-orange-500/70' : 'border-orange-500/40 group-hover/item:border-orange-500/50'
                            } transition-colors duration-300`}></div>
                          </div>
                          
                          {/* Main content with enhanced gap */}
                          <div className="flex gap-5 relative z-10">
                            {/* Enhanced thumbnail with premium enterprise styling */}
                            <div className="relative flex-shrink-0 w-[100px] h-[60px] rounded-md overflow-hidden">
                              {/* Premium border effect for thumbnail */}
                              <div className={`absolute inset-0 p-0.5 rounded-md ${
                                activeVideo?.id === video.id 
                                  ? 'bg-gradient-to-r from-orange-500/60 to-blue-500/60 opacity-80' 
                                  : 'bg-gradient-to-r from-orange-500/20 to-blue-500/20 opacity-60 group-hover/item:opacity-80'
                              } transition-all duration-300`}></div>
                            
                              {video.id === "localVideo" ? (
                                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgZD0iTTAgMGgydjJIMHptMiAyaDJ2MkgyeiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
                                  {/* Dual ambient glow effect in thumbnail */}
                                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full filter blur-[12px]" 
                                       style={{ background: 'radial-gradient(circle, rgba(251,113,36,0.3) 0%, rgba(59,130,246,0.3) 100%)' }}></div>
                                  <i className="fas fa-fire text-lg text-white"></i>
                                </div>
                              ) : (
                                <img
                                  src={video.thumbnail || `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                                  alt={video.title}
                                  className="w-full h-full object-cover relative z-[5]"
                                />
                              )}
                              
                              {/* Premium play button overlay */}
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 z-10">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center shadow-lg transform group-hover/item:scale-110 transition-transform duration-300">
                                  <Play className="h-4 w-4 text-white" />
                                </div>
                              </div>
                            </div>
                            
                            {/* Enhanced content with white text and improved spacing */}
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                              <h4 className={`text-sm font-medium truncate leading-tight ${
                                activeVideo?.id === video.id 
                                  ? 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]' 
                                  : 'text-gray-200 group-hover/item:text-white'
                              } transition-colors duration-300`}>
                                {video.title}
                              </h4>
                              <p className="text-xs text-gray-400 mt-1 line-clamp-1 group-hover/item:line-clamp-2 transition-all duration-300">
                                {video.description}
                              </p>
                              
                              {/* Elegant video metadata row */}
                              <div className="flex items-center justify-between mt-1.5">
                                <span className={`text-xs ${
                                  idx % 2 === 0 ? 'text-orange-400' : 'text-blue-400'
                                } font-medium`}>
                                  {video.category}
                                </span>
                                <div className="flex items-center">
                                  <div className="w-3 h-3 rounded-full bg-gray-800 flex items-center justify-center mr-1">
                                    <i className="fas fa-clock text-orange-500 text-[8px]"></i>
                                  </div>
                                  <span className="text-[10px] text-gray-500">{video.duration}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 border border-gray-800 rounded-lg bg-gradient-to-r from-gray-900/95 via-gray-950/95 to-black/95">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-800/80 border border-gray-700/50 flex items-center justify-center">
                        <Info className="h-5 w-5 text-orange-500/70" />
                      </div>
                      <p className="text-gray-400 text-sm">No videos found for the selected category.</p>
                    </div>
                  )}
                </div>

                {/* Premium YouTube button with enterprise styling */}
                <div className="mt-8 pt-6 border-t border-gray-800/50 relative">
                  {/* Decorative divider with premium styling */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
                  
                  {/* Enterprise-styled YouTube button */}
                  <div className="group/yt relative rounded-lg overflow-hidden">
                    {/* Ambient glow effect behind button - positioned BEHIND the card */}
                    <div className="absolute -inset-1 opacity-0 group-hover/yt:opacity-100 transition-opacity duration-700 pointer-events-none"
                         style={{ 
                           background: 'radial-gradient(circle at center, rgba(239,68,68,0.25) 0%, rgba(0,0,0,0) 70%)',
                           zIndex: -1
                         }}>
                    </div>
                    {/* Additional ambient glow effects - more intense on hover */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[80px] bg-red-500/10 rounded-full filter blur-[40px] opacity-0 group-hover/yt:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ zIndex: -1 }}></div>
                    
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                       className="relative block w-full py-3.5 px-4 rounded-lg bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 border border-gray-700/50 group-hover/yt:border-red-500/40 text-white text-center transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] transform group-hover/yt:translate-y-[-1px] overflow-hidden z-20">
                      
                      {/* Fading squares animation */}
                      <div className="absolute top-3 right-3 w-8 h-8 border border-red-500/30 rounded opacity-0 group-hover/yt:opacity-70 transition-all duration-700 animate-pulse-slow"></div>
                      <div className="absolute bottom-3 left-3 w-5 h-5 border border-red-500/30 rounded opacity-0 group-hover/yt:opacity-70 transition-all duration-700 delay-100 animate-pulse-slow-delayed"></div>
                      
                      {/* Shining edge effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/yt:opacity-100 transition-opacity duration-1000"
                          style={{
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 8s linear infinite',
                            animationPlayState: 'paused'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'running'}
                          onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'paused'}>
                      </div>
                      
                      {/* Corner accent styling matching rest of site */}
                      <div className="absolute top-0 left-0 w-10 h-10 pointer-events-none">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-red-500/50 rounded-tl-md"></div>
                      </div>
                      <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-red-500/50 rounded-tr-md"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-10 h-10 pointer-events-none">
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-red-500/50 rounded-bl-md"></div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none">
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-red-500/50 rounded-br-md"></div>
                      </div>
                      
                      {/* Content with premium styling */}
                      <div className="flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md mr-3">
                          <i className="fab fa-youtube text-lg text-white"></i>
                        </div>
                        <span className="text-base font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Visit Our YouTube Channel</span>
                        <div className="flex items-center justify-center ml-3 w-8 h-8 rounded-full bg-gray-800/50 border border-gray-700/50 opacity-70 group-hover/yt:opacity-100 group-hover/yt:border-red-500/30 transform group-hover/yt:translate-x-1 transition-all duration-300">
                          <i className="fas fa-arrow-right text-xs text-white"></i>
                        </div>
                      </div>
                      
                      {/* Subtle shine effect */}
                      <div className="absolute inset-0 opacity-0 group-hover/yt:opacity-100 transition-opacity duration-1000"
                           style={{
                             background: 'linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.1) 50%, transparent 55%)',
                             backgroundSize: '200% 200%',
                             animation: 'shine 3s infinite'
                           }}>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Bottom reflection effect - Fire themed */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            </div>

            {/* Request demo card with premium enterprise styling */}
            <div className="group/demo relative">
              {/* Premium ambient glow effects - positioned BEHIND the card */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange-500/15 rounded-full filter blur-[150px] animate-pulse-slow-delayed pointer-events-none"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-600/15 rounded-full filter blur-[180px] animate-pulse-slow pointer-events-none"></div>
              
              {/* Main card with enterprise premium styling */}
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 backdrop-blur-xl rounded-xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.4)] overflow-hidden border border-orange-500/30 z-10 transform transition-all duration-500 hover:shadow-[0_15px_60px_rgba(249,115,22,0.2)] hover:-translate-y-1">
                {/* Subtle dots and squares pattern background */}
                <div className="absolute inset-0 opacity-20 z-0">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjU1LDEzOCwwLDAuMikiIGQ9Ik0wIDBoMnYySDB6bTIgMmgydjJIMnoiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjYSkiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48L3N2Zz4=')]"></div>
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
                
                <div className="flex items-start gap-6 relative z-10">
                  {/* Enterprise-styled icon with premium effects */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center relative">
                      {/* Dual-color glow effect behind icon */}
                      <div className="absolute -inset-3 opacity-30 rounded-full filter blur-xl" 
                           style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.4) 0%, rgba(59,130,246,0.2) 70%)' }}>
                      </div>
                      
                      {/* Premium gradient background */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.3)]"></div>
                      
                      {/* Star icon with enhanced styling */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Star className="h-8 w-8 text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)] relative z-10" />
                      </div>
                      
                      {/* Subtle pulsing ring */}
                      <div className="absolute -inset-1 rounded-full border border-orange-500/30 opacity-60 animate-pulse-slow"></div>
                    </div>
                    
                    {/* Animated concentric rings with orange/blue gradient */}
                    <div className="absolute -inset-2 rounded-full border-2 border-orange-500/20 scale-100 opacity-0 group-hover/demo:opacity-100 group-hover/demo:scale-[1.3] transition-all duration-1000"></div>
                    <div className="absolute -inset-3 rounded-full border border-blue-500/20 scale-100 opacity-0 group-hover/demo:opacity-80 group-hover/demo:scale-[1.5] transition-all duration-1500 delay-100"></div>
                  </div>
                  
                  <div className="flex-1">
                    {/* White text heading with drop shadow */}
                    <h4 className="text-xl font-bold text-white tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] [text-shadow:0_1px_1px_rgba(0,0,0,0.15)] mb-2">
                      Request Custom Demonstration
                    </h4>
                    
                    {/* Enhanced description with premium styling */}
                    <p className="text-gray-300 text-md mb-5 leading-relaxed">
                      Need to see a specific application technique? Request a personalized video demonstration from our experts.
                    </p>
                    
                    {/* Premium enterprise-styled button */}
                    <div className="group/btn relative inline-block">
                      {/* Glow effect behind button */}
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none"
                           style={{ boxShadow: '0 0 25px rgba(251, 113, 36, 0.35), 0 0 15px rgba(59, 130, 246, 0.2)' }}>
                      </div>
                      
                      <button className="px-5 py-3 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 rounded-lg text-white font-medium relative overflow-hidden border border-orange-400/50 shadow-[0_4px_12px_rgba(251,113,36,0.15)] transform transition-all duration-300 hover:-translate-y-1">
                        {/* Corner accents matching card style */}
                        <div className="absolute top-0 left-0 w-5 h-5 pointer-events-none">
                          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/30 rounded-tl-sm"></div>
                        </div>
                        <div className="absolute top-0 right-0 w-5 h-5 pointer-events-none">
                          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/30 rounded-tr-sm"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-5 h-5 pointer-events-none">
                          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/30 rounded-bl-sm"></div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-5 h-5 pointer-events-none">
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/30 rounded-br-sm"></div>
                        </div>
                        
                        {/* Shine animation effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity"
                             style={{
                               clipPath: 'polygon(0 0, 30% 0, 50% 100%, 0% 100%)',
                               transform: 'translateX(-100%)',
                               animation: 'slideRightToLeft 2.5s ease-in-out infinite'
                             }}>
                        </div>
                        
                        <span className="relative z-10 flex items-center font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
                          Request Demo
                          <div className="ml-2 w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-70 group-hover/btn:opacity-100 transform group-hover/btn:translate-x-1 transition-all">
                            <i className="fas fa-chevron-right text-[10px]"></i>
                          </div>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom reflection effect */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent rounded-full blur-[1px] opacity-0 group-hover/demo:opacity-100 transition-all duration-700"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;