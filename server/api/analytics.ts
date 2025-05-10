import { Request, Response } from "express";
import { db } from "../db";
import { eq, count, sql, and, isNull, gt, lt } from "drizzle-orm";
import { contacts, companies, opportunities, activities, projectStatusEnum } from "@shared/schema";

/**
 * Get CRM dashboard analytics data
 */
export async function getCRMAnalytics(req: Request, res: Response) {
  try {
    // Get contacts count and new this month
    const contactsResult = await Promise.all([
      // Total contacts
      db.select({ count: count() }).from(contacts),
      // New contacts this month
      db.select({ count: count() }).from(contacts).where(
        sql`CAST(${contacts.createdAt} AS timestamp) > date_trunc('month', CURRENT_DATE)`
      )
    ]);

    // Get companies count and new this month
    const companiesResult = await Promise.all([
      // Total companies
      db.select({ count: count() }).from(companies),
      // New companies this month
      db.select({ count: count() }).from(companies).where(
        sql`CAST(${companies.createdAt} AS timestamp) > date_trunc('month', CURRENT_DATE)`
      )
    ]);

    // Get opportunities count and total amount
    const opportunitiesResult = await Promise.all([
      // Total in-progress opportunities
      db.select({ count: count() }).from(opportunities).where(
        and(
          sql`${opportunities.status} = 'in_progress'`,
          isNull(opportunities.actualCloseDate)
        )
      ),
      // Total pipeline value
      db.select({
        totalValue: sql<number>`SUM(amount)`
      }).from(opportunities).where(
        and(
          sql`${opportunities.status} = 'in_progress'`,
          isNull(opportunities.actualCloseDate)
        )
      )
    ]);

    // Get pending activities count and overdue count
    const activitiesResult = await Promise.all([
      // Total pending activities
      db.select({ count: count() }).from(activities).where(
        isNull(activities.completedAt)
      ),
      // Overdue activities
      db.select({ count: count() }).from(activities).where(
        and(
          isNull(activities.completedAt),
          lt(activities.scheduledAt, sql`CURRENT_TIMESTAMP`)
        )
      )
    ]);

    const analytics = {
      contacts: {
        total: contactsResult[0][0]?.count || 0,
        newThisMonth: contactsResult[1][0]?.count || 0
      },
      companies: {
        total: companiesResult[0][0]?.count || 0,
        newThisMonth: companiesResult[1][0]?.count || 0
      },
      opportunities: {
        active: opportunitiesResult[0][0]?.count || 0,
        pipelineValue: opportunitiesResult[1][0]?.totalValue || 0
      },
      activities: {
        pending: activitiesResult[0][0]?.count || 0,
        overdue: activitiesResult[1][0]?.count || 0
      }
    };

    res.json(analytics);
  } catch (error) {
    console.error("Error fetching CRM analytics:", error);
    res.status(500).json({ message: "Failed to fetch CRM analytics" });
  }
}