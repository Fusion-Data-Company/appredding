import {
  users,
  contacts,
  companies,
  opportunities,
  activities,
  projects,
  projectFiles,
  projectUpdates,
  painters,
  poolProfessionals,
  municipalityProfessionals,
  constructionDistributors,
  marinaProfessionals,
  mobileHomeProfessionals,
  firePreventionHomeowners,
  professionalReviews,
  taskStatusEnum,
  socialMediaPosts,
  marketingCampaigns,
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
  type SocialMediaPost,
  type InsertSocialMediaPost,
  type MarketingCampaign,
  type InsertMarketingCampaign,
  type ProjectFile,
  type InsertProjectFile,
  type ProjectUpdate,
  type InsertProjectUpdate,
  type Painter,
  type InsertPainter,
  type PoolProfessional,
  type InsertPoolProfessional,
  type MunicipalityProfessional,
  type InsertMunicipalityProfessional,
  type ConstructionDistributor,
  type InsertConstructionDistributor,
  type MarinaProfessional,
  type InsertMarinaProfessional,
  type MobileHomeProfessional,
  type InsertMobileHomeProfessional,
  type FirePreventionHomeowner,
  type InsertFirePreventionHomeowner,
  type ProfessionalReview,
  type InsertProfessionalReview,
  type Task,
  type InsertTask,
  tasks,
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
  
  // Social Media methods
  getSocialMediaPosts(filters?: {status?: string, platform?: string, campaignId?: number}): Promise<SocialMediaPost[]>;
  getSocialMediaPost(id: number): Promise<SocialMediaPost | undefined>;
  createSocialMediaPost(post: InsertSocialMediaPost): Promise<SocialMediaPost>;
  updateSocialMediaPost(id: number, postData: Partial<SocialMediaPost>): Promise<SocialMediaPost | undefined>;
  deleteSocialMediaPost(id: number): Promise<boolean>;
  
  // Marketing Campaign methods
  getMarketingCampaigns(status?: string): Promise<MarketingCampaign[]>;
  getMarketingCampaign(id: number): Promise<MarketingCampaign | undefined>;
  createMarketingCampaign(campaign: InsertMarketingCampaign): Promise<MarketingCampaign>;
  updateMarketingCampaign(id: number, campaignData: Partial<MarketingCampaign>): Promise<MarketingCampaign | undefined>;
  deleteMarketingCampaign(id: number): Promise<boolean>;
  
  // Project files methods
  getProjectFiles(projectId: number): Promise<ProjectFile[]>;
  getProjectFile(id: number): Promise<ProjectFile | undefined>;
  createProjectFile(file: InsertProjectFile): Promise<ProjectFile>;
  deleteProjectFile(id: number): Promise<boolean>;
  
  // Project updates methods
  getProjectUpdates(projectId: number): Promise<ProjectUpdate[]>;
  createProjectUpdate(update: InsertProjectUpdate): Promise<ProjectUpdate>;
  
  // Painter professional methods
  getPainters(): Promise<Painter[]>;
  getPainter(id: number): Promise<Painter | undefined>;
  getPainterByEmail(email: string): Promise<Painter | undefined>;
  createPainter(painter: InsertPainter): Promise<Painter>;
  updatePainter(id: number, painterData: Partial<Painter>): Promise<Painter | undefined>;
  
  // Pool professional methods
  getPoolProfessionals(): Promise<PoolProfessional[]>;
  getPoolProfessional(id: number): Promise<PoolProfessional | undefined>;
  getPoolProfessionalByEmail(email: string): Promise<PoolProfessional | undefined>;
  createPoolProfessional(professional: InsertPoolProfessional): Promise<PoolProfessional>;
  updatePoolProfessional(id: number, professionalData: Partial<PoolProfessional>): Promise<PoolProfessional | undefined>;
  
  // Municipality professional methods
  getMunicipalityProfessionals(): Promise<MunicipalityProfessional[]>;
  getMunicipalityProfessional(id: number): Promise<MunicipalityProfessional | undefined>;
  getMunicipalityProfessionalByEmail(email: string): Promise<MunicipalityProfessional | undefined>;
  createMunicipalityProfessional(professional: InsertMunicipalityProfessional): Promise<MunicipalityProfessional>;
  updateMunicipalityProfessional(id: number, professionalData: Partial<MunicipalityProfessional>): Promise<MunicipalityProfessional | undefined>;
  
  // Construction distributor methods
  getConstructionDistributors(): Promise<ConstructionDistributor[]>;
  getConstructionDistributor(id: number): Promise<ConstructionDistributor | undefined>;
  getConstructionDistributorByEmail(email: string): Promise<ConstructionDistributor | undefined>;
  createConstructionDistributor(distributor: InsertConstructionDistributor): Promise<ConstructionDistributor>;
  updateConstructionDistributor(id: number, distributorData: Partial<ConstructionDistributor>): Promise<ConstructionDistributor | undefined>;
  
  // Marina professional methods
  getMarinaProfessionals(): Promise<MarinaProfessional[]>;
  getMarinaProfessional(id: number): Promise<MarinaProfessional | undefined>;
  getMarinaProfessionalByEmail(email: string): Promise<MarinaProfessional | undefined>;
  createMarinaProfessional(professional: InsertMarinaProfessional): Promise<MarinaProfessional>;
  updateMarinaProfessional(id: number, professionalData: Partial<MarinaProfessional>): Promise<MarinaProfessional | undefined>;
  
  // Mobile home professional methods
  getMobileHomeProfessionals(): Promise<MobileHomeProfessional[]>;
  getMobileHomeProfessional(id: number): Promise<MobileHomeProfessional | undefined>;
  getMobileHomeProfessionalByEmail(email: string): Promise<MobileHomeProfessional | undefined>;
  createMobileHomeProfessional(professional: InsertMobileHomeProfessional): Promise<MobileHomeProfessional>;
  updateMobileHomeProfessional(id: number, professionalData: Partial<MobileHomeProfessional>): Promise<MobileHomeProfessional | undefined>;
  
  // Fire prevention homeowner methods
  getFirePreventionHomeowners(): Promise<FirePreventionHomeowner[]>;
  getFirePreventionHomeowner(id: number): Promise<FirePreventionHomeowner | undefined>;
  getFirePreventionHomeownerByEmail(email: string): Promise<FirePreventionHomeowner | undefined>;
  createFirePreventionHomeowner(homeowner: InsertFirePreventionHomeowner): Promise<FirePreventionHomeowner>;
  updateFirePreventionHomeowner(id: number, homeownerData: Partial<FirePreventionHomeowner>): Promise<FirePreventionHomeowner | undefined>;
  
  // Professional review methods
  getProfessionalReviews(professionalType: string, professionalId: number): Promise<ProfessionalReview[]>;
  createProfessionalReview(review: InsertProfessionalReview): Promise<ProfessionalReview>;
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
  // CRM Task methods
  // ========================
  
  async getTasks(assignedToId?: number, status?: string): Promise<Task[]> {
    let query = db.select().from(tasks);
    
    if (assignedToId) {
      query = query.where(eq(tasks.assignedTo, assignedToId));
    }
    
    if (status && status in taskStatusEnum.enumValues) {
      query = query.where(eq(tasks.status, status as any));
    }
    
    return await query.orderBy(desc(tasks.createdAt));
  }
  
  async getTask(id: number): Promise<Task | undefined> {
    const [task] = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, id));
    return task;
  }
  
  async createTask(insertTask: InsertTask): Promise<Task> {
    const [task] = await db
      .insert(tasks)
      .values(insertTask)
      .returning();
    return task;
  }
  
  async updateTask(id: number, taskData: Partial<Task>): Promise<Task | undefined> {
    const [task] = await db
      .update(tasks)
      .set({
        ...taskData,
        updatedAt: new Date(),
      })
      .where(eq(tasks.id, id))
      .returning();
    return task;
  }
  
  async deleteTask(id: number): Promise<boolean> {
    try {
      await db.delete(tasks).where(eq(tasks.id, id));
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      return false;
    }
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
    return result.rowCount ? result.rowCount > 0 : false;
  }

  // Painter methods
  async getPainters(): Promise<Painter[]> {
    return await db.select().from(painters).orderBy(desc(painters.createdAt));
  }

  async getPainter(id: number): Promise<Painter | undefined> {
    const [painter] = await db.select().from(painters).where(eq(painters.id, id));
    return painter;
  }

  async getPainterByEmail(email: string): Promise<Painter | undefined> {
    const [painter] = await db.select().from(painters).where(eq(painters.email, email));
    return painter;
  }

  async createPainter(insertPainter: InsertPainter): Promise<Painter> {
    const [painter] = await db.insert(painters).values(insertPainter).returning();
    return painter;
  }

  async updatePainter(id: number, painterData: Partial<Painter>): Promise<Painter | undefined> {
    const [updatedPainter] = await db
      .update(painters)
      .set(painterData)
      .where(eq(painters.id, id))
      .returning();
    return updatedPainter;
  }

  // Pool Professional methods
  async getPoolProfessionals(): Promise<PoolProfessional[]> {
    return await db.select().from(poolProfessionals).orderBy(desc(poolProfessionals.createdAt));
  }

  async getPoolProfessional(id: number): Promise<PoolProfessional | undefined> {
    const [professional] = await db.select().from(poolProfessionals).where(eq(poolProfessionals.id, id));
    return professional;
  }

  async getPoolProfessionalByEmail(email: string): Promise<PoolProfessional | undefined> {
    const [professional] = await db.select().from(poolProfessionals).where(eq(poolProfessionals.email, email));
    return professional;
  }

  async createPoolProfessional(insertProfessional: InsertPoolProfessional): Promise<PoolProfessional> {
    const [professional] = await db.insert(poolProfessionals).values(insertProfessional).returning();
    return professional;
  }

  async updatePoolProfessional(id: number, professionalData: Partial<PoolProfessional>): Promise<PoolProfessional | undefined> {
    const [updatedProfessional] = await db
      .update(poolProfessionals)
      .set(professionalData)
      .where(eq(poolProfessionals.id, id))
      .returning();
    return updatedProfessional;
  }

  // Municipality Professional methods
  async getMunicipalityProfessionals(): Promise<MunicipalityProfessional[]> {
    return await db.select().from(municipalityProfessionals).orderBy(desc(municipalityProfessionals.createdAt));
  }

  async getMunicipalityProfessional(id: number): Promise<MunicipalityProfessional | undefined> {
    const [professional] = await db.select().from(municipalityProfessionals).where(eq(municipalityProfessionals.id, id));
    return professional;
  }

  async getMunicipalityProfessionalByEmail(email: string): Promise<MunicipalityProfessional | undefined> {
    const [professional] = await db.select().from(municipalityProfessionals).where(eq(municipalityProfessionals.email, email));
    return professional;
  }

  async createMunicipalityProfessional(insertProfessional: InsertMunicipalityProfessional): Promise<MunicipalityProfessional> {
    const [professional] = await db.insert(municipalityProfessionals).values(insertProfessional).returning();
    return professional;
  }

  async updateMunicipalityProfessional(id: number, professionalData: Partial<MunicipalityProfessional>): Promise<MunicipalityProfessional | undefined> {
    const [updatedProfessional] = await db
      .update(municipalityProfessionals)
      .set(professionalData)
      .where(eq(municipalityProfessionals.id, id))
      .returning();
    return updatedProfessional;
  }

  // Construction Distributor methods
  async getConstructionDistributors(): Promise<ConstructionDistributor[]> {
    return await db.select().from(constructionDistributors).orderBy(desc(constructionDistributors.createdAt));
  }

  async getConstructionDistributor(id: number): Promise<ConstructionDistributor | undefined> {
    const [distributor] = await db.select().from(constructionDistributors).where(eq(constructionDistributors.id, id));
    return distributor;
  }

  async getConstructionDistributorByEmail(email: string): Promise<ConstructionDistributor | undefined> {
    const [distributor] = await db.select().from(constructionDistributors).where(eq(constructionDistributors.email, email));
    return distributor;
  }

  async createConstructionDistributor(insertDistributor: InsertConstructionDistributor): Promise<ConstructionDistributor> {
    const [distributor] = await db.insert(constructionDistributors).values(insertDistributor).returning();
    return distributor;
  }

  async updateConstructionDistributor(id: number, distributorData: Partial<ConstructionDistributor>): Promise<ConstructionDistributor | undefined> {
    const [updatedDistributor] = await db
      .update(constructionDistributors)
      .set(distributorData)
      .where(eq(constructionDistributors.id, id))
      .returning();
    return updatedDistributor;
  }
  
  // Marina professional methods
  async getMarinaProfessionals(): Promise<MarinaProfessional[]> {
    return await db.select().from(marinaProfessionals);
  }
  
  async getMarinaProfessional(id: number): Promise<MarinaProfessional | undefined> {
    const [professional] = await db.select().from(marinaProfessionals).where(eq(marinaProfessionals.id, id));
    return professional;
  }
  
  async getMarinaProfessionalByEmail(email: string): Promise<MarinaProfessional | undefined> {
    const [professional] = await db.select().from(marinaProfessionals).where(eq(marinaProfessionals.email, email));
    return professional;
  }
  
  async createMarinaProfessional(insertProfessional: InsertMarinaProfessional): Promise<MarinaProfessional> {
    const [professional] = await db.insert(marinaProfessionals).values(insertProfessional).returning();
    return professional;
  }
  
  async updateMarinaProfessional(id: number, professionalData: Partial<MarinaProfessional>): Promise<MarinaProfessional | undefined> {
    const [updatedProfessional] = await db
      .update(marinaProfessionals)
      .set(professionalData)
      .where(eq(marinaProfessionals.id, id))
      .returning();
    return updatedProfessional;
  }
  
  // Mobile home professional methods
  async getMobileHomeProfessionals(): Promise<MobileHomeProfessional[]> {
    return await db.select().from(mobileHomeProfessionals).orderBy(desc(mobileHomeProfessionals.createdAt));
  }
  
  async getMobileHomeProfessional(id: number): Promise<MobileHomeProfessional | undefined> {
    const [professional] = await db.select().from(mobileHomeProfessionals).where(eq(mobileHomeProfessionals.id, id));
    return professional;
  }
  
  async getMobileHomeProfessionalByEmail(email: string): Promise<MobileHomeProfessional | undefined> {
    const [professional] = await db.select().from(mobileHomeProfessionals).where(eq(mobileHomeProfessionals.email, email));
    return professional;
  }
  
  async createMobileHomeProfessional(insertProfessional: InsertMobileHomeProfessional): Promise<MobileHomeProfessional> {
    const [professional] = await db.insert(mobileHomeProfessionals).values(insertProfessional).returning();
    return professional;
  }
  
  async updateMobileHomeProfessional(id: number, professionalData: Partial<MobileHomeProfessional>): Promise<MobileHomeProfessional | undefined> {
    const [updatedProfessional] = await db
      .update(mobileHomeProfessionals)
      .set(professionalData)
      .where(eq(mobileHomeProfessionals.id, id))
      .returning();
    return updatedProfessional;
  }
  
  // Fire prevention homeowner methods
  async getFirePreventionHomeowners(): Promise<FirePreventionHomeowner[]> {
    return await db.select().from(firePreventionHomeowners).orderBy(desc(firePreventionHomeowners.createdAt));
  }
  
  async getFirePreventionHomeowner(id: number): Promise<FirePreventionHomeowner | undefined> {
    const [homeowner] = await db.select().from(firePreventionHomeowners).where(eq(firePreventionHomeowners.id, id));
    return homeowner;
  }
  
  async getFirePreventionHomeownerByEmail(email: string): Promise<FirePreventionHomeowner | undefined> {
    const [homeowner] = await db.select().from(firePreventionHomeowners).where(eq(firePreventionHomeowners.email, email));
    return homeowner;
  }
  
  async createFirePreventionHomeowner(insertHomeowner: InsertFirePreventionHomeowner): Promise<FirePreventionHomeowner> {
    const [homeowner] = await db.insert(firePreventionHomeowners).values(insertHomeowner).returning();
    return homeowner;
  }
  
  async updateFirePreventionHomeowner(id: number, homeownerData: Partial<FirePreventionHomeowner>): Promise<FirePreventionHomeowner | undefined> {
    const [updatedHomeowner] = await db
      .update(firePreventionHomeowners)
      .set(homeownerData)
      .where(eq(firePreventionHomeowners.id, id))
      .returning();
    return updatedHomeowner;
  }

  // Professional Review methods
  async getProfessionalReviews(professionalType: string, professionalId: number): Promise<ProfessionalReview[]> {
    return await db.select()
      .from(professionalReviews)
      .where(and(
        eq(professionalReviews.professionalType, professionalType),
        eq(professionalReviews.professionalId, professionalId)
      ))
      .orderBy(desc(professionalReviews.createdAt));
  }

  async createProfessionalReview(insertReview: InsertProfessionalReview): Promise<ProfessionalReview> {
    const [review] = await db.insert(professionalReviews).values(insertReview).returning();
    return review;
  }

  // Social Media methods
  async getSocialMediaPosts(filters?: {status?: string, platform?: string, campaignId?: number}): Promise<SocialMediaPost[]> {
    let query = db.select().from(socialMediaPosts);
    
    if (filters) {
      if (filters.status) {
        query = query.where(eq(socialMediaPosts.status, filters.status));
      }
      if (filters.platform) {
        query = query.where(eq(socialMediaPosts.platform, filters.platform));
      }
      if (filters.campaignId) {
        query = query.where(eq(socialMediaPosts.campaignId, filters.campaignId));
      }
    }
    
    // Order by scheduled date descending, with most recent first
    return await query.orderBy(desc(socialMediaPosts.scheduledDate));
  }

  async getSocialMediaPost(id: number): Promise<SocialMediaPost | undefined> {
    const [post] = await db
      .select()
      .from(socialMediaPosts)
      .where(eq(socialMediaPosts.id, id));
    return post;
  }

  async createSocialMediaPost(post: InsertSocialMediaPost): Promise<SocialMediaPost> {
    const [newPost] = await db
      .insert(socialMediaPosts)
      .values(post)
      .returning();
    return newPost;
  }

  async updateSocialMediaPost(id: number, postData: Partial<SocialMediaPost>): Promise<SocialMediaPost | undefined> {
    const [updatedPost] = await db
      .update(socialMediaPosts)
      .set(postData)
      .where(eq(socialMediaPosts.id, id))
      .returning();
    return updatedPost;
  }

  async deleteSocialMediaPost(id: number): Promise<boolean> {
    const result = await db
      .delete(socialMediaPosts)
      .where(eq(socialMediaPosts.id, id));
    return result.rowCount > 0;
  }

  // Marketing Campaign methods
  async getMarketingCampaigns(status?: string): Promise<MarketingCampaign[]> {
    let query = db.select().from(marketingCampaigns);
    
    if (status) {
      query = query.where(eq(marketingCampaigns.status, status));
    }
    
    // Order by start date descending, with most recent first
    return await query.orderBy(desc(marketingCampaigns.startDate));
  }

  async getMarketingCampaign(id: number): Promise<MarketingCampaign | undefined> {
    const [campaign] = await db
      .select()
      .from(marketingCampaigns)
      .where(eq(marketingCampaigns.id, id));
    return campaign;
  }

  async createMarketingCampaign(campaign: InsertMarketingCampaign): Promise<MarketingCampaign> {
    const [newCampaign] = await db
      .insert(marketingCampaigns)
      .values(campaign)
      .returning();
    return newCampaign;
  }

  async updateMarketingCampaign(id: number, campaignData: Partial<MarketingCampaign>): Promise<MarketingCampaign | undefined> {
    const [updatedCampaign] = await db
      .update(marketingCampaigns)
      .set(campaignData)
      .where(eq(marketingCampaigns.id, id))
      .returning();
    return updatedCampaign;
  }

  async deleteMarketingCampaign(id: number): Promise<boolean> {
    const result = await db
      .delete(marketingCampaigns)
      .where(eq(marketingCampaigns.id, id));
    return result.rowCount > 0;
  }
}

export const storage = new DatabaseStorage();
