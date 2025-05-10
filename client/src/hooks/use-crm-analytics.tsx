import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "../lib/queryClient";

export interface CRMAnalyticsData {
  contacts: {
    total: number;
    newThisMonth: number;
  };
  companies: {
    total: number;
    newThisMonth: number;
  };
  opportunities: {
    active: number;
    pipelineValue: number;
  };
  activities: {
    pending: number;
    overdue: number;
  };
}

export function useCRMAnalytics() {
  return useQuery<CRMAnalyticsData>({
    queryKey: ["/api/crm/analytics"],
    queryFn: getQueryFn({ on401: "throw" }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}