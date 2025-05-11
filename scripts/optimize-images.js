import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, '../client/public/images');
const optimizedDir = path.join(imagesDir, 'optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Get list of images
const imageFiles = fs.readdirSync(imagesDir).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png'].includes(ext) && !file.includes('optimized-');
});

// Process each image
async function optimizeImages() {
  console.log(`Found ${imageFiles.length} images to optimize`);
  
  for (const file of imageFiles) {
    const inputPath = path.join(imagesDir, file);
    const fileStats = fs.statSync(inputPath);
    const fileSizeMB = fileStats.size / (1024 * 1024);
    
    // Skip small files under 1MB
    if (fileSizeMB < 1) {
      console.log(`Skipping ${file} (${fileSizeMB.toFixed(2)}MB) - already small`);
      continue;
    }
    
    const outputPath = path.join(optimizedDir, file);
    
    try {
      // More aggressive compression for larger files
      const quality = fileSizeMB > 10 ? 60 : fileSizeMB > 5 ? 70 : 80;
      
      console.log(`Optimizing ${file} (${fileSizeMB.toFixed(2)}MB) with quality ${quality}...`);
      
      await sharp(inputPath)
        .jpeg({ quality, mozjpeg: true })
        .toFile(outputPath);
      
      const newStats = fs.statSync(outputPath);
      const newSizeMB = newStats.size / (1024 * 1024);
      const savings = ((1 - newSizeMB / fileSizeMB) * 100).toFixed(2);
      
      console.log(`Optimized ${file}: ${fileSizeMB.toFixed(2)}MB → ${newSizeMB.toFixed(2)}MB (${savings}% reduction)`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

optimizeImages().then(() => {
  console.log('Image optimization complete');
});