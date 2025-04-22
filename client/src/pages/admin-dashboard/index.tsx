import { AdminProvider } from "@/hooks/useAdmin/useAdminContext";
import AdminLayout from "@/components/admin/Layout/AdminLayout";
import AdminDashboardContent from "@/components/admin/Dashboard/AdminDashboardContent";
import ContactsContent from "@/components/admin/Contacts/ContactsContent";
import CompaniesContent from "@/components/admin/Companies/CompaniesContent";
import OpportunitiesContent from "@/components/admin/Opportunities/OpportunitiesContent";
import TasksContent from "@/components/admin/Tasks/TasksContent";
import CalendarContent from "@/components/admin/Calendar/CalendarContent";
import SocialMediaContent from "@/components/admin/SocialMedia/SocialMediaContent";
import UsersContent from "@/components/admin/UserManagement/UsersContent";
import SettingsContent from "@/components/admin/Settings/SettingsContent";
import AnalyticsContent from "@/components/admin/Analytics/AnalyticsContent";
import { useAdminContext } from "@/hooks/useAdmin/useAdminContext";

function AdminContent() {
  const { currentSection } = useAdminContext();

  // Render content based on the selected section
  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <AdminDashboardContent />;
      case 'contacts':
        return <ContactsContent />;
      case 'companies':
        return <CompaniesContent />;
      case 'opportunities':
        return <OpportunitiesContent />;
      case 'tasks':
        return <TasksContent />;
      case 'calendar':
        return <CalendarContent />;
      case 'social-media':
        return <SocialMediaContent />;
      case 'users':
        return <UsersContent />;
      case 'settings':
        return <SettingsContent />;
      case 'analytics':
        return <AnalyticsContent />;
      default:
        return <AdminDashboardContent />;
    }
  };

  return renderContent();
}

export default function AdminDashboard() {
  return (
    <AdminProvider>
      <AdminLayout>
        <AdminContent />
      </AdminLayout>
    </AdminProvider>
  );
}