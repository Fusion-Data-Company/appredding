import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source and destination directories
const sourceDir = path.join(__dirname, '../client/src/assets_dir/images');
const destDir = path.join(__dirname, '../client/src/assets_dir/images/optimized');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Function to optimize an image
async function optimizeImage(filename) {
  const sourcePath = path.join(sourceDir, filename);
  const fileExt = path.extname(filename);
  const baseName = path.basename(filename, fileExt);
  const webpPath = path.join(destDir, `${baseName}.webp`);
  
  console.log(`Optimizing ${filename}...`);
  
  try {
    // Process large images to WebP format with good compression
    if (filename === 'praetorian-hero-final.png') {
      await sharp(sourcePath)
        .webp({ quality: 80 }) // Use lower quality for larger compression
        .toFile(webpPath);
      
      console.log(`Converted ${filename} to WebP format at ${webpPath}`);
      
      // Create a smaller placeholder version for faster initial loading
      const placeholderPath = path.join(destDir, `${baseName}-placeholder.webp`);
      await sharp(sourcePath)
        .resize({ width: 800 }) // Smaller resolution for placeholder
        .webp({ quality: 30 }) // Low quality for smaller file size
        .toFile(placeholderPath);
      
      console.log(`Created placeholder for ${filename} at ${placeholderPath}`);
    } else {
      // For other images, just convert to WebP with good quality
      await sharp(sourcePath)
        .webp({ quality: 85 })
        .toFile(webpPath);
      
      console.log(`Converted ${filename} to WebP format at ${webpPath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filename}:`, error);
  }
}

// Main function to process images
async function processImages() {
  try {
    // Only optimize the hero image for now
    const heroImage = 'praetorian-hero-final.png';
    
    if (fs.existsSync(path.join(sourceDir, heroImage))) {
      console.log('Found hero image to optimize');
      await optimizeImage(heroImage);
      console.log('Hero image has been optimized!');
    } else {
      console.error('Hero image not found:', heroImage);
    }
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

// Run the optimization
processImages();