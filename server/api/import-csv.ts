import { Request, Response } from 'express';
import { parseCSV, validateCSVColumns, mapCSVFieldsToDatabaseFields } from '../utils/csv-parser';
import { storage } from '../storage';
import { InsertContact, InsertCompany, InsertOpportunity } from '@shared/schema';

type ImportType = 'contacts' | 'companies' | 'opportunities';

// Define required columns and mappings for each import type
const importConfigs = {
  contacts: {
    requiredColumns: ['firstName', 'lastName'],
    columnMapping: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      phone: 'phone',
      title: 'title',
      status: 'status',
      source: 'source',
      notes: 'notes',
      companyId: 'companyId'
    }
  },
  companies: {
    requiredColumns: ['name'],
    columnMapping: {
      name: 'name',
      industry: 'industry',
      website: 'website',
      address: 'address',
      city: 'city',
      state: 'state',
      zip: 'zip',
      country: 'country',
      phone: 'phone',
      annualRevenue: 'annualRevenue',
      employeeCount: 'employeeCount',
      description: 'description'
    }
  },
  opportunities: {
    requiredColumns: ['name'],
    columnMapping: {
      name: 'name',
      contactId: 'contactId',
      companyId: 'companyId',
      status: 'status',
      amount: 'amount',
      probability: 'probability',
      expectedCloseDate: 'expectedCloseDate',
      description: 'description',
      source: 'source',
      location: 'location',
      notes: 'notes'
    }
  }
};

/**
 * Import data from CSV
 * @param req Request
 * @param res Response
 */
export async function importCSV(req: Request, res: Response) {
  try {
    const { type, csv } = req.body;
    
    if (!type || !csv) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    if (!['contacts', 'companies', 'opportunities'].includes(type)) {
      return res.status(400).json({ error: 'Invalid import type' });
    }
    
    // Parse the CSV data
    const parsedData = parseCSV(csv);
    
    // Validate required columns
    const importType = type as ImportType;
    const { requiredColumns, columnMapping } = importConfigs[importType];
    const columnValidation = validateCSVColumns(parsedData, requiredColumns);
    
    if (!columnValidation.valid) {
      return res.status(400).json({ 
        error: 'CSV missing required columns', 
        missingColumns: columnValidation.missingColumns 
      });
    }

    // Map CSV fields to database fields
    let mappedData;
    let importResults;
    
    switch (importType) {
      case 'contacts':
        mappedData = mapCSVFieldsToDatabaseFields<InsertContact>(parsedData, columnMapping as any);
        // Ensure numeric fields are properly converted
        mappedData = mappedData.map(item => ({
          ...item,
          companyId: item.companyId ? parseInt(String(item.companyId), 10) : undefined
        }));
        importResults = await Promise.all(mappedData.map(contact => 
          storage.createContact(contact as InsertContact)
        ));
        break;
        
      case 'companies':
        mappedData = mapCSVFieldsToDatabaseFields<InsertCompany>(parsedData, columnMapping as any);
        // Ensure numeric fields are properly converted
        mappedData = mappedData.map(item => ({
          ...item,
          annualRevenue: item.annualRevenue ? parseFloat(String(item.annualRevenue)) : undefined,
          employeeCount: item.employeeCount ? parseInt(String(item.employeeCount), 10) : undefined
        }));
        importResults = await Promise.all(mappedData.map(company => 
          storage.createCompany(company as InsertCompany)
        ));
        break;
        
      case 'opportunities':
        mappedData = mapCSVFieldsToDatabaseFields<InsertOpportunity>(parsedData, columnMapping as any);
        // Ensure numeric and date fields are properly converted
        mappedData = mappedData.map(item => ({
          ...item,
          contactId: item.contactId ? parseInt(String(item.contactId), 10) : undefined,
          companyId: item.companyId ? parseInt(String(item.companyId), 10) : undefined,
          amount: item.amount ? parseFloat(String(item.amount)) : undefined,
          probability: item.probability ? parseInt(String(item.probability), 10) : undefined,
          expectedCloseDate: item.expectedCloseDate ? new Date(String(item.expectedCloseDate)) : undefined
        }));
        importResults = await Promise.all(mappedData.map(opportunity => 
          storage.createOpportunity(opportunity as InsertOpportunity)
        ));
        break;
    }
    
    return res.status(200).json({ 
      success: true, 
      imported: importResults.length,
      results: importResults 
    });
    
  } catch (error: any) {
    console.error('CSV import error:', error);
    return res.status(500).json({ 
      error: 'Failed to import CSV data', 
      message: error.message 
    });
  }
}