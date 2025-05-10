import MainLayout from "@/components/layout/MainLayout";
import CRMSection from "@/sections/CRMSection";
import { CRMHeader } from "@/components/crm/CRMHeader";

const CRM = () => {
  return (
    <MainLayout fullWidth={true}>
      <div className="bg-black">
        <div className="container mx-auto px-4 pt-6">
          <CRMHeader />
        </div>
        <CRMSection />
      </div>
    </MainLayout>
  );
};

export default CRM;