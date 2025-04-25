import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get input and output paths from command line args
const inputPath = process.argv[2];
const outputPath = process.argv[3] || inputPath.replace(/\.\w+$/, '-optimized$&');

if (!inputPath) {
  console.error('Usage: node optimize-single.js <input-path> [output-path]');
  process.exit(1);
}

async function optimizeImage() {
  try {
    const fileStats = fs.statSync(inputPath);
    const fileSizeMB = fileStats.size / (1024 * 1024);
    
    // Determine quality based on file size
    const quality = fileSizeMB > 10 ? 60 : fileSizeMB > 5 ? 70 : 80;
    
    console.log(`Optimizing ${path.basename(inputPath)} (${fileSizeMB.toFixed(2)}MB) with quality ${quality}...`);
    
    await sharp(inputPath)
      .resize(1200) // Resize to reasonable width while maintaining aspect ratio
      .jpeg({ quality, mozjpeg: true })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSizeMB = newStats.size / (1024 * 1024);
    const savings = ((1 - newSizeMB / fileSizeMB) * 100).toFixed(2);
    
    console.log(`Optimized ${path.basename(inputPath)}: ${fileSizeMB.toFixed(2)}MB → ${newSizeMB.toFixed(2)}MB (${savings}% reduction)`);
  } catch (err) {
    console.error(`Error processing ${path.basename(inputPath)}:`, err);
  }
}

optimizeImage().then(() => {
  console.log('Image optimization complete');
});