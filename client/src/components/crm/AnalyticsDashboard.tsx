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
  const analyticsData: CRMAnalyticsData = data || {
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
        value={analyticsData.contacts.total} 
        changePercent={analyticsData.contacts.newThisMonth > 0 ? 
          (analyticsData.contacts.newThisMonth / Math.max(1, analyticsData.contacts.total - analyticsData.contacts.newThisMonth) * 100).toFixed(0) : 0
        }
        changeText={`${analyticsData.contacts.newThisMonth} new this month`}
        icon={<Users />}
        glowColor="cyan"
      />
      
      <AnalyticsCard 
        title="Total Companies" 
        value={analyticsData.companies.total} 
        changePercent={analyticsData.companies.newThisMonth > 0 ? 
          (analyticsData.companies.newThisMonth / Math.max(1, analyticsData.companies.total - analyticsData.companies.newThisMonth) * 100).toFixed(0) : 0
        }
        changeText={`${analyticsData.companies.newThisMonth} new this month`}
        icon={<Building2 />}
        glowColor="orange"
      />
      
      <AnalyticsCard 
        title="Open Opportunities" 
        value={analyticsData.opportunities.open} 
        changeText={`$${(analyticsData.opportunities.totalAmount / 1000).toFixed(1)}k total value`}
        icon={<FileEdit />}
        glowColor="amber"
      />
      
      <AnalyticsCard 
        title="Conversion Rate" 
        value={`${analyticsData.opportunities.conversionRate}%`}
        changeText={`From ${analyticsData.opportunities.total} total opportunities`}
        icon={<TrendingUp />}
        glowColor="emerald"
      />
      
      {/* Activity Analytics */}
      <AnalyticsCard 
        title="Completed Activities" 
        value={analyticsData.activities.completed} 
        changePercent={analyticsData.activities.completedThisWeek > 0 ? 
          (analyticsData.activities.completedThisWeek / Math.max(1, analyticsData.activities.total) * 100).toFixed(0) : 0
        }
        changeText={`${analyticsData.activities.completedThisWeek} this week`}
        icon={<CheckSquare />}
        glowColor="green"
      />
      
      <AnalyticsCard 
        title="Upcoming Activities" 
        value={analyticsData.activities.upcoming}
        changeText={`${analyticsData.activities.dueTomorrow} due tomorrow`}
        icon={<Calendar />}
        glowColor="blue"
      />
      
      <AnalyticsCard 
        title="Overdue Activities" 
        value={analyticsData.activities.overdue}
        changeText={`${analyticsData.activities.overdueCritical} critical`}
        icon={<Clock />}
        glowColor="red"
      />
      
      <AnalyticsCard 
        title="Pipeline Value" 
        value={`$${(analyticsData.opportunities.totalAmount / 1000).toFixed(1)}k`}
        changeText={`${analyticsData.opportunities.winProbability}% avg. probability`}
        icon={<DollarSign />}
        glowColor="purple"
      />

      {/* Additional Analytics */}
      <AnalyticsCard 
        title="New Leads" 
        value={analyticsData.contacts.leadsThisMonth}
        changeText={`${analyticsData.contacts.leadsConvertedThisMonth} converted to customers`}
        icon={<UserPlus />}
        glowColor="indigo"
      />
      
      <AnalyticsCard 
        title="Deals Won" 
        value={analyticsData.opportunities.won}
        changeText={`$${(analyticsData.opportunities.wonAmount / 1000).toFixed(1)}k value`}
        icon={<BarChart3 />}
        glowColor="teal"
      />
      
      <AnalyticsCard 
        title="Avg. Deal Size" 
        value={`$${(analyticsData.opportunities.averageDealSize / 1000).toFixed(1)}k`}
        changeText={`From ${analyticsData.opportunities.total} opportunities`}
        icon={<DollarSign />}
        glowColor="yellow"
      />
      
      <AnalyticsCard 
        title="Avg. Sales Cycle" 
        value={`${analyticsData.opportunities.averageSalesCycle} days`}
        changeText={`Based on ${analyticsData.opportunities.won} closed deals`}
        icon={<Hourglass />}
        glowColor="lime"
      />
    </div>
  );
}