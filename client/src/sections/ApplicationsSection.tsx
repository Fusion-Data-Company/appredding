import { Link } from "wouter";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import backgroundImg from "../assets_dir/images/optimized/praetorian-background-new.png";
import { useRef, useEffect } from "react";

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
      className="group relative rounded-lg overflow-hidden h-[400px] w-full block cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.25)] border-0 dual-gradient-border transform transition-transform"
    >
      <img 
        src={imageSrc} 
        alt={title} 
        width={1152}
        height={648}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <h3 className="text-3xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-gray-200 text-lg mb-6">{description}</p>
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={link}>
            <GradientButton 
              size="default"
              variant={isWaterRelated ? "variant" : "default"}
              className="w-full md:w-auto font-semibold tracking-wider"
            >
              Learn more
            </GradientButton>
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
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl border-0 premium-gradient-border shadow-[0_0_40px_rgba(255,255,255,0.25)] py-12 px-12 mx-auto max-w-4xl mb-10 inline-block">
            <GradientHeading className="text-4xl md:text-5xl mb-6" variant="mixed">Specialized Applications</GradientHeading>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Our protective coatings are engineered for specific environments and challenges across various industries.
            </p>
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
