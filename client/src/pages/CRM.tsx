import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CRMSection from "@/sections/CRMSection";
import { CRMHeader } from "@/components/ui/lamp";

const CRM = () => {
  return (
    <div className="min-h-screen flex flex-col bg-primary-dark">
      <Header />
      <main>
        <div className="container mx-auto px-4 pt-10">
          <CRMHeader />
        </div>
        <CRMSection />
      </main>
      <Footer />
    </div>
  );
};

export default CRM;