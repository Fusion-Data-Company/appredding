import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CRMSection from "@/sections/CRMSection";
import { CRMHeader } from "@/components/crm/CRMHeader";

const CRM = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main>
        <div className="container mx-auto px-4 pt-24 bg-black">
          <CRMHeader />
        </div>
        <CRMSection />
      </main>
      <Footer />
    </div>
  );
};

export default CRM;