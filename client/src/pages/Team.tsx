import MainLayout from "@/components/layout/MainLayout";
import { GradientHeading } from "@/components/ui/gradient-heading";
import PageTransition from "@/components/ui/page-transition";
import { GradientButton } from "@/components/ui/gradient-button";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { AwardBadge } from "@/components/ui/award-badge";
import gregWithPanel from "@assets/Greg-with-panel.jpg";
import teamGroup from "@assets/400617335_882191187089939_3988264444007076062_n-500x375.jpg";
import teamOnsite from "@assets/491844865_1271014964874224_7004732250107002194_n.jpg";
import teamWorking from "@assets/98453708_3165453150160953_3940467511501258752_n-298x400.jpg";

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  gradient: "blue" | "fire" | "combined";
  icon: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Dennis Liscomb",
    title: "Partner & Co-Founder",
    bio: "With over 45 years of experience in solar and electrical contracting, Dennis leads Advance Power with expertise in both residential and commercial solar installations throughout Shasta County and Northern California.",
    gradient: "combined",
    icon: "fa-user-tie"
  },
  {
    name: "Greg Tomsik",
    title: "Partner & Co-Founder",
    bio: "Greg brings decades of experience in solar energy systems and battery storage solutions, specializing in NEM 3.0 optimization and helping homeowners maximize their solar investment with cutting-edge technology.",
    gradient: "blue",
    icon: "fa-solar-panel"
  },
  {
    name: "Casey",
    title: "Solar Consultant",
    bio: "Casey specializes in custom solar system design and energy efficiency assessments, helping homeowners understand their solar potential and navigate available incentives including the federal 30% tax credit.",
    gradient: "fire",
    icon: "fa-chart-line"
  },
  {
    name: "Shirley",
    title: "Customer Success Manager",
    bio: "Shirley ensures exceptional customer service throughout the solar installation process, from initial consultation through system commissioning, maintaining our commitment to customer satisfaction.",
    gradient: "blue",
    icon: "fa-headset"
  },
  {
    name: "Trevor",
    title: "Installation Specialist",
    bio: "Trevor leads our expert installation teams, ensuring every solar system is installed to the highest standards of quality and safety, with expertise in rooftop, ground mount, and carport installations.",
    gradient: "fire",
    icon: "fa-tools"
  },
  {
    name: "James",
    title: "Service Technician",
    bio: "James provides expert maintenance and repair services for solar systems throughout Northern California, ensuring optimal performance and helping customers maximize their energy savings.",
    gradient: "combined",
    icon: "fa-wrench"
  },
  {
    name: "John",
    title: "Project Manager",
    bio: "John coordinates all aspects of solar installations, from permits and utility interconnection to final inspection, ensuring projects are completed on time and exceed customer expectations.",
    gradient: "blue",
    icon: "fa-tasks"
  },
  {
    name: "Lauren",
    title: "Finance Specialist",
    bio: "Lauren helps customers navigate financing options through GoGreen Home Energy and other solar loan programs, making solar accessible with competitive rates and flexible payment plans.",
    gradient: "fire",
    icon: "fa-calculator"
  }
];

const Team = () => {
  return (
    <MainLayout>
      <PageTransition>
        <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-orange-500/10 pointer-events-none"></div>
          
          {/* Excellence Award Badge - Top Right */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
            <AwardBadge type="customer-service-excellence" />
          </div>
          
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <GradientHeading level={1} className="text-4xl md:text-5xl mb-4" variant="mixed">
                Our Team
              </GradientHeading>
              <p className="text-lg  text-gray-700 max-w-3xl mx-auto">
                Meet the experts behind Advance Power, with over 45 years of experience delivering solar energy solutions
                throughout Shasta County and Northern California.
              </p>
            </div>

            <div className="container mx-auto px-4 py-8">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src={gregWithPanel}
                  alt="Advance Power Redding team member working with solar panel - certified solar installation professional"
                  className="w-full h-64 md:h-80 lg:h-96 object-cover"
                  loading="lazy"
                  data-testid="img-team-1"
                />
              </div>
            </div>

            <div className="flex flex-row items-center justify-center mb-10 w-full">
              <AnimatedTooltip items={teamMembers.map((member, idx) => ({
                id: idx + 1,
                name: member.name,
                designation: member.title,
                image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80"
              }))} />
            </div>

            <div className="container mx-auto px-4 py-8">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src={teamGroup}
                  alt="Advance Power Redding team photo - dedicated solar professionals serving Northern California"
                  className="w-full h-64 md:h-80 lg:h-96 object-cover"
                  loading="lazy"
                  data-testid="img-team-2"
                />
              </div>
            </div>

            <div className="container mx-auto px-4 py-8">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src={teamOnsite}
                  alt="Expert technicians at work - Advance Power Redding team on-site installation"
                  className="w-full h-64 md:h-80 lg:h-96 object-cover"
                  loading="lazy"
                  data-testid="img-team-3"
                />
              </div>
            </div>

            <div className="container mx-auto px-4 py-8">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src={teamWorking}
                  alt="Certified solar installation professionals - Advance Power Redding team members at work"
                  className="w-full h-64 md:h-80 lg:h-96 object-cover"
                  loading="lazy"
                  data-testid="img-team-4"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      </PageTransition>
    </MainLayout>
  );
};

export default Team;