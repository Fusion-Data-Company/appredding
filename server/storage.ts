import { contacts, companies, opportunities, activities, tasks, orders, orderItems, products, productCategories, formSubmissions, portfolioProjects, solarFormSubmissions, newsletterSubscribers, users, type Contact, type Company, type Opportunity, type FormSubmission, type PortfolioProject, type Product, type ProductCategory, type SolarFormSubmission, type NewsletterSubscriber, type User } from "@shared/schema";
import { db, pool } from "./db";
import { eq, desc, and, like, sql } from "drizzle-orm";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";

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

  // Portfolio Projects management
  getPortfolioProjects(filters?: { category?: string; featured?: boolean }): Promise<PortfolioProject[]>;
  getPortfolioProjectById(id: number): Promise<PortfolioProject | undefined>;
  createPortfolioProject(data: any): Promise<PortfolioProject>;
  updatePortfolioProject(id: number, data: any): Promise<PortfolioProject>;
  deletePortfolioProject(id: number): Promise<void>;

  // Products management
  getProducts(filters?: { category?: string; inStock?: boolean; featured?: boolean; search?: string; page?: number; limit?: number }): Promise<{ products: Product[]; total: number }>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySku(sku: string): Promise<Product | undefined>;
  createProduct(data: any): Promise<Product>;
  updateProduct(id: number, data: any): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
  searchProducts(query: string): Promise<Product[]>;

  // Product Categories management
  getProductCategories(): Promise<ProductCategory[]>;
  getProductCategoryBySlug(slug: string): Promise<ProductCategory | undefined>;

  // Order management
  createOrder(orderData: any, items: any[]): Promise<any>;
  getOrderById(id: number): Promise<any>;
  getOrderByNumber(orderNumber: string): Promise<any>;
  getOrdersByEmail(email: string): Promise<any[]>;
  updateOrderStatus(id: number, status: string): Promise<any>;
  updateOrderPaymentStatus(id: number, paymentStatus: string): Promise<any>;

  // Solar form submissions
  createSolarSubmission(data: any): Promise<SolarFormSubmission>;
  getAllSolarSubmissions(filters?: { page?: number; limit?: number; search?: string }): Promise<{ submissions: SolarFormSubmission[]; total: number }>;
  verifySolarAdminCode(code: string): Promise<boolean>;

  // Newsletter subscribers
  addNewsletterSubscriber(email: string, name: string | undefined, source: string): Promise<NewsletterSubscriber>;
  getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;

  // User management
  getUserByUsername(username: string): Promise<User | undefined>;
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(userData: any): Promise<User>;
  updateUser(id: number, data: any): Promise<User>;
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

  async getPortfolioProjects(filters?: { category?: string; featured?: boolean }): Promise<PortfolioProject[]> {
    let query = db.select().from(portfolioProjects);
    
    const conditions = [];
    if (filters?.category) {
      conditions.push(eq(portfolioProjects.category, filters.category as any));
    }
    if (filters?.featured !== undefined) {
      conditions.push(eq(portfolioProjects.featured, filters.featured));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }
    
    return await query.orderBy(desc(portfolioProjects.date));
  }

  async getPortfolioProjectById(id: number): Promise<PortfolioProject | undefined> {
    const [project] = await db
      .select()
      .from(portfolioProjects)
      .where(eq(portfolioProjects.id, id));
    return project || undefined;
  }

  async createPortfolioProject(data: any): Promise<PortfolioProject> {
    const [project] = await db
      .insert(portfolioProjects)
      .values(data)
      .returning();
    return project;
  }

  async updatePortfolioProject(id: number, data: any): Promise<PortfolioProject> {
    const [project] = await db
      .update(portfolioProjects)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(portfolioProjects.id, id))
      .returning();
    return project;
  }

  async deletePortfolioProject(id: number): Promise<void> {
    await db.delete(portfolioProjects).where(eq(portfolioProjects.id, id));
  }

  async getProducts(filters?: { category?: string; inStock?: boolean; featured?: boolean; search?: string; page?: number; limit?: number }): Promise<{ products: Product[]; total: number }> {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const offset = (page - 1) * limit;

    const conditions = [];
    if (filters?.category) {
      conditions.push(eq(products.category, filters.category as any));
    }
    if (filters?.inStock !== undefined) {
      conditions.push(eq(products.inStock, filters.inStock));
    }
    if (filters?.featured !== undefined) {
      conditions.push(eq(products.featured, filters.featured));
    }
    if (filters?.search) {
      conditions.push(
        sql`LOWER(${products.name}) LIKE ${`%${filters.search.toLowerCase()}%`} OR 
            LOWER(${products.brand}) LIKE ${`%${filters.search.toLowerCase()}%`} OR 
            LOWER(${products.description}) LIKE ${`%${filters.search.toLowerCase()}%`}`
      );
    }

    let query = db.select().from(products);
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    const allProducts = await query;
    const total = allProducts.length;
    
    const paginatedProducts = await query
      .orderBy(desc(products.featured), desc(products.createdAt))
      .limit(limit)
      .offset(offset);

    return { products: paginatedProducts, total };
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, id));
    return product || undefined;
  }

  async getProductBySku(sku: string): Promise<Product | undefined> {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.sku, sku));
    return product || undefined;
  }

  async createProduct(data: any): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values(data)
      .returning();
    return product;
  }

  async updateProduct(id: number, data: any): Promise<Product> {
    const [product] = await db
      .update(products)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  async searchProducts(query: string): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(
        sql`LOWER(${products.name}) LIKE ${`%${query.toLowerCase()}%`} OR 
            LOWER(${products.brand}) LIKE ${`%${query.toLowerCase()}%`} OR 
            LOWER(${products.description}) LIKE ${`%${query.toLowerCase()}%`}`
      )
      .orderBy(desc(products.featured), desc(products.createdAt));
  }

  async getProductCategories(): Promise<ProductCategory[]> {
    return await db
      .select()
      .from(productCategories)
      .orderBy(productCategories.displayOrder);
  }

  async getProductCategoryBySlug(slug: string): Promise<ProductCategory | undefined> {
    const [category] = await db
      .select()
      .from(productCategories)
      .where(eq(productCategories.slug, slug));
    return category || undefined;
  }

  async createOrder(orderData: any, items: any[]): Promise<any> {
    const [order] = await db
      .insert(orders)
      .values({
        orderNumber: orderData.orderNumber,
        customerId: orderData.customerId || null,
        email: orderData.email,
        status: orderData.status || 'pending',
        subtotal: orderData.subtotal,
        tax: orderData.tax,
        shipping: orderData.shipping,
        total: orderData.total,
        shippingAddress: orderData.shippingAddress,
        billingAddress: orderData.billingAddress || null,
        paymentMethod: orderData.paymentMethod,
        paymentStatus: orderData.paymentStatus || 'pending',
        notes: orderData.notes || null
      })
      .returning();

    const orderItemsData = items.map(item => ({
      orderId: order.id,
      productId: item.productId || null,
      sku: item.sku,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.subtotal
    }));

    const createdItems = await db
      .insert(orderItems)
      .values(orderItemsData)
      .returning();

    return {
      ...order,
      items: createdItems
    };
  }

  async getOrderById(id: number): Promise<any> {
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, id));
    
    if (!order) return undefined;

    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, id));

    return {
      ...order,
      items
    };
  }

  async getOrderByNumber(orderNumber: string): Promise<any> {
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.orderNumber, orderNumber));
    
    if (!order) return undefined;

    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, order.id));

    return {
      ...order,
      items
    };
  }

  async getOrdersByEmail(email: string): Promise<any[]> {
    const ordersList = await db
      .select()
      .from(orders)
      .where(eq(orders.email, email))
      .orderBy(desc(orders.createdAt));

    const ordersWithItems = await Promise.all(
      ordersList.map(async (order) => {
        const items = await db
          .select()
          .from(orderItems)
          .where(eq(orderItems.orderId, order.id));
        
        return {
          ...order,
          items
        };
      })
    );

    return ordersWithItems;
  }

  async updateOrderStatus(id: number, status: string): Promise<any> {
    const [order] = await db
      .update(orders)
      .set({ status: status as any, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();

    return order;
  }

  async updateOrderPaymentStatus(id: number, paymentStatus: string): Promise<any> {
    const [order] = await db
      .update(orders)
      .set({ paymentStatus: paymentStatus as any, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();

    return order;
  }

  async createSolarSubmission(data: any): Promise<SolarFormSubmission> {
    const [submission] = await db
      .insert(solarFormSubmissions)
      .values(data)
      .returning();
    return submission;
  }

  async getAllSolarSubmissions(filters?: { page?: number; limit?: number; search?: string }): Promise<{ submissions: SolarFormSubmission[]; total: number }> {
    const page = filters?.page || 1;
    const limit = filters?.limit || 50;
    const offset = (page - 1) * limit;

    let query = db.select().from(solarFormSubmissions);

    if (filters?.search) {
      query = query.where(
        sql`LOWER(${solarFormSubmissions.customerName}) LIKE ${`%${filters.search.toLowerCase()}%`} OR 
            LOWER(${solarFormSubmissions.email}) LIKE ${`%${filters.search.toLowerCase()}%`} OR 
            LOWER(${solarFormSubmissions.phone}) LIKE ${`%${filters.search.toLowerCase()}%`}`
      ) as any;
    }

    const submissions = await query
      .orderBy(desc(solarFormSubmissions.submissionTimestamp))
      .limit(limit)
      .offset(offset);

    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(solarFormSubmissions);

    return {
      submissions,
      total: Number(countResult?.count || 0)
    };
  }

  async verifySolarAdminCode(code: string): Promise<boolean> {
    return code === '0843';
  }

  async addNewsletterSubscriber(email: string, name: string | undefined, source: string): Promise<NewsletterSubscriber> {
    try {
      const [subscriber] = await db
        .insert(newsletterSubscribers)
        .values({
          email,
          name,
          source
        })
        .returning();
      return subscriber;
    } catch (error: any) {
      if (error.code === '23505') {
        const [existingSubscriber] = await db
          .select()
          .from(newsletterSubscribers)
          .where(eq(newsletterSubscribers.email, email));
        return existingSubscriber;
      }
      throw error;
    }
  }

  async getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return await db
      .select()
      .from(newsletterSubscribers)
      .orderBy(desc(newsletterSubscribers.subscribedAt));
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user || undefined;
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(userData: any): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        username: userData.username,
        password: userData.password,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        companyName: userData.companyName,
        phone: userData.phone,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        zipCode: userData.zipCode,
        userType: userData.userType || 'client',
        isActive: userData.isActive !== undefined ? userData.isActive : true,
        jobTitle: userData.jobTitle,
        department: userData.department,
      })
      .returning();
    return user;
  }

  async updateUser(id: number, data: any): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  sessionStore = new (connectPgSimple(session))({
    pool,
    tableName: "session",
    createTableIfMissing: true
  });
}

export const storage = new DatabaseStorage();