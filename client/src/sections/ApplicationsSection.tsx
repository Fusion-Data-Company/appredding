import { Link } from "wouter";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientHeading } from "@/components/ui/gradient-heading";

interface ApplicationCardProps {
  imageSrc: string;
  title: string;
  description: string;
  link: string;
}

const ApplicationCard = ({ imageSrc, title, description, link }: ApplicationCardProps) => {
  // Determine if this is a water-related application
  const isWaterRelated = title === "Marine" || title === "Pool";
  
  return (
    <div className="group relative rounded-lg overflow-hidden h-[500px] min-h-[500px] w-full block cursor-pointer dark:shadow-[0_0_60px_rgba(255,255,255,0.4)] shadow-[0_0_30px_rgba(0,0,0,0.25)] border-4 dark:border-white border-gray-300 transform transition-transform hover:scale-[1.03]" style={{height: "500px", minHeight: "500px"}}>
      <img 
        src={imageSrc} 
        alt={title} 
        width={800}
        height={450}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <h3 className="text-3xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-gray-200 text-lg mb-8">{description}</p>
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={link}>
            <GradientButton 
              size="lg"
              variant={isWaterRelated ? "variant" : "default"}
              className="w-full md:w-auto font-semibold tracking-wider text-lg"
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
        backgroundImage: 'url("/images/optimized/diamond-plate-fire-water-2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: "100vh",
        paddingTop: "8rem",
        paddingBottom: "8rem"
      }}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="dark:bg-gray-800/60 bg-gray-100/90 backdrop-blur-xl rounded-xl dark:border-4 dark:border-gray-600/40 border-4 border-gray-300 dark:shadow-[0_0_40px_rgba(255,255,255,0.25)] shadow-[0_0_30px_rgba(0,0,0,0.3)] py-12 px-12 mx-auto max-w-4xl mb-10 inline-block">
            <GradientHeading className="text-4xl md:text-5xl mb-6" variant="mixed">Specialized Applications</GradientHeading>
            <p className="dark:text-[#a0a0a0] text-gray-700 text-xl max-w-2xl mx-auto">
              Our protective coatings are engineered for specific environments and challenges across various industries.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 xl:gap-20">
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
