import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if an image path was provided
const imagePath = process.argv[2];

if (!imagePath) {
  console.error('Please provide an image path to optimize!');
  console.log('Usage: node scripts/optimize-single.js path/to/image.jpg');
  process.exit(1);
}

async function optimizeImage() {
  // Resolve the image path relative to the current directory
  const inputPath = path.resolve(process.cwd(), imagePath);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`Image not found: ${inputPath}`);
    process.exit(1);
  }
  
  const fileInfo = path.parse(inputPath);
  const optimizedDir = path.join(fileInfo.dir, 'optimized');
  
  // Create optimized directory if it doesn't exist
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
  }
  
  // Calculate output paths
  const outputJpg = path.join(optimizedDir, fileInfo.base);
  const outputWebp = path.join(optimizedDir, `${fileInfo.name}.webp`);
  const outputAvif = path.join(optimizedDir, `${fileInfo.name}.avif`);
  
  try {
    const fileStats = fs.statSync(inputPath);
    const fileSizeMB = fileStats.size / (1024 * 1024);
    
    // Determine quality based on file size
    const quality = fileSizeMB > 10 ? 60 : fileSizeMB > 5 ? 70 : 80;
    const avifQuality = Math.max(quality - 15, 40); // AVIF can use lower quality with good results
    
    console.log(`Optimizing ${path.basename(inputPath)} (${fileSizeMB.toFixed(2)}MB)...`);
    
    // Create a single sharp instance for the image to avoid processing it multiple times
    const image = sharp(inputPath);
    
    // Original format optimized with mozjpeg (if it's a JPEG)
    if (fileInfo.ext.toLowerCase() === '.jpg' || fileInfo.ext.toLowerCase() === '.jpeg') {
      await image.clone().jpeg({ quality, mozjpeg: true }).toFile(outputJpg);
    } else if (fileInfo.ext.toLowerCase() === '.png') {
      // For PNG, use pngquant compression
      await image.clone().png({ quality, compressionLevel: 9, palette: true }).toFile(outputJpg);
    } else {
      // For other formats, just copy
      await fs.promises.copyFile(inputPath, outputJpg);
    }
    
    // WebP version
    await image.clone().webp({ quality, effort: 6 }).toFile(outputWebp);
    
    // AVIF version (typically 50% smaller than JPEG)
    await image.clone().avif({ quality: avifQuality, effort: 9 }).toFile(outputAvif);
    
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
    
    console.log(`
Image optimized successfully:
  Original: ${fileSizeMB.toFixed(2)}MB
  JPEG:     ${newJpgSizeMB.toFixed(2)}MB (${jpgSavings}% reduction)
  WebP:     ${newWebpSizeMB.toFixed(2)}MB (${webpSavings}% reduction)
  AVIF:     ${newAvifSizeMB.toFixed(2)}MB (${avifSavings}% reduction)

Optimized images saved to:
  ${outputJpg}
  ${outputWebp}
  ${outputAvif}
`);
  } catch (err) {
    console.error(`Error processing image:`, err);
    process.exit(1);
  }
}

optimizeImage().catch(err => {
  console.error('Optimization failed:', err);
});