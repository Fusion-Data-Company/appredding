import React from 'react';
import { Users, Building2, Briefcase, Activity } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';
import { useCRMAnalytics } from '@/hooks/use-crm-analytics';

// Helper function to format currency
const formatCurrency = (value: number): string => {
  if (value >= 1_000_000) {
    return '$' + (value / 1_000_000).toFixed(1) + 'M';
  } else if (value >= 1_000) {
    return '$' + (value / 1_000).toFixed(1) + 'K';
  }
  return '$' + value.toFixed(0);
};

const AnalyticsDashboard: React.FC = () => {
  const { data, isLoading, error } = useCRMAnalytics();

  if (error) {
    console.error('Error loading CRM analytics:', error);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <AnalyticsCard
        title="Contacts"
        description="Total contacts in system"
        value={data?.contacts.total || 0}
        subValue={data ? `+${data.contacts.newThisMonth} this month` : ''}
        icon={Users}
        iconColor="text-cyan-400"
        isGlowing={true}
        glowColor="cyan"
        isLoading={isLoading}
      />
      
      <AnalyticsCard
        title="Companies"
        description="Active companies"
        value={data?.companies.total || 0}
        subValue={data ? `+${data.companies.newThisMonth} this month` : ''}
        icon={Building2}
        iconColor="text-purple-400"
        animationDelay="0.1s"
        isLoading={isLoading}
      />
      
      <AnalyticsCard
        title="Opportunities"
        description="Active deals"
        value={data?.opportunities.active || 0}
        subValue={data ? `${formatCurrency(data.opportunities.pipelineValue)} pipeline` : ''}
        icon={Briefcase}
        iconColor="text-orange-400"
        isGlowing={true}
        glowColor="orange"
        animationDelay="0.2s"
        isLoading={isLoading}
      />
      
      <AnalyticsCard
        title="Activities"
        description="Pending activities"
        value={data?.activities.pending || 0}
        subValue={data ? `${data.activities.overdue} overdue` : ''}
        icon={Activity}
        iconColor="text-red-400"
        animationDelay="0.3s"
        isLoading={isLoading}
      />
    </div>
  );
};

export default AnalyticsDashboard;