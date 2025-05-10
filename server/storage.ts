import {
  users,
  contacts,
  companies,
  opportunities,
  activities,
  projects,
  projectFiles,
  projectUpdates,
  type User,
  type InsertUser,
  type Contact,
  type InsertContact,
  type Company,
  type InsertCompany,
  type Opportunity,
  type InsertOpportunity,
  type Activity,
  type InsertActivity,
  type Project,
  type InsertProject,
  type ProjectFile,
  type InsertProjectFile,
  type ProjectUpdate,
  type InsertProjectUpdate,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

// Create PostgreSQL session store
const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // Session store
  sessionStore: session.Store;
  
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User | undefined>;
  
  // Contact methods
  getContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContact(id: number, contactData: Partial<Contact>): Promise<Contact | undefined>;
  deleteContact(id: number): Promise<boolean>;
  
  // Company methods
  getCompanies(): Promise<Company[]>;
  getCompany(id: number): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;
  updateCompany(id: number, companyData: Partial<Company>): Promise<Company | undefined>;
  deleteCompany(id: number): Promise<boolean>;
  
  // Opportunity methods
  getOpportunities(clientId?: number): Promise<Opportunity[]>;
  getOpportunity(id: number): Promise<Opportunity | undefined>;
  createOpportunity(opportunity: InsertOpportunity): Promise<Opportunity>;
  updateOpportunity(id: number, opportunityData: Partial<Opportunity>): Promise<Opportunity | undefined>;
  deleteOpportunity(id: number): Promise<boolean>;
  
  // Activity methods
  getActivities(contactId?: number, companyId?: number, opportunityId?: number): Promise<Activity[]>;
  getActivity(id: number): Promise<Activity | undefined>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  updateActivity(id: number, activityData: Partial<Activity>): Promise<Activity | undefined>;
  deleteActivity(id: number): Promise<boolean>;
  
  // Project methods
  getProjects(clientId?: number): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getProjectsByClient(clientId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, projectData: Partial<Project>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Project files methods
  getProjectFiles(projectId: number): Promise<ProjectFile[]>;
  getProjectFile(id: number): Promise<ProjectFile | undefined>;
  createProjectFile(file: InsertProjectFile): Promise<ProjectFile>;
  deleteProjectFile(id: number): Promise<boolean>;
  
  // Project updates methods
  getProjectUpdates(projectId: number): Promise<ProjectUpdate[]>;
  createProjectUpdate(update: InsertProjectUpdate): Promise<ProjectUpdate>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;
  
  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true
    });
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }
  
  // Contact methods
  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }
  
  async getContact(id: number): Promise<Contact | undefined> {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async updateContact(id: number, contactData: Partial<Contact>): Promise<Contact | undefined> {
    const [updatedContact] = await db
      .update(contacts)
      .set({
        ...contactData,
        updatedAt: new Date(),
      })
      .where(eq(contacts.id, id))
      .returning();
    return updatedContact;
  }
  
  async deleteContact(id: number): Promise<boolean> {
    try {
      await db.delete(contacts).where(eq(contacts.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting contact:", error);
      return false;
    }
  }
  
  // Project methods
  async getProjects(clientId?: number): Promise<Project[]> {
    if (clientId) {
      return await db
        .select()
        .from(projects)
        .where(eq(projects.clientId, clientId))
        .orderBy(desc(projects.updatedAt));
    }
    return await db.select().from(projects).orderBy(desc(projects.updatedAt));
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }
  
  async getProjectsByClient(clientId: number): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.clientId, clientId))
      .orderBy(desc(projects.updatedAt));
  }
  
  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }
  
  async updateProject(id: number, projectData: Partial<Project>): Promise<Project | undefined> {
    const [updatedProject] = await db
      .update(projects)
      .set({
        ...projectData,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }
  
  async deleteProject(id: number): Promise<boolean> {
    try {
      await db.delete(projects).where(eq(projects.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting project:", error);
      return false;
    }
  }
  
  // Project files methods
  async getProjectFiles(projectId: number): Promise<ProjectFile[]> {
    return await db
      .select()
      .from(projectFiles)
      .where(eq(projectFiles.projectId, projectId))
      .orderBy(desc(projectFiles.createdAt));
  }
  
  async getProjectFile(id: number): Promise<ProjectFile | undefined> {
    const [file] = await db.select().from(projectFiles).where(eq(projectFiles.id, id));
    return file;
  }
  
  async createProjectFile(insertFile: InsertProjectFile): Promise<ProjectFile> {
    const [file] = await db.insert(projectFiles).values(insertFile).returning();
    return file;
  }
  
  async deleteProjectFile(id: number): Promise<boolean> {
    try {
      await db.delete(projectFiles).where(eq(projectFiles.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting project file:", error);
      return false;
    }
  }
  
  // Project updates methods
  async getProjectUpdates(projectId: number): Promise<ProjectUpdate[]> {
    return await db
      .select()
      .from(projectUpdates)
      .where(eq(projectUpdates.projectId, projectId))
      .orderBy(desc(projectUpdates.createdAt));
  }
  
  async createProjectUpdate(insertUpdate: InsertProjectUpdate): Promise<ProjectUpdate> {
    const [update] = await db.insert(projectUpdates).values(insertUpdate).returning();
    return update;
  }

  // ========================
  // CRM Company methods
  // ========================
  
  async getCompanies(): Promise<Company[]> {
    return await db
      .select()
      .from(companies)
      .orderBy(desc(companies.createdAt));
  }
  
  async getCompany(id: number): Promise<Company | undefined> {
    const [company] = await db
      .select()
      .from(companies)
      .where(eq(companies.id, id));
    return company;
  }
  
  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const [company] = await db
      .insert(companies)
      .values(insertCompany)
      .returning();
    return company;
  }
  
  async updateCompany(id: number, companyData: Partial<Company>): Promise<Company | undefined> {
    const [company] = await db
      .update(companies)
      .set({
        ...companyData,
        updatedAt: new Date(),
      })
      .where(eq(companies.id, id))
      .returning();
    return company;
  }
  
  async deleteCompany(id: number): Promise<boolean> {
    const result = await db
      .delete(companies)
      .where(eq(companies.id, id));
    return result.rowCount > 0;
  }
  
  // ========================
  // CRM Opportunity methods
  // ========================
  
  async getOpportunities(clientId?: number): Promise<Opportunity[]> {
    if (clientId) {
      return await db
        .select()
        .from(opportunities)
        .where(eq(opportunities.createdBy, clientId))
        .orderBy(desc(opportunities.createdAt));
    }
    
    return await db
      .select()
      .from(opportunities)
      .orderBy(desc(opportunities.createdAt));
  }
  
  async getOpportunity(id: number): Promise<Opportunity | undefined> {
    const [opportunity] = await db
      .select()
      .from(opportunities)
      .where(eq(opportunities.id, id));
    return opportunity;
  }
  
  async createOpportunity(insertOpportunity: InsertOpportunity): Promise<Opportunity> {
    const [opportunity] = await db
      .insert(opportunities)
      .values(insertOpportunity)
      .returning();
    return opportunity;
  }
  
  async updateOpportunity(id: number, opportunityData: Partial<Opportunity>): Promise<Opportunity | undefined> {
    const [opportunity] = await db
      .update(opportunities)
      .set({
        ...opportunityData,
        updatedAt: new Date(),
      })
      .where(eq(opportunities.id, id))
      .returning();
    return opportunity;
  }
  
  async deleteOpportunity(id: number): Promise<boolean> {
    const result = await db
      .delete(opportunities)
      .where(eq(opportunities.id, id));
    return result.rowCount > 0;
  }
  
  // ========================
  // CRM Activity methods
  // ========================
  
  async getActivities(contactId?: number, companyId?: number, opportunityId?: number): Promise<Activity[]> {
    let query = db.select().from(activities);
    
    if (contactId) {
      query = query.where(eq(activities.contactId, contactId));
    } else if (companyId) {
      query = query.where(eq(activities.companyId, companyId));
    } else if (opportunityId) {
      query = query.where(eq(activities.opportunityId, opportunityId));
    }
    
    return await query.orderBy(desc(activities.createdAt));
  }
  
  async getActivity(id: number): Promise<Activity | undefined> {
    const [activity] = await db
      .select()
      .from(activities)
      .where(eq(activities.id, id));
    return activity;
  }
  
  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const [activity] = await db
      .insert(activities)
      .values(insertActivity)
      .returning();
    return activity;
  }
  
  async updateActivity(id: number, activityData: Partial<Activity>): Promise<Activity | undefined> {
    const [activity] = await db
      .update(activities)
      .set({
        ...activityData,
        updatedAt: new Date(),
      })
      .where(eq(activities.id, id))
      .returning();
    return activity;
  }
  
  async deleteActivity(id: number): Promise<boolean> {
    const result = await db
      .delete(activities)
      .where(eq(activities.id, id));
    return result.rowCount > 0;
  }
}

export const storage = new DatabaseStorage();
