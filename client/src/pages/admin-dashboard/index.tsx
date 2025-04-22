import { AdminProvider } from "@/hooks/useAdmin/useAdminContext";
import AdminLayout from "@/components/admin/Layout/AdminLayout";
import { useAdminContext } from "@/hooks/useAdmin/useAdminContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Placeholder components for the admin dashboard sections
const AdminDashboardContent = () => (
  <Card>
    <CardHeader>
      <CardTitle>Dashboard</CardTitle>
      <CardDescription>Overview of your business metrics</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Dashboard content will be implemented soon.</p>
    </CardContent>
  </Card>
);

const ContactsContent = () => (
  <Card>
    <CardHeader>
      <CardTitle>Contacts</CardTitle>
      <CardDescription>Manage your customer relationships</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Contacts content will be implemented soon.</p>
    </CardContent>
  </Card>
);

const CompaniesContent = () => (
  <Card>
    <CardHeader>
      <CardTitle>Companies</CardTitle>
      <CardDescription>Manage your business clients</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Companies content will be implemented soon.</p>
    </CardContent>
  </Card>
);

const OpportunitiesContent = () => (
  <Card>
    <CardHeader>
      <CardTitle>Opportunities</CardTitle>
      <CardDescription>Manage your sales pipeline</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Opportunities content will be implemented soon.</p>
    </CardContent>
  </Card>
);

const TasksContent = () => (
  <Card>
    <CardHeader>
      <CardTitle>Tasks</CardTitle>
      <CardDescription>Manage your team's activities</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Tasks content will be implemented soon.</p>
    </CardContent>
  </Card>
);

const CalendarContent = () => (
  <Card>
    <CardHeader>
      <CardTitle>Calendar</CardTitle>
      <CardDescription>Manage your schedule and appointments</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Calendar content will be implemented soon.</p>
    </CardContent>
  </Card>
);

const SocialMediaContent = () => (
  <Card>
    <CardHeader>
      <CardTitle>Social Media</CardTitle>
      <CardDescription>Manage your social media content and campaigns</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Social Media content will be implemented soon.</p>
    </CardContent>
  </Card>
);

const UsersContent = () => (
  <Card>
    <CardHeader>
      <CardTitle>User Management</CardTitle>
      <CardDescription>Manage user accounts and permissions</CardDescription>
    </CardHeader>
    <CardContent>
      <p>User Management content will be implemented soon.</p>
    </CardContent>
  </Card>
);

const SettingsContent = () => (
  <Card>
    <CardHeader>
      <CardTitle>Settings</CardTitle>
      <CardDescription>Manage your account and application preferences</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Settings content will be implemented soon.</p>
    </CardContent>
  </Card>
);

const AnalyticsContent = () => (
  <Card>
    <CardHeader>
      <CardTitle>Analytics</CardTitle>
      <CardDescription>Monitor your business performance</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Analytics content will be implemented soon.</p>
    </CardContent>
  </Card>
);

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