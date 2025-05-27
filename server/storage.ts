import { contacts, companies, opportunities, activities, tasks, orders, orderItems, products, formSubmissions, type Contact, type Company, type Opportunity, type FormSubmission } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, like, sql } from "drizzle-orm";

export interface IStorage {
  // Contact management
  createContact(contactData: any): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getContactById(id: number): Promise<Contact | undefined>;
  updateContact(id: number, data: any): Promise<Contact>;
  deleteContact(id: number): Promise<void>;
  searchContacts(query: string): Promise<Contact[]>;

  // Company management
  createCompany(companyData: any): Promise<Company>;
  getCompanies(): Promise<Company[]>;
  getCompanyById(id: number): Promise<Company | undefined>;
  updateCompany(id: number, data: any): Promise<Company>;

  // Opportunity management
  createOpportunity(opportunityData: any): Promise<Opportunity>;
  getOpportunities(): Promise<Opportunity[]>;
  getOpportunityById(id: number): Promise<Opportunity | undefined>;
  updateOpportunity(id: number, data: any): Promise<Opportunity>;

  // Form submissions from all website pages
  createFormSubmission(formData: any): Promise<FormSubmission>;
  getFormSubmissions(): Promise<FormSubmission[]>;
  getFormSubmissionById(id: number): Promise<FormSubmission | undefined>;
  processFormSubmission(id: number): Promise<{ contact: Contact; opportunity?: Opportunity }>;
  
  // Legacy form methods - now use the unified form submission system
  submitContactForm(formData: any): Promise<Contact>;
  submitQuoteForm(formData: any): Promise<{ contact: Contact; opportunity: Opportunity }>;
  submitConsultationForm(formData: any): Promise<{ contact: Contact; opportunity: Opportunity }>;

  // Activity tracking
  createActivity(activityData: any): Promise<any>;
  getActivitiesByContact(contactId: number): Promise<any[]>;

  // Dashboard data
  getDashboardStats(): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  
  async createContact(contactData: any): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values({
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        email: contactData.email,
        phone: contactData.phone,
        mobilePhone: contactData.mobilePhone,
        address: contactData.address,
        city: contactData.city,
        state: contactData.state,
        zipCode: contactData.zipCode,
        jobTitle: contactData.jobTitle,
        source: contactData.source || 'website',
        status: contactData.status || 'lead',
        interestedInServices: contactData.interestedInServices,
        notes: contactData.notes,
        createdBy: contactData.createdBy || 1
      })
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async getContactById(id: number): Promise<Contact | undefined> {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact || undefined;
  }

  async updateContact(id: number, data: any): Promise<Contact> {
    const [contact] = await db
      .update(contacts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(contacts.id, id))
      .returning();
    return contact;
  }

  async deleteContact(id: number): Promise<void> {
    await db.delete(contacts).where(eq(contacts.id, id));
  }

  async searchContacts(query: string): Promise<Contact[]> {
    return await db
      .select()
      .from(contacts)
      .where(
        sql`LOWER(${contacts.firstName}) LIKE ${`%${query.toLowerCase()}%`} OR 
            LOWER(${contacts.lastName}) LIKE ${`%${query.toLowerCase()}%`} OR 
            LOWER(${contacts.email}) LIKE ${`%${query.toLowerCase()}%`}`
      );
  }

  async createCompany(companyData: any): Promise<Company> {
    const [company] = await db
      .insert(companies)
      .values(companyData)
      .returning();
    return company;
  }

  async getCompanies(): Promise<Company[]> {
    return await db.select().from(companies).orderBy(desc(companies.createdAt));
  }

  async getCompanyById(id: number): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.id, id));
    return company || undefined;
  }

  async updateCompany(id: number, data: any): Promise<Company> {
    const [company] = await db
      .update(companies)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(companies.id, id))
      .returning();
    return company;
  }

  async createOpportunity(opportunityData: any): Promise<Opportunity> {
    const [opportunity] = await db
      .insert(opportunities)
      .values(opportunityData)
      .returning();
    return opportunity;
  }

  async getOpportunities(): Promise<Opportunity[]> {
    return await db.select().from(opportunities).orderBy(desc(opportunities.createdAt));
  }

  async getOpportunityById(id: number): Promise<Opportunity | undefined> {
    const [opportunity] = await db.select().from(opportunities).where(eq(opportunities.id, id));
    return opportunity || undefined;
  }

  async updateOpportunity(id: number, data: any): Promise<Opportunity> {
    const [opportunity] = await db
      .update(opportunities)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(opportunities.id, id))
      .returning();
    return opportunity;
  }

  async submitContactForm(formData: any): Promise<Contact> {
    return await this.createContact({
      ...formData,
      source: 'website',
      status: 'lead',
      notes: `Contact form submission: ${formData.message || 'No message provided'}`
    });
  }

  async submitQuoteForm(formData: any): Promise<{ contact: Contact; opportunity: Opportunity }> {
    const contact = await this.createContact({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      source: 'website',
      status: 'prospect',
      interestedInServices: formData.interestedServices,
      notes: `Quote request: ${formData.projectDescription || ''}`
    });

    const opportunity = await this.createOpportunity({
      name: `Solar Quote - ${contact.firstName} ${contact.lastName}`,
      contactId: contact.id,
      solarServices: formData.interestedServices,
      status: 'pending',
      amount: formData.estimatedBudget,
      probability: 30,
      description: formData.projectDescription,
      source: 'website',
      location: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
      budget: formData.estimatedBudget,
      createdBy: 1
    });

    return { contact, opportunity };
  }

  async submitConsultationForm(formData: any): Promise<{ contact: Contact; opportunity: Opportunity }> {
    const contact = await this.createContact({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      source: 'website',
      status: 'lead',
      interestedInServices: formData.interestedServices,
      notes: `Free consultation request: ${formData.additionalInfo || ''}`
    });

    const opportunity = await this.createOpportunity({
      name: `Free Consultation - ${contact.firstName} ${contact.lastName}`,
      contactId: contact.id,
      solarServices: formData.interestedServices,
      status: 'pending',
      probability: 50,
      description: `Free consultation request: ${formData.additionalInfo || ''}`,
      source: 'website',
      location: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
      createdBy: 1
    });

    return { contact, opportunity };
  }

  async createActivity(activityData: any): Promise<any> {
    const [activity] = await db
      .insert(activities)
      .values(activityData)
      .returning();
    return activity;
  }

  async getActivitiesByContact(contactId: number): Promise<any[]> {
    return await db
      .select()
      .from(activities)
      .where(eq(activities.contactId, contactId))
      .orderBy(desc(activities.createdAt));
  }

  async getDashboardStats(): Promise<any> {
    const totalContacts = await db.select({ count: sql<number>`count(*)` }).from(contacts);
    const totalOpportunities = await db.select({ count: sql<number>`count(*)` }).from(opportunities);
    const recentContacts = await db
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt))
      .limit(5);
    const recentOpportunities = await db
      .select()
      .from(opportunities)
      .orderBy(desc(opportunities.createdAt))
      .limit(5);

    return {
      totalContacts: totalContacts[0]?.count || 0,
      totalOpportunities: totalOpportunities[0]?.count || 0,
      recentContacts,
      recentOpportunities
    };
  }
  // Form submission methods - unified system for all website forms
  async createFormSubmission(formData: any): Promise<FormSubmission> {
    const [submission] = await db
      .insert(formSubmissions)
      .values({
        formType: formData.formType,
        sourcePage: formData.sourcePage,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        message: formData.message,
        interestedServices: formData.interestedServices,
        propertyType: formData.propertyType,
        propertySize: formData.propertySize,
        energyUsage: formData.energyUsage,
        budget: formData.budget,
        timeline: formData.timeline,
        additionalData: formData.additionalData || {},
        processed: false
      })
      .returning();

    // Automatically process the form submission to create contact and opportunity
    if (submission.id) {
      await this.processFormSubmission(submission.id);
    }

    return submission;
  }

  async getFormSubmissions(): Promise<FormSubmission[]> {
    return await db
      .select()
      .from(formSubmissions)
      .orderBy(desc(formSubmissions.createdAt));
  }

  async getFormSubmissionById(id: number): Promise<FormSubmission | undefined> {
    const [submission] = await db
      .select()
      .from(formSubmissions)
      .where(eq(formSubmissions.id, id));
    return submission;
  }

  async processFormSubmission(id: number): Promise<{ contact: Contact; opportunity?: Opportunity }> {
    const submission = await this.getFormSubmissionById(id);
    if (!submission) {
      throw new Error('Form submission not found');
    }

    // Check if contact already exists by email
    let contact = await this.getContactByEmail(submission.email);
    
    if (!contact) {
      // Create new contact
      contact = await this.createContact({
        firstName: submission.firstName,
        lastName: submission.lastName,
        email: submission.email,
        phone: submission.phone,
        address: submission.address,
        city: submission.city,
        state: submission.state,
        zipCode: submission.zipCode,
        source: 'website',
        status: 'lead',
        interestedInServices: submission.interestedServices,
        notes: `Form submission from ${submission.sourcePage}: ${submission.message || ''}`
      });
    }

    // Create opportunity if this is a service request
    let opportunity;
    if (submission.formType !== 'contact' && submission.interestedServices) {
      opportunity = await this.createOpportunity({
        name: `${submission.formType.replace('_', ' ').toUpperCase()} - ${contact.firstName} ${contact.lastName}`,
        contactId: contact.id,
        solarServices: submission.interestedServices,
        status: 'pending',
        description: submission.message,
        source: 'website',
        budget: submission.budget,
        notes: `Generated from ${submission.formType} form submission on ${submission.sourcePage}`
      });
    }

    // Create activity record
    await this.createActivity({
      type: 'form_submission',
      subject: `${submission.formType.replace('_', ' ').toUpperCase()} Form Submitted`,
      details: `Form submitted from ${submission.sourcePage}${submission.message ? ': ' + submission.message : ''}`,
      contactId: contact.id,
      opportunityId: opportunity?.id,
      createdBy: 1 // Default system user
    });

    // Mark submission as processed
    await db
      .update(formSubmissions)
      .set({ processed: true, contactId: contact.id })
      .where(eq(formSubmissions.id, id));

    return { contact, opportunity };
  }

  private async getContactByEmail(email: string): Promise<Contact | undefined> {
    const [contact] = await db
      .select()
      .from(contacts)
      .where(eq(contacts.email, email));
    return contact;
  }
}

export const storage = new DatabaseStorage();