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
    
    // Basic validation of input parameters
    if (!type || !csv) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    if (!['contacts', 'companies', 'opportunities'].includes(type)) {
      return res.status(400).json({ error: 'Invalid import type' });
    }
    
    // Validate CSV content
    if (typeof csv !== 'string') {
      return res.status(400).json({ error: 'CSV data must be a string' });
    }
    
    if (csv.trim().length === 0) {
      return res.status(400).json({ error: 'CSV data is empty' });
    }
    
    // Limit size to prevent memory issues
    const MAX_CSV_SIZE = 5 * 1024 * 1024; // 5MB
    if (csv.length > MAX_CSV_SIZE) {
      return res.status(400).json({ 
        error: 'CSV data too large',
        message: 'File size exceeds maximum allowed size of 5MB'
      });
    }
    
    // Parse the CSV data with error handling
    let parsedData;
    try {
      parsedData = parseCSV(csv);
    } catch (parseError: any) {
      return res.status(400).json({
        error: 'Failed to parse CSV',
        message: parseError.message
      });
    }
    
    // Check if CSV has any data rows
    if (!parsedData || parsedData.length === 0) {
      return res.status(400).json({ error: 'CSV contains no data rows' });
    }
    
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

    // Map CSV fields to database fields with validation
    let mappedData;
    let importResults = [];
    const errorRows: { rowIndex: number; error: string }[] = [];
    
    try {
      switch (importType) {
        case 'contacts':
          mappedData = mapCSVFieldsToDatabaseFields<InsertContact>(parsedData, columnMapping as any);
          
          // Validate and convert fields with better error handling
          for (let i = 0; i < mappedData.length; i++) {
            try {
              // Validate required fields
              if (!mappedData[i].firstName || !mappedData[i].lastName) {
                errorRows.push({ 
                  rowIndex: i + 1, 
                  error: 'First name and last name are required'
                });
                continue;
              }
              
              // Convert and validate email if present
              if (mappedData[i].email && !/^\S+@\S+\.\S+$/.test(String(mappedData[i].email))) {
                errorRows.push({ 
                  rowIndex: i + 1, 
                  error: 'Invalid email format' 
                });
                continue;
              }
              
              // Convert numeric fields
              if (mappedData[i].companyId) {
                const companyId = parseInt(String(mappedData[i].companyId), 10);
                if (isNaN(companyId)) {
                  errorRows.push({ 
                    rowIndex: i + 1, 
                    error: 'Company ID must be a number' 
                  });
                  continue;
                }
                mappedData[i].companyId = companyId;
              }
              
              // Create the record
              const contact = await storage.createContact(mappedData[i] as InsertContact);
              importResults.push(contact);
            } catch (err: any) {
              errorRows.push({ 
                rowIndex: i + 1, 
                error: err.message || 'Failed to create contact'
              });
            }
          }
          break;
          
        case 'companies':
          mappedData = mapCSVFieldsToDatabaseFields<InsertCompany>(parsedData, columnMapping as any);
          
          for (let i = 0; i < mappedData.length; i++) {
            try {
              // Validate required fields
              if (!mappedData[i].name) {
                errorRows.push({ 
                  rowIndex: i + 1, 
                  error: 'Company name is required'
                });
                continue;
              }
              
              // Convert numeric fields
              if (mappedData[i].annualRevenue) {
                const revenue = parseFloat(String(mappedData[i].annualRevenue));
                if (isNaN(revenue)) {
                  errorRows.push({ 
                    rowIndex: i + 1, 
                    error: 'Annual revenue must be a number'
                  });
                  continue;
                }
                mappedData[i].annualRevenue = revenue as any; // Type assertion to avoid type errors
              }
              
              if (mappedData[i].employeeCount) {
                const count = parseInt(String(mappedData[i].employeeCount), 10);
                if (isNaN(count)) {
                  errorRows.push({ 
                    rowIndex: i + 1, 
                    error: 'Employee count must be a number'
                  });
                  continue;
                }
                mappedData[i].employeeCount = count;
              }
              
              // Create the record
              const company = await storage.createCompany(mappedData[i] as InsertCompany);
              importResults.push(company);
            } catch (err: any) {
              errorRows.push({ 
                rowIndex: i + 1, 
                error: err.message || 'Failed to create company'
              });
            }
          }
          break;
          
        case 'opportunities':
          mappedData = mapCSVFieldsToDatabaseFields<InsertOpportunity>(parsedData, columnMapping as any);
          
          for (let i = 0; i < mappedData.length; i++) {
            try {
              // Validate required fields
              if (!mappedData[i].name) {
                errorRows.push({ 
                  rowIndex: i + 1, 
                  error: 'Opportunity name is required'
                });
                continue;
              }
              
              // Convert and validate fields
              if (mappedData[i].contactId) {
                const contactId = parseInt(String(mappedData[i].contactId), 10);
                if (isNaN(contactId)) {
                  errorRows.push({ 
                    rowIndex: i + 1, 
                    error: 'Contact ID must be a number'
                  });
                  continue;
                }
                mappedData[i].contactId = contactId;
              }
              
              if (mappedData[i].companyId) {
                const companyId = parseInt(String(mappedData[i].companyId), 10);
                if (isNaN(companyId)) {
                  errorRows.push({ 
                    rowIndex: i + 1, 
                    error: 'Company ID must be a number'
                  });
                  continue;
                }
                mappedData[i].companyId = companyId;
              }
              
              if (mappedData[i].amount) {
                const amount = parseFloat(String(mappedData[i].amount));
                if (isNaN(amount)) {
                  errorRows.push({ 
                    rowIndex: i + 1, 
                    error: 'Amount must be a number'
                  });
                  continue;
                }
                // For decimal columns, we need to ensure it's a valid decimal string
                // that matches the precision/scale in the schema
                mappedData[i].amount = amount.toFixed(2);
              }
              
              if (mappedData[i].probability) {
                const probability = parseInt(String(mappedData[i].probability), 10);
                if (isNaN(probability) || probability < 0 || probability > 100) {
                  errorRows.push({ 
                    rowIndex: i + 1, 
                    error: 'Probability must be a number between 0 and 100'
                  });
                  continue;
                }
                mappedData[i].probability = probability;
              }
              
              if (mappedData[i].expectedCloseDate) {
                try {
                  const date = new Date(String(mappedData[i].expectedCloseDate));
                  if (isNaN(date.getTime())) {
                    throw new Error('Invalid date format');
                  }
                  // Format as YYYY-MM-DD for date column
                  const yyyy = date.getFullYear();
                  const mm = String(date.getMonth() + 1).padStart(2, '0');
                  const dd = String(date.getDate()).padStart(2, '0');
                  mappedData[i].expectedCloseDate = `${yyyy}-${mm}-${dd}`;
                } catch (dateError) {
                  errorRows.push({ 
                    rowIndex: i + 1, 
                    error: 'Expected close date must be a valid date format (YYYY-MM-DD)'
                  });
                  continue;
                }
              }
              
              // Create the record
              const opportunity = await storage.createOpportunity(mappedData[i] as InsertOpportunity);
              importResults.push(opportunity);
            } catch (err: any) {
              errorRows.push({ 
                rowIndex: i + 1, 
                error: err.message || 'Failed to create opportunity'
              });
            }
          }
          break;
      }
      
      // Return success response with error details if any
      return res.status(200).json({ 
        success: true, 
        imported: importResults.length,
        totalRows: mappedData.length,
        errors: errorRows.length > 0 ? errorRows : undefined,
        results: importResults.slice(0, 10) // Only return first 10 results to avoid large payloads
      });
      
    } catch (importError: any) {
      console.error('CSV import processing error:', importError);
      return res.status(500).json({ 
        error: 'Failed to process CSV data', 
        message: importError.message 
      });
    }
    
  } catch (error: any) {
    console.error('CSV import error:', error);
    return res.status(500).json({ 
      error: 'Failed to import CSV data', 
      message: error.message || 'Unknown error occurred'
    });
  }
}