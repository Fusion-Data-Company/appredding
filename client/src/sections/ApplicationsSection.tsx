import { Link } from "wouter";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { PremiumArrowButton } from "@/utils/premium-buttons";
import backgroundImg from "../assets_dir/images/optimized/praetorian-background-new.png";
import { useRef, useEffect } from "react";
import { Shield } from "lucide-react";

interface ApplicationCardProps {
  imageSrc: string;
  title: string;
  description: string;
  link: string;
}

const ApplicationCard = ({ imageSrc, title, description, link }: ApplicationCardProps) => {
  // Determine if this is a water-related application
  const isWaterRelated = title === "Marine" || title === "Pool";
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Add mouse movement tracking for dynamic gradient effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to card
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Convert to percentage
      const xPercent = Math.floor((x / rect.width) * 100);
      const yPercent = Math.floor((y / rect.height) * 100);
      
      // Apply CSS variables for gradient positioning
      cardRef.current.style.setProperty('--mouse-x', `${xPercent}%`);
      cardRef.current.style.setProperty('--mouse-y', `${yPercent}%`);
    };
    
    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className="group relative rounded-lg overflow-hidden h-[400px] w-full block cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.25)] border-0 dual-gradient-border transform transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl"
    >
      <img 
        src={imageSrc} 
        alt={title} 
        width={1152}
        height={648}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      
      {/* Subtle dots and squares pattern in burnt orange - Increased opacity for visibility */}
      <div className="absolute inset-0 opacity-25 mix-blend-soft-light pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGZpbGw9InJnYmEoMjQ5LDExNSwyMiwwLjQpIiBkPSJNMCAwaDJ2Mkgwem0yIDJoMnYySDJ6Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]"></div>
      </div>
      
      {/* Ambient glow overlay - Positioned to avoid shadowing text */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -top-40 right-0 w-60 h-60 bg-orange-600/25 rounded-full filter blur-[80px]"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-orange-500/20 rounded-full filter blur-[100px]"></div>
      </div>
      
      {/* Corner accents with gradients - similar to FAQSection */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-20 transition-opacity duration-700 z-10">
        <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/40 to-blue-500/40 rounded-tr-xl blur-[2px]"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-0 group-hover:opacity-20 transition-opacity duration-700 z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/40 to-orange-500/40 rounded-bl-xl blur-[2px]"></div>
      </div>
      
      {/* Animated horizontal lines - top */}
      <div className="absolute top-[35%] left-0 w-full h-[1px] overflow-hidden z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-orange-500/60 to-transparent -translate-x-full animate-shimmer-slow"></div>
      </div>
      
      {/* Animated horizontal lines - bottom */}
      <div className="absolute bottom-[20%] left-0 w-full h-[1px] overflow-hidden z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-orange-500/60 to-transparent -translate-x-full animate-shimmer-slow-delayed"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <h3 className="text-3xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-gray-200 text-lg mb-6">{description}</p>
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity relative">
          
          <Link href={link}>
            <PremiumArrowButton 
              size="lg"
              className="w-full md:w-auto font-semibold tracking-wider"
            >
              Learn more
            </PremiumArrowButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ApplicationsSection = () => {
  const applications = [
    {
      imageSrc: "/assets/wildfire-protection.jpg",
      title: "Wildfire Protection",
      description: "Class-A fire retardant for homes in wildfire-prone areas",
      link: "/fire-prevention"
    },
    {
      imageSrc: "/assets/marine-protection.jpg",
      title: "Marine",
      description: "Salt water resistant coating for boats and marine structures",
      link: "/marinas"
    },
    {
      imageSrc: "/assets/pool-protection.jpg",
      title: "Pool",
      description: "Chemical resistant finishes for pool surfaces",
      link: "/pools"
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      title: "Construction",
      description: "Protective barriers for commercial and residential buildings",
      link: "/construction"
    },
    {
      imageSrc: "/assets/mobile-home-protection.jpg",
      title: "Mobile Home",
      description: "Specialized coatings for manufactured housing",
      link: "/mobile-home"
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      title: "Municipality",
      description: "Infrastructure protection for public works projects",
      link: "/municipality"
    }
  ];

  return (
    <section 
      className="py-32 md:py-40 relative" 
      id="applications"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center", // Standardized position
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "#111111",
        minHeight: "100vh",
        paddingTop: "10rem",
        paddingBottom: "10rem",
        position: "relative",
        zIndex: 0
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/60" style={{ zIndex: 1 }}></div>
      <div className="container mx-auto px-4 md:px-8 max-w-[1600px] relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-20">
          <div className="relative group mx-auto max-w-4xl mb-10 inline-block transform transition-all duration-500">
            {/* Multiple layered background effects */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-red-600/40 to-amber-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-amber-500/80 to-red-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
            
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
              
              {/* Moved Technical Data badge to top - moved up a bit */}
              <div className="relative z-30 -mt-2 mb-6 flex justify-center">
                <div className="px-3 py-1.5 rounded-full border border-amber-300 dark:border-amber-700 bg-amber-100/50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 inline-flex items-center shadow-[0_0_10px_rgba(251,113,36,0.3)]">
                  <Shield className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="text-sm font-medium">Technical Data</span>
                </div>
              </div>
              
              {/* Shimmer heading */}
              <div className="relative z-10 mb-8 px-6 py-2 overflow-hidden">
                {/* Animated glow behind text */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-orange-500/20 to-red-600/10 opacity-50 blur-xl animate-pulse-slow"></div>
                
                {/* Heading with enhanced enterprise styling and shadows */}
                <div className="shimmer-fire-text font-bold text-5xl tracking-tight relative z-10">
                  {/* Background glow for letter definition */}
                  <div className="absolute inset-0 flex justify-center items-center text-5xl font-bold tracking-tight text-orange-900/20 blur-[10px] scale-110">
                    Specialized Applications
                  </div>
                  
                  {/* Main text with premium gradient - moved up 0.25 inch */}
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-amber-500 to-red-500
                    drop-shadow-[0_0px_3px_rgba(251,113,36,0.4)] 
                    [text-shadow:0_1px_2px_rgba(0,0,0,0.25),0_2px_15px_rgba(251,146,60,0.5)]
                    transform -translate-y-[0.25in]">
                    Specialized Applications
                  </span>
                  
                  {/* Top glossy reflection */}
                  <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent rounded-t-lg"></div>
                </div>
                
                {/* Multiple text shadows for depth */}
                <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold tracking-tight opacity-20 blur-[6px] text-orange-700/40 -z-10 transform scale-105">
                  Specialized Applications
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold tracking-tight opacity-30 blur-[2px] text-red-900/30 -z-10">
                  Specialized Applications
                </div>
                
                {/* Positioned cool glowing decorative accent line under the S extending to PP on hover - moved down 0.5 inch */}
                <div className="absolute left-[8%] bottom-[-0.5in] transform group w-14 h-2.5 rounded-full overflow-hidden z-20 transition-all duration-700 hover:w-72">
                  {/* Base gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-red-600"></div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 blur-md opacity-70"></div>
                  
                  {/* Removed animated pulse overlay */}
                  
                  {/* Pulsing dots */}
                  <div className="absolute h-full w-4 bg-white/80 right-4 rounded-full blur-[1px] animate-pulse-slow"></div>
                  <div className="absolute h-full w-3 bg-white/80 right-24 rounded-full blur-[1px] animate-pulse-slow-delayed opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                </div>
              </div>
              
              {/* Enhanced description */}
              <p className="text-gray-200 text-xl max-w-2xl mx-auto relative">
                {/* Left accent - animated pulse - longer and moved to top */}
                <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-1.5 h-20 bg-gradient-to-b from-orange-500/0 via-orange-500/70 to-orange-500/0 rounded-full animate-pulse-slow z-20"></span>
                
                Our protective coatings are engineered for specific environments and challenges across various industries.
                
                {/* Right accent - animated pulse with delay - longer and moved to top */}
                <span className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-1.5 h-20 bg-gradient-to-b from-orange-500/0 via-orange-500/70 to-orange-500/0 rounded-full animate-pulse-slow-delayed z-20"></span>
              </p>
              
              {/* Move blue/orange gradient square to top left corner instead of bottom left */}
              <div className="absolute top-0 left-0 w-32 h-32 opacity-20 z-10">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/40 to-orange-500/40 rounded-tl-xl blur-[2px]"></div>
              </div>
              
              {/* Removed full-width orange lines */}
              
              {/* Subtle animated overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-30 rounded-xl"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 -translate-x-full animate-shimmer-slow transform rounded-xl overflow-hidden"></div>
            </div>
            
            {/* Bottom reflection */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent rounded-full"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
          {applications.map((app, index) => (
            <ApplicationCard
              key={index}
              imageSrc={app.imageSrc}
              title={app.title}
              description={app.description}
              link={app.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationsSection;
