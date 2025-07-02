import { parse } from 'csv-parse/sync';

/**
 * Parse a CSV string into an array of objects
 * @param csvString The CSV string to parse
 * @param options Options for parsing
 * @returns An array of objects with keys from the header row and values from each data row
 */
export function parseCSV(csvString: string, options: {
  delimiter?: string;
  skipEmptyLines?: boolean;
  trim?: boolean;
} = {}): Record<string, string>[] {
  const defaultOptions = {
    delimiter: ',',
    skipEmptyLines: true,
    trim: true,
    columns: true, // Use first row as column names
  };

  try {
    const records = parse(csvString, {
      ...defaultOptions,
      ...options,
    });
    return records;
  } catch (error) {
    
    throw new Error('Failed to parse CSV data');
  }
}

/**
 * Validate that a CSV contains required columns
 * @param parsedData The parsed CSV data
 * @param requiredColumns Array of column names that must exist
 * @returns Boolean indicating if all required columns exist
 */
export function validateCSVColumns(parsedData: Record<string, string>[], requiredColumns: string[]): { 
  valid: boolean; 
  missingColumns: string[] 
} {
  if (!parsedData.length) {
    return { valid: false, missingColumns: requiredColumns };
  }

  const firstRow = parsedData[0];
  const columns = Object.keys(firstRow);
  const missingColumns = requiredColumns.filter(col => !columns.includes(col));
  
  return {
    valid: missingColumns.length === 0,
    missingColumns
  };
}

/**
 * Maps CSV column names to database field names
 * @param data Array of objects from parsed CSV
 * @param columnMapping Object mapping CSV column names to database field names
 * @returns Array of objects with renamed keys according to mapping
 */
export function mapCSVFieldsToDatabaseFields<T>(
  data: Record<string, string>[],
  columnMapping: Record<string, keyof T>
): Partial<T>[] {
  return data.map(row => {
    const mappedRow: Partial<T> = {};
    
    Object.entries(row).forEach(([csvField, value]) => {
      const dbField = columnMapping[csvField];
      // Only map non-empty values to avoid saving empty strings
      // This allows database defaults to be applied for empty fields
      if (dbField) {
        if (value !== undefined && value !== null && value.trim() !== '') {
          // @ts-ignore
          mappedRow[dbField] = value;
        }
      }
    });
    
    return mappedRow;
  });
}