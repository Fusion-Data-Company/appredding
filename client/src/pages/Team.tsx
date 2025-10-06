import MainLayout from "@/components/layout/MainLayout";
import { GradientHeading } from "@/components/ui/gradient-heading";
import PageTransition from "@/components/ui/page-transition";
import { GradientButton } from "@/components/ui/gradient-button";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
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
    name: "Alex Reynolds",
    title: "Chief Executive Officer",
    bio: "With over 20 years of experience in industrial coatings, Alex leads our company with vision and strategic direction. Their background in chemical engineering and business administration has been instrumental in our growth and innovation.",
    gradient: "combined",
    icon: "fa-user-tie"
  },
  {
    name: "Dr. Sarah Chen",
    title: "Chief Technology Officer",
    bio: "Leading our R&D division, Dr. Chen has pioneered many of our breakthrough coating formulations. With a Ph.D. in Materials Science and numerous patents, she drives our technological advancement and innovation strategy.",
    gradient: "blue",
    icon: "fa-flask"
  },
  {
    name: "Marcus Johnson",
    title: "VP of Operations",
    bio: "Marcus oversees all production facilities and ensures our manufacturing processes maintain the highest standards of quality and efficiency. His background in industrial engineering has helped optimize our production capabilities.",
    gradient: "fire",
    icon: "fa-industry"
  },
  {
    name: "Lisa Hernandez",
    title: "Director of Sales",
    bio: "With extensive experience in B2B sales and distribution networks, Lisa leads our sales team in building strong relationships with clients across various industries and expanding our market presence.",
    gradient: "blue",
    icon: "fa-chart-line"
  },
  {
    name: "James Wilson",
    title: "Environmental Compliance Officer",
    bio: "James ensures all our products and processes meet or exceed regulatory requirements. His background in environmental science helps maintain our commitment to sustainability while delivering high-performance products.",
    gradient: "fire",
    icon: "fa-leaf"
  },
  {
    name: "Michelle Park",
    title: "Customer Success Manager",
    bio: "Michelle leads our customer support team, ensuring clients receive exceptional service and technical assistance. Her expertise in project management helps clients achieve optimal results with our coating solutions.",
    gradient: "combined",
    icon: "fa-headset"
  }
];

const Team = () => {
  return (
    <MainLayout>
      <PageTransition>
        <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-orange-500/10 pointer-events-none"></div>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <GradientHeading level={1} className="text-4xl md:text-5xl mb-4" variant="mixed">
                Our Team
              </GradientHeading>
              <p className="text-lg  text-gray-700 max-w-3xl mx-auto">
                Meet the experts behind Advance Power Solutions, dedicated to innovation and excellence in
                protective coating technology.
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