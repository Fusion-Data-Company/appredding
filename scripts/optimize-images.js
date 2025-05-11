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
    const filename = path.parse(file).name;
    
    // Skip small files under 100KB
    if (fileSizeMB < 0.1) {
      console.log(`Skipping ${file} (${(fileSizeMB * 1024).toFixed(2)}KB) - already small`);
      continue;
    }
    
    const outputJpg = path.join(optimizedDir, file);
    const outputWebp = path.join(optimizedDir, `${filename}.webp`);
    const outputAvif = path.join(optimizedDir, `${filename}.avif`);
    
    try {
      // More aggressive compression for larger files
      const quality = fileSizeMB > 10 ? 60 : fileSizeMB > 5 ? 70 : 80;
      const avifQuality = Math.max(quality - 15, 40); // AVIF can use lower quality with good results
      
      console.log(`Optimizing ${file} (${fileSizeMB.toFixed(2)}MB) to multiple formats...`);
      
      // Original format optimized with mozjpeg
      const originalImage = sharp(inputPath);
      await originalImage
        .jpeg({ quality, mozjpeg: true })
        .toFile(outputJpg);
      
      // WebP version (typically 25-35% smaller than JPEG)
      await originalImage
        .webp({ quality, effort: 6 })
        .toFile(outputWebp);
      
      // AVIF version (typically 50% smaller than JPEG)
      await originalImage
        .avif({ quality: avifQuality, effort: 9 })
        .toFile(outputAvif);
      
      // Report file size reductions
      const newJpgStats = fs.statSync(outputJpg);
      const newWebpStats = fs.statSync(outputWebp);
      const newAvifStats = fs.statSync(outputAvif);
      
      const newJpgSizeMB = newJpgStats.size / (1024 * 1024);
      const newWebpSizeMB = newWebpStats.size / (1024 * 1024);
      const newAvifSizeMB = newAvifStats.size / (1024 * 1024);
      
      const jpgSavings = ((1 - newJpgSizeMB / fileSizeMB) * 100).toFixed(2);
      const webpSavings = ((1 - newWebpSizeMB / fileSizeMB) * 100).toFixed(2);
      const avifSavings = ((1 - newAvifSizeMB / fileSizeMB) * 100).toFixed(2);
      
      console.log(`Image ${file} optimized:
        Original: ${fileSizeMB.toFixed(2)}MB
        JPEG:     ${newJpgSizeMB.toFixed(2)}MB (${jpgSavings}% reduction)
        WebP:     ${newWebpSizeMB.toFixed(2)}MB (${webpSavings}% reduction)
        AVIF:     ${newAvifSizeMB.toFixed(2)}MB (${avifSavings}% reduction)
      `);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

optimizeImages().then(() => {
  console.log('Image optimization complete');
});