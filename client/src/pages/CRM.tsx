import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CRMSection from "@/sections/CRMSection";

const CRM = () => {
  return (
    <div className="min-h-screen flex flex-col bg-primary-dark">
      <Header />
      <main>
        <div className="py-20 bg-[#121212]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Team CRM Dashboard</h1>
              <p className="text-[#a0a0a0] max-w-2xl mx-auto">
                Access your customer relationship management tools and project tracking system.
              </p>
            </div>
          </div>
        </div>
        <CRMSection />
      </main>
      <Footer />
    </div>
  );
};

export default CRM;