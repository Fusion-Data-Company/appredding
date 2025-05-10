import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';

// Define the analytics data structure
export interface CRMAnalyticsData {
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

// Default data structure if no data is returned
export const defaultAnalyticsData: CRMAnalyticsData = {
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

export function useCRMAnalytics() {
  return useQuery<CRMAnalyticsData>({
    queryKey: ['/api/analytics'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    retry: 3, // Retry failed requests up to 3 times
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff with max 30s
    placeholderData: defaultAnalyticsData,
    staleTime: 1 * 60 * 1000 // Consider data stale after 1 minute
  });
}