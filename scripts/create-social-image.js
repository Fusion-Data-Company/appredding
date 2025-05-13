import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source and destination directories
const sourceDir = path.join(__dirname, '../client/src/assets_dir/images');
const destDir = path.join(__dirname, '../client/public/images');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Create a social media optimized image
async function createSocialImage() {
  const sourcePath = path.join(sourceDir, 'praetorian-hero-final.png');
  const destPath = path.join(destDir, 'praetorian-social-share.jpg');
  
  console.log('Creating social media optimized image...');
  
  try {
    // Generate a 1200x630 image optimized for social media sharing
    await sharp(sourcePath)
      .resize(1200, 630, { 
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 1 }
      })
      .jpeg({ 
        quality: 85,
        progressive: true
      })
      .toFile(destPath);
    
    console.log(`Created social media image at ${destPath}`);
    
    // Get file size
    const stats = fs.statSync(destPath);
    const fileSizeInKb = stats.size / 1024;
    console.log(`File size: ${fileSizeInKb.toFixed(2)} KB`);
    
    return destPath;
  } catch (error) {
    console.error('Error creating social media image:', error);
  }
}

// Run the function
createSocialImage();