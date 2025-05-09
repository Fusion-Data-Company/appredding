import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GradientHeading } from "@/components/ui/gradient-heading";
import PageTransition from "@/components/ui/page-transition";
import { GradientButton } from "@/components/ui/gradient-button";

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
    <PageTransition>
      <Header />
      <main className="pt-24 pb-16">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-orange-500/10 pointer-events-none"></div>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <GradientHeading level={1} className="text-4xl md:text-5xl mb-4" variant="mixed">
                Our Team
              </GradientHeading>
              <p className="text-lg dark:text-gray-300 text-gray-700 max-w-3xl mx-auto">
                Meet the experts behind Praetorian SmartCoat Solutions, dedicated to innovation and excellence in
                protective coating technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-gray-100/70 to-gray-200/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl p-8 shadow-xl dark:shadow-orange-600/5 border border-gray-200 dark:border-gray-700/50 flex flex-col"
                >
                  <div className="mb-4 flex items-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center gradient-bg-${member.gradient} shadow-lg`}>
                      <i className={`fas ${member.icon} text-white text-xl`}></i>
                    </div>
                    <div className="ml-4">
                      <h2 className={`gradient-text-${member.gradient} text-xl font-bold font-heading`}>{member.name}</h2>
                      <p className="dark:text-gray-400 text-gray-600">{member.title}</p>
                    </div>
                  </div>
                  <p className="dark:text-gray-300 text-gray-700 flex-grow">{member.bio}</p>
                </div>
              ))}
            </div>

            <div className="bg-[url('/images/optimized/diamond-plate-fire-blue.jpg')] bg-cover bg-center rounded-2xl overflow-hidden mb-16">
              <div className="bg-gray-900/70 p-8 md:p-12">
                <div className="max-w-4xl mx-auto text-center">
                  <GradientHeading level={2} className="text-3xl md:text-4xl mb-6" variant="mixed">
                    Join Our Team
                  </GradientHeading>
                  <p className="text-gray-200 text-lg mb-8 max-w-2xl mx-auto">
                    We're always looking for talented individuals who are passionate about innovation and committed to
                    excellence. Join us in our mission to revolutionize the protective coatings industry.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <GradientButton href="/careers" variant="default" size="lg">
                      View Open Positions
                    </GradientButton>
                    <GradientButton href="/#contact" variant="default" size="lg">
                      Contact Us
                    </GradientButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto mb-16">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-8 text-center" variant="mixed">
                Our Values
              </GradientHeading>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-b from-gray-100/70 to-gray-200/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl p-8 shadow-xl dark:shadow-blue-600/5 border border-gray-200 dark:border-gray-700/50">
                  <div className="text-blue-500 dark:text-blue-400 mb-4">
                    <i className="fas fa-lightbulb text-4xl"></i>
                  </div>
                  <h3 className="gradient-text-blue text-xl font-bold mb-3 font-heading">Innovation</h3>
                  <p className="dark:text-gray-300 text-gray-700">
                    We continuously push the boundaries of what's possible in protective coatings, investing in R&D to
                    develop solutions that address evolving challenges across industries.
                  </p>
                </div>

                <div className="bg-gradient-to-b from-gray-100/70 to-gray-200/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl p-8 shadow-xl dark:shadow-orange-600/5 border border-gray-200 dark:border-gray-700/50">
                  <div className="text-orange-500 dark:text-orange-400 mb-4">
                    <i className="fas fa-award text-4xl"></i>
                  </div>
                  <h3 className="gradient-text-fire text-xl font-bold mb-3 font-heading">Excellence</h3>
                  <p className="dark:text-gray-300 text-gray-700">
                    We are committed to the highest standards in everything we do, from product formulation to customer
                    service. Our dedication to quality ensures our solutions deliver exceptional performance.
                  </p>
                </div>

                <div className="bg-gradient-to-b from-gray-100/70 to-gray-200/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl p-8 shadow-xl dark:shadow-orange-600/5 border border-gray-200 dark:border-gray-700/50">
                  <div className="text-blue-500 dark:text-blue-400 mb-4">
                    <i className="fas fa-handshake text-4xl"></i>
                  </div>
                  <h3 className="gradient-text-blue text-xl font-bold mb-3 font-heading">Integrity</h3>
                  <p className="dark:text-gray-300 text-gray-700">
                    We operate with transparency and honesty in all our business relationships. Our customers, partners,
                    and employees can rely on us to act ethically and deliver on our promises.
                  </p>
                </div>

                <div className="bg-gradient-to-b from-gray-100/70 to-gray-200/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl p-8 shadow-xl dark:shadow-blue-600/5 border border-gray-200 dark:border-gray-700/50">
                  <div className="text-orange-500 dark:text-orange-400 mb-4">
                    <i className="fas fa-globe-americas text-4xl"></i>
                  </div>
                  <h3 className="gradient-text-fire text-xl font-bold mb-3 font-heading">Sustainability</h3>
                  <p className="dark:text-gray-300 text-gray-700">
                    Environmental responsibility is integrated into our product development and operations. We strive to
                    minimize our ecological footprint while helping our clients meet their sustainability goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Team;