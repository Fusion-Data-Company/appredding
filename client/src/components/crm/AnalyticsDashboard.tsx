import React from 'react';
import { useCRMAnalytics, CRMAnalyticsData } from '@/hooks/use-crm-analytics';
import AnalyticsCard from './AnalyticsCard';
import { 
  Users, 
  Building2, 
  FileEdit, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  UserPlus,
  BarChart3,
  Check,
  Hourglass,
  CheckSquare,
  Clock
} from 'lucide-react';

export default function AnalyticsDashboard() {
  const { data, isLoading, error } = useCRMAnalytics();
  
  // Set up default values to avoid null/undefined errors
  // Use type assertion to fix TypeScript inference issues
  const analyticsData = data || {
    contacts: {
      total: 0,
      newThisMonth: 0,
      leadsThisMonth: 0,
      leadsConvertedThisMonth: 0
    },
    companies: {
      total: 0,
      newThisMonth: 0
    },
    opportunities: {
      total: 0,
      open: 0,
      won: 0,
      lost: 0,
      totalAmount: 0,
      wonAmount: 0,
      averageDealSize: 0,
      conversionRate: 0,
      averageSalesCycle: 0,
      winProbability: 0
    },
    activities: {
      total: 0,
      completed: 0,
      upcoming: 0,
      overdue: 0,
      completedThisWeek: 0,
      dueTomorrow: 0,
      overdueCritical: 0
    }
  };

  // Type assertion to overcome TypeScript type inference issues
  type AnalyticsWithProperties = {
    contacts: {
      total: number;
      newThisMonth: number;
      leadsThisMonth: number;
      leadsConvertedThisMonth: number;
    };
    companies: {
      total: number;
      newThisMonth: number;
    };
    opportunities: {
      total: number;
      open: number;
      won: number;
      lost: number;
      totalAmount: number;
      wonAmount: number;
      averageDealSize: number;
      conversionRate: number;
      averageSalesCycle: number;
      winProbability: number;
    };
    activities: {
      total: number;
      completed: number;
      upcoming: number;
      overdue: number;
      completedThisWeek: number;
      dueTomorrow: number;
      overdueCritical: number;
    };
  }
  
  // Use a direct type assertion to silence the TypeScript errors
  const typedData = analyticsData as unknown as AnalyticsWithProperties;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="card-base p-6 animate-pulse">
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 w-24 bg-gray-700 rounded"></div>
              <div className="h-10 w-10 rounded-full bg-gray-700"></div>
            </div>
            <div className="h-10 w-1/2 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-32 bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-premium p-8 text-center text-red-400">
        <h3 className="text-xl font-bold mb-4">Error Loading Analytics</h3>
        <p>There was a problem retrieving your analytics data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {/* Contacts Analytics */}
      <AnalyticsCard 
        title="Total Contacts" 
        value={typedData.contacts.total} 
        changePercent={typedData.contacts.newThisMonth > 0 ? 
          (typedData.contacts.newThisMonth / Math.max(1, typedData.contacts.total - typedData.contacts.newThisMonth) * 100).toFixed(0) : 0
        }
        changeText={`${typedData.contacts.newThisMonth} new this month`}
        icon={<Users />}
        glowColor="cyan"
      />
      
      <AnalyticsCard 
        title="Total Companies" 
        value={typedData.companies.total} 
        changePercent={typedData.companies.newThisMonth > 0 ? 
          (typedData.companies.newThisMonth / Math.max(1, typedData.companies.total - typedData.companies.newThisMonth) * 100).toFixed(0) : 0
        }
        changeText={`${typedData.companies.newThisMonth} new this month`}
        icon={<Building2 />}
        glowColor="orange"
      />
      
      <AnalyticsCard 
        title="Open Opportunities" 
        value={typedData.opportunities.open} 
        changeText={`$${(typedData.opportunities.totalAmount / 1000).toFixed(1)}k total value`}
        icon={<FileEdit />}
        glowColor="amber"
      />
      
      <AnalyticsCard 
        title="Conversion Rate" 
        value={`${typedData.opportunities.conversionRate}%`}
        changeText={`From ${typedData.opportunities.total} total opportunities`}
        icon={<TrendingUp />}
        glowColor="emerald"
      />
      
      {/* Activity Analytics */}
      <AnalyticsCard 
        title="Completed Activities" 
        value={typedData.activities.completed} 
        changePercent={typedData.activities.completedThisWeek > 0 ? 
          (typedData.activities.completedThisWeek / Math.max(1, typedData.activities.total) * 100).toFixed(0) : 0
        }
        changeText={`${typedData.activities.completedThisWeek} this week`}
        icon={<CheckSquare />}
        glowColor="green"
      />
      
      <AnalyticsCard 
        title="Upcoming Activities" 
        value={typedData.activities.upcoming}
        changeText={`${typedData.activities.dueTomorrow} due tomorrow`}
        icon={<Calendar />}
        glowColor="blue"
      />
      
      <AnalyticsCard 
        title="Overdue Activities" 
        value={typedData.activities.overdue}
        changeText={`${typedData.activities.overdueCritical} critical`}
        icon={<Clock />}
        glowColor="red"
      />
      
      <AnalyticsCard 
        title="Pipeline Value" 
        value={`$${(typedData.opportunities.totalAmount / 1000).toFixed(1)}k`}
        changeText={`${typedData.opportunities.winProbability}% avg. probability`}
        icon={<DollarSign />}
        glowColor="purple"
      />

      {/* Additional Analytics */}
      <AnalyticsCard 
        title="New Leads" 
        value={typedData.contacts.leadsThisMonth}
        changeText={`${typedData.contacts.leadsConvertedThisMonth} converted to customers`}
        icon={<UserPlus />}
        glowColor="indigo"
      />
      
      <AnalyticsCard 
        title="Deals Won" 
        value={typedData.opportunities.won}
        changeText={`$${(typedData.opportunities.wonAmount / 1000).toFixed(1)}k value`}
        icon={<BarChart3 />}
        glowColor="teal"
      />
      
      <AnalyticsCard 
        title="Avg. Deal Size" 
        value={`$${(typedData.opportunities.averageDealSize / 1000).toFixed(1)}k`}
        changeText={`From ${typedData.opportunities.total} opportunities`}
        icon={<DollarSign />}
        glowColor="yellow"
      />
      
      <AnalyticsCard 
        title="Avg. Sales Cycle" 
        value={`${typedData.opportunities.averageSalesCycle} days`}
        changeText={`Based on ${typedData.opportunities.won} closed deals`}
        icon={<Hourglass />}
        glowColor="lime"
      />
    </div>
  );
}