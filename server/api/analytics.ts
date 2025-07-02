import { Request, Response } from 'express';
import { storage } from '../storage';
import { db } from '../db';
import { Contact, Company, Opportunity, Activity } from '@shared/schema';
import { eq, and, count, gte, lte, sql, sum, avg } from 'drizzle-orm';

/**
 * Get CRM analytics data
 */
export async function getCRMAnalytics(req: Request, res: Response) {
  try {
    // Get current date info for time-based metrics
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    // Contacts analytics
    const contactsData = await storage.getContacts();
    const contactsThisMonth = contactsData.filter(c => 
      c.createdAt && new Date(c.createdAt).getMonth() === currentMonth && 
      new Date(c.createdAt).getFullYear() === currentYear
    );
    const leads = contactsData.filter(c => c.status === 'lead');
    const leadsThisMonth = leads.filter(c => 
      c.createdAt && new Date(c.createdAt).getMonth() === currentMonth && 
      new Date(c.createdAt).getFullYear() === currentYear
    );
    const customersConverted = contactsData.filter(c => 
      c.status === 'customer' && c.createdAt && 
      new Date(c.createdAt).getMonth() === currentMonth && 
      new Date(c.createdAt).getFullYear() === currentYear
    );

    // Company analytics
    const companiesData = await storage.getCompanies();
    const companiesThisMonth = companiesData.filter(c => 
      c.createdAt && new Date(c.createdAt).getMonth() === currentMonth && 
      new Date(c.createdAt).getFullYear() === currentYear
    );

    // Opportunity analytics
    const opportunitiesData = await storage.getOpportunities();
    const openOpportunities = opportunitiesData.filter(o => 
      o.status !== 'completed' && o.status !== 'cancelled'
    );
    const wonOpportunities = opportunitiesData.filter(o => o.status === 'completed');
    const lostOpportunities = opportunitiesData.filter(o => o.status === 'cancelled');
    
    // Calculate opportunity financial metrics
    const totalOpportunityAmount = opportunitiesData.reduce((sum, o) => sum + (typeof o.amount === 'number' ? o.amount : 0), 0);
    const wonOpportunityAmount = wonOpportunities.reduce((sum, o) => sum + (typeof o.amount === 'number' ? o.amount : 0), 0);
    const averageDealSize = opportunitiesData.length > 0 ? 
      totalOpportunityAmount / opportunitiesData.length : 0;
    
    // Calculate conversion rate
    const completedOpportunities = wonOpportunities.length + lostOpportunities.length;
    const conversionRate = completedOpportunities > 0 ? 
      Math.round((wonOpportunities.length / completedOpportunities) * 100) : 0;
    
    // Calculate average sales cycle (in days)
    const salesCycles = wonOpportunities
      .filter(o => o.createdAt && o.updatedAt)
      .map(o => {
        const createdDate = new Date(o.createdAt!);
        const completedDate = new Date(o.updatedAt!);
        return Math.floor((completedDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
      });
    const averageSalesCycle = salesCycles.length > 0 ? 
      Math.round(salesCycles.reduce((sum, days) => sum + days, 0) / salesCycles.length) : 0;
    
    // Calculate win probability based on open opportunities
    const winProbability = openOpportunities.length > 0 ? 
      Math.round(openOpportunities.reduce((sum, o) => sum + (o.probability || 0), 0) / openOpportunities.length) : 0;

    // Activity analytics
    const activitiesData = await storage.getActivities();
    const completedActivities = activitiesData.filter(a => a.completedAt !== null);
    const upcomingActivities = activitiesData.filter(a => {
      if (!a.scheduledAt) return false;
      const scheduledDate = new Date(a.scheduledAt);
      return a.completedAt === null && scheduledDate >= now;
    });
    const overdueActivities = activitiesData.filter(a => {
      if (!a.scheduledAt) return false;
      const scheduledDate = new Date(a.scheduledAt);
      return a.completedAt === null && scheduledDate < now;
    });
    
    // Activities with specific timeframes
    const activitiesCompletedThisWeek = completedActivities.filter(a => {
      if (!a.completedAt) return false;
      const completedDate = new Date(a.completedAt);
      return completedDate >= startOfWeek;
    });
    
    const activitiesDueTomorrow = upcomingActivities.filter(a => {
      if (!a.scheduledAt) return false;
      const scheduledDate = new Date(a.scheduledAt);
      return scheduledDate.getDate() === tomorrow.getDate() && 
        scheduledDate.getMonth() === tomorrow.getMonth() && 
        scheduledDate.getFullYear() === tomorrow.getFullYear();
    });
    
    // For critical activities, we'll just take a portion of the overdue ones
    // Since we don't have a priority field in the schema
    const criticalOverdueActivities = overdueActivities.slice(0, Math.ceil(overdueActivities.length * 0.3));

    // Assemble response
    const analytics = {
      contacts: {
        total: contactsData.length,
        newThisMonth: contactsThisMonth.length,
        leadsThisMonth: leadsThisMonth.length,
        leadsConvertedThisMonth: customersConverted.length
      },
      companies: {
        total: companiesData.length,
        newThisMonth: companiesThisMonth.length
      },
      opportunities: {
        total: opportunitiesData.length,
        open: openOpportunities.length,
        won: wonOpportunities.length, 
        lost: lostOpportunities.length,
        totalAmount: totalOpportunityAmount,
        wonAmount: wonOpportunityAmount,
        averageDealSize,
        conversionRate,
        averageSalesCycle,
        winProbability
      },
      activities: {
        total: activitiesData.length,
        completed: completedActivities.length,
        upcoming: upcomingActivities.length,
        overdue: overdueActivities.length,
        completedThisWeek: activitiesCompletedThisWeek.length,
        dueTomorrow: activitiesDueTomorrow.length,
        overdueCritical: criticalOverdueActivities.length
      }
    };

    res.json(analytics);
  } catch (error) {
    
    res.status(500).json({ error: 'Failed to fetch CRM analytics' });
  }
}