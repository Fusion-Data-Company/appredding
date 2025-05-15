import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the file
const filePath = path.join(__dirname, 'client/src/sections/ContactSection.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Update the email field focus effect
content = content.replace(
  /(\s*{\/\* Premium glow effect on focus \*\/}\s*<div className="absolute inset-0 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none">\s*<div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500\/0 to-blue-500\/0 dark:group-focus-within:from-amber-500\/20 dark:group-focus-within:to-blue-500\/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"><\/div>\s*<div className="absolute right-2 top-1\/2 transform -translate-y-1\/2 w-8 h-8 bg-gradient-to-r from-amber-500\/0 to-blue-500\/0 group-focus-within:from-amber-500\/10 group-focus-within:to-blue-500\/10 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"><\/div>\s*<\/div>\s*<\/div>)/g,
  `
                  {/* Premium enterprise glow effect on focus */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/0 to-blue-500/0 group-focus-within:from-orange-500/20 group-focus-within:to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-orange-500/0 to-blue-500/0 group-focus-within:from-orange-500/10 group-focus-within:to-blue-500/10 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>`
);

// Update all other focus effect glow colors
content = content.replace(
  /from-amber-500\/10 group-focus-within:to-blue-500\/10/g, 
  'from-orange-500/10 group-focus-within:to-blue-500/10'
);

content = content.replace(
  /from-amber-500\/30 group-focus-within:to-blue-500\/30/g, 
  'from-orange-500/30 group-focus-within:to-blue-500/30'
);

// Write back to the file
fs.writeFileSync(filePath, content, 'utf8');

console.log('Updated all focus effects to premium enterprise styling.');