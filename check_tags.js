import fs from 'fs';
const content = fs.readFileSync('/home/runner/workspace/client/src/pages/LithiumBattery.tsx', 'utf8');

// Count tags
const openDivs = (content.match(/<div\b/g) || []).length;
const closeDivs = (content.match(/<\/div>/g) || []).length;
const openMotionDivs = (content.match(/<motion\.div\b/g) || []).length;
const closeMotionDivs = (content.match(/<\/motion\.div>/g) || []).length;
const selfClosingMotion = (content.match(/<motion\.div[^>]*\/>/g) || []).length;

console.log(`Opening <div> tags: ${openDivs}`);
console.log(`Closing </div> tags: ${closeDivs}`);
console.log(`Opening <motion.div> tags: ${openMotionDivs}`);
console.log(`Self-closing <motion.div /> tags: ${selfClosingMotion}`);
console.log(`Closing </motion.div> tags: ${closeMotionDivs}`);
console.log(`\nTotal opening tags: ${openDivs + openMotionDivs - selfClosingMotion}`);
console.log(`Total closing tags: ${closeDivs + closeMotionDivs}`);
console.log(`Difference: ${(openDivs + openMotionDivs - selfClosingMotion) - (closeDivs + closeMotionDivs)}`);