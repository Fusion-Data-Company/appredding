import { Link } from "wouter";
import { GradientButton } from "@/components/ui/gradient-button";

interface ApplicationCardProps {
  imageSrc: string;
  title: string;
  description: string;
  link: string;
}

const ApplicationCard = ({ imageSrc, title, description, link }: ApplicationCardProps) => {
  return (
    <div className="group relative rounded-lg overflow-hidden h-[450px] block cursor-pointer" onClick={() => window.location.href = link}>
      <img 
        src={imageSrc} 
        alt={title} 
        width={800}
        height={450}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-[#a0a0a0] text-sm">{description}</p>
        <div className="mt-2 text-primary-400 text-sm font-semibold flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          Learn more <i className="fas fa-arrow-right ml-2"></i>
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
      imageSrc: "https://images.unsplash.com/photo-1560090995-01632a28895b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
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
    <section className="py-20 bg-[#1e1e1e]" id="applications">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Specialized Applications</h2>
          <p className="text-[#a0a0a0] max-w-2xl mx-auto">
            Our protective coatings are engineered for specific environments and challenges across various industries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
