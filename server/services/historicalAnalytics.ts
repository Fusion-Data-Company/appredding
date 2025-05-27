import { db } from "../db";
import { customers, customerDocuments } from "@shared/schema";
import { eq, gte, lte, and, count, sum, avg, desc, asc, sql } from "drizzle-orm";

/**
 * Advanced Analytics for 25+ Years of Advance Power Customer Data
 * Optimized for handling large volumes of historical solar installation data
 */

export interface YearlyStats {
  year: number;
  totalInstallations: number;
  totalSystemCapacity: number; // kW
  averageSystemSize: number;
  totalRevenue: number;
  customerCount: number;
  activeCustomers: number;
  maintenanceCalls: number;
}

export interface CustomersByDecade {
  decade: string;
  count: number;
  totalCapacity: number;
  averageSystemSize: number;
}

export interface GeographicAnalysis {
  zipCode: string;
  customerCount: number;
  totalCapacity: number;
  averageSystemCost: number;
  lastInstallation: string;
}

/**
 * Get comprehensive yearly statistics for business analysis
 * Optimized with indexed queries for fast performance
 */
export async function getYearlyAnalytics(startYear?: number, endYear?: number): Promise<YearlyStats[]> {
  const currentYear = new Date().getFullYear();
  const fromYear = startYear || 1999; // Company founded in 1999
  const toYear = endYear || currentYear;

  try {
    const results = await db
      .select({
        year: customers.installationYear,
        totalInstallations: count(customers.id),
        totalSystemCapacity: sum(customers.systemSize),
        averageSystemSize: avg(customers.systemSize),
        totalRevenue: sum(customers.lifetimeValue),
        activeCustomers: sql<number>`COUNT(CASE WHEN ${customers.accountStatus} = 'active' THEN 1 END)`,
        maintenanceCalls: sum(customers.serviceCallsCount),
      })
      .from(customers)
      .where(
        and(
          gte(customers.installationYear, fromYear),
          lte(customers.installationYear, toYear)
        )
      )
      .groupBy(customers.installationYear)
      .orderBy(asc(customers.installationYear));

    return results.map(row => ({
      year: row.year || 0,
      totalInstallations: Number(row.totalInstallations),
      totalSystemCapacity: Number(row.totalSystemCapacity) || 0,
      averageSystemSize: Number(row.averageSystemSize) || 0,
      totalRevenue: Number(row.totalRevenue) || 0,
      customerCount: Number(row.totalInstallations),
      activeCustomers: Number(row.activeCustomers),
      maintenanceCalls: Number(row.maintenanceCalls) || 0,
    }));
  } catch (error) {
    console.error('Error fetching yearly analytics:', error);
    return [];
  }
}

/**
 * Analyze customer distribution by decades for historical perspective
 */
export async function getCustomersByDecade(): Promise<CustomersByDecade[]> {
  try {
    const results = await db
      .select({
        decade: sql<string>`FLOOR(${customers.installationYear} / 10) * 10 || 's'`,
        count: count(customers.id),
        totalCapacity: sum(customers.systemSize),
        averageSystemSize: avg(customers.systemSize),
      })
      .from(customers)
      .where(sql`${customers.installationYear} IS NOT NULL`)
      .groupBy(sql`FLOOR(${customers.installationYear} / 10) * 10`)
      .orderBy(sql`FLOOR(${customers.installationYear} / 10) * 10`);

    return results.map(row => ({
      decade: row.decade || 'Unknown',
      count: Number(row.count),
      totalCapacity: Number(row.totalCapacity) || 0,
      averageSystemSize: Number(row.averageSystemSize) || 0,
    }));
  } catch (error) {
    console.error('Error fetching customers by decade:', error);
    return [];
  }
}

/**
 * Geographic analysis for Shasta County service areas
 */
export async function getGeographicAnalysis(): Promise<GeographicAnalysis[]> {
  try {
    const results = await db
      .select({
        zipCode: customers.zipCode,
        customerCount: count(customers.id),
        totalCapacity: sum(customers.systemSize),
        averageSystemCost: avg(customers.systemCost),
        lastInstallation: sql<string>`MAX(${customers.installationDate})`,
      })
      .from(customers)
      .where(sql`${customers.zipCode} IS NOT NULL`)
      .groupBy(customers.zipCode)
      .orderBy(desc(count(customers.id)));

    return results.map(row => ({
      zipCode: row.zipCode || 'Unknown',
      customerCount: Number(row.customerCount),
      totalCapacity: Number(row.totalCapacity) || 0,
      averageSystemCost: Number(row.averageSystemCost) || 0,
      lastInstallation: row.lastInstallation || 'Unknown',
    }));
  } catch (error) {
    console.error('Error fetching geographic analysis:', error);
    return [];
  }
}

/**
 * Get customers by specific year with pagination for large datasets
 */
export async function getCustomersByYear(
  year: number, 
  limit: number = 50, 
  offset: number = 0
) {
  try {
    const customersByYear = await db
      .select()
      .from(customers)
      .where(eq(customers.installationYear, year))
      .orderBy(desc(customers.installationDate))
      .limit(limit)
      .offset(offset);

    const totalCount = await db
      .select({ count: count(customers.id) })
      .from(customers)
      .where(eq(customers.installationYear, year));

    return {
      customers: customersByYear,
      totalCount: Number(totalCount[0]?.count || 0),
      hasMore: (offset + limit) < Number(totalCount[0]?.count || 0),
    };
  } catch (error) {
    console.error('Error fetching customers by year:', error);
    return { customers: [], totalCount: 0, hasMore: false };
  }
}

/**
 * Search customers across all years with full-text search capabilities
 */
export async function searchCustomersAcrossYears(
  searchTerm: string, 
  yearFrom?: number, 
  yearTo?: number,
  limit: number = 50,
  offset: number = 0
) {
  try {
    let whereConditions = sql`(
      ${customers.fullName} ILIKE ${`%${searchTerm}%`} OR
      ${customers.address} ILIKE ${`%${searchTerm}%`} OR
      ${customers.email} ILIKE ${`%${searchTerm}%`} OR
      ${customers.phone} ILIKE ${`%${searchTerm}%`}
    )`;

    if (yearFrom && yearTo) {
      whereConditions = and(
        whereConditions,
        gte(customers.installationYear, yearFrom),
        lte(customers.installationYear, yearTo)
      );
    }

    const searchResults = await db
      .select()
      .from(customers)
      .where(whereConditions)
      .orderBy(desc(customers.customerSince))
      .limit(limit)
      .offset(offset);

    const totalCount = await db
      .select({ count: count(customers.id) })
      .from(customers)
      .where(whereConditions);

    return {
      customers: searchResults,
      totalCount: Number(totalCount[0]?.count || 0),
      hasMore: (offset + limit) < Number(totalCount[0]?.count || 0),
    };
  } catch (error) {
    console.error('Error searching customers across years:', error);
    return { customers: [], totalCount: 0, hasMore: false };
  }
}

/**
 * Get maintenance and service analytics by year
 */
export async function getServiceAnalyticsByYear() {
  try {
    const results = await db
      .select({
        year: sql<number>`EXTRACT(YEAR FROM ${customers.lastServiceDate})`,
        totalServiceCalls: sum(customers.serviceCallsCount),
        customersServiced: count(customers.id),
        averageServiceCalls: avg(customers.serviceCallsCount),
      })
      .from(customers)
      .where(sql`${customers.lastServiceDate} IS NOT NULL`)
      .groupBy(sql`EXTRACT(YEAR FROM ${customers.lastServiceDate})`)
      .orderBy(sql`EXTRACT(YEAR FROM ${customers.lastServiceDate}) DESC`);

    return results.map(row => ({
      year: Number(row.year) || 0,
      totalServiceCalls: Number(row.totalServiceCalls) || 0,
      customersServiced: Number(row.customersServiced),
      averageServiceCalls: Number(row.averageServiceCalls) || 0,
    }));
  } catch (error) {
    console.error('Error fetching service analytics by year:', error);
    return [];
  }
}

/**
 * Get system technology trends over the years
 */
export async function getTechnologyTrends() {
  try {
    const results = await db
      .select({
        year: customers.installationYear,
        inverterType: customers.inverterType,
        batterySystemCount: sql<number>`COUNT(CASE WHEN ${customers.batterySystem} = true THEN 1 END)`,
        totalInstallations: count(customers.id),
        averageSystemSize: avg(customers.systemSize),
      })
      .from(customers)
      .where(sql`${customers.installationYear} IS NOT NULL`)
      .groupBy(customers.installationYear, customers.inverterType)
      .orderBy(asc(customers.installationYear));

    return results.map(row => ({
      year: Number(row.year) || 0,
      inverterType: row.inverterType || 'Unknown',
      batterySystemCount: Number(row.batterySystemCount),
      totalInstallations: Number(row.totalInstallations),
      averageSystemSize: Number(row.averageSystemSize) || 0,
      batteryPercentage: Number(row.totalInstallations) > 0 
        ? (Number(row.batterySystemCount) / Number(row.totalInstallations)) * 100 
        : 0,
    }));
  } catch (error) {
    console.error('Error fetching technology trends:', error);
    return [];
  }
}