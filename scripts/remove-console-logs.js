#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Track statistics
let filesProcessed = 0;
let consolesRemoved = 0;
let debuggersRemoved = 0;
let alertsRemoved = 0;

// Files to process
const patterns = [
  'client/src/**/*.{js,jsx,ts,tsx}',
  'server/**/*.{js,ts}',
  'shared/**/*.{js,ts}'
];

// Regex patterns for removal
const consolePattern = /console\.(log|warn|error|info|debug|trace|table|group|groupEnd|time|timeEnd|assert|clear|count|dir|dirxml)\s*\([^)]*\)\s*;?/g;
const multilineConsolePattern = /console\.(log|warn|error|info|debug|trace|table|group|groupEnd|time|timeEnd|assert|clear|count|dir|dirxml)\s*\([^)]*\n[^)]*\)\s*;?/g;
const debuggerPattern = /debugger\s*;?/g;
const alertPattern = /alert\s*\([^)]*\)\s*;?/g;

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Count and remove console statements
    const consoleMatches = content.match(consolePattern) || [];
    const multilineMatches = content.match(multilineConsolePattern) || [];
    consolesRemoved += consoleMatches.length + multilineMatches.length;
    
    // Remove console statements
    content = content.replace(consolePattern, '');
    content = content.replace(multilineConsolePattern, '');
    
    // Count and remove debugger statements
    const debuggerMatches = content.match(debuggerPattern) || [];
    debuggersRemoved += debuggerMatches.length;
    content = content.replace(debuggerPattern, '');
    
    // Count and remove alert statements
    const alertMatches = content.match(alertPattern) || [];
    alertsRemoved += alertMatches.length;
    content = content.replace(alertPattern, '');
    
    // Clean up empty lines left behind
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      filesProcessed++;
      console.log(`✓ Cleaned: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Process all files
console.log('🔥 PRODUCTION CLEANUP: Removing all console statements, debuggers, and alerts...\n');

for (const pattern of patterns) {
  const files = await glob(pattern, { ignore: ['**/node_modules/**'] });
  files.forEach(processFile);
}

console.log('\n📊 CLEANUP COMPLETE:');
console.log(`   Files processed: ${filesProcessed}`);
console.log(`   Console statements removed: ${consolesRemoved}`);
console.log(`   Debugger statements removed: ${debuggersRemoved}`);
console.log(`   Alert statements removed: ${alertsRemoved}`);
console.log(`   Total statements removed: ${consolesRemoved + debuggersRemoved + alertsRemoved}`);