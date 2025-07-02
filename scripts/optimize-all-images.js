#!/usr/bin/env node

import sharp from 'sharp';
import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

console.log('🖼️ PRODUCTION IMAGE OPTIMIZATION\n');

const imagePatterns = [
  'public/images/**/*.{jpg,jpeg,png,gif}',
  'attached_assets/**/*.{jpg,jpeg,png}'
];

const stats = {
  processed: 0,
  originalSize: 0,
  optimizedSize: 0,
  errors: 0
};

async function optimizeImage(inputPath) {
  try {
    const stats = await fs.stat(inputPath);
    const originalSize = stats.size;
    
    const ext = path.extname(inputPath).toLowerCase();
    const outputPath = inputPath.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
    
    // Determine dimensions based on image purpose
    let maxWidth = 1280;
    let maxHeight = 1280;
    
    if (inputPath.includes('hero') || inputPath.includes('banner')) {
      maxWidth = 1920;
      maxHeight = 1080;
    } else if (inputPath.includes('icon') || inputPath.includes('logo')) {
      maxWidth = 200;
      maxHeight = 200;
    } else if (inputPath.includes('thumbnail')) {
      maxWidth = 400;
      maxHeight = 400;
    }
    
    // Optimize and convert to WebP
    await sharp(inputPath)
      .resize(maxWidth, maxHeight, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .webp({ 
        quality: 85,
        effort: 6 
      })
      .toFile(outputPath);
    
    // Check new file size
    const newStats = await fs.stat(outputPath);
    const newSize = newStats.size;
    
    // Verify size limits
    const sizeLimit = inputPath.includes('hero') ? 80000 : 
                     inputPath.includes('icon') ? 10000 : 40000;
    
    if (newSize > sizeLimit) {
      // Re-optimize with lower quality
      await sharp(inputPath)
        .resize(maxWidth, maxHeight, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .webp({ 
          quality: 70,
          effort: 6 
        })
        .toFile(outputPath);
    }
    
    const finalStats = await fs.stat(outputPath);
    const finalSize = finalStats.size;
    
    stats.processed++;
    stats.originalSize += originalSize;
    stats.optimizedSize += finalSize;
    
    const reduction = ((originalSize - finalSize) / originalSize * 100).toFixed(1);
    console.log(`✓ ${path.basename(inputPath)} → ${path.basename(outputPath)} (${reduction}% smaller)`);
    
    // Keep original for fallback
    if (ext !== '.webp') {
      // Also create optimized version in original format
      const fallbackPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '-opt$1');
      await sharp(inputPath)
        .resize(maxWidth, maxHeight, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .jpeg({ quality: 85, progressive: true })
        .toFile(fallbackPath);
    }
    
  } catch (error) {
    console.error(`✗ Error optimizing ${inputPath}:`, error.message);
    stats.errors++;
  }
}

// Process all images
console.log('🔍 Scanning for images...\n');

for (const pattern of imagePatterns) {
  const images = await glob(pattern);
  console.log(`Found ${images.length} images in ${pattern}\n`);
  
  for (const image of images) {
    await optimizeImage(image);
  }
}

// Final report
console.log('\n📊 OPTIMIZATION COMPLETE:');
console.log(`   Images processed: ${stats.processed}`);
console.log(`   Original size: ${(stats.originalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`   Optimized size: ${(stats.optimizedSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`   Total reduction: ${((stats.originalSize - stats.optimizedSize) / stats.originalSize * 100).toFixed(1)}%`);
console.log(`   Errors: ${stats.errors}`);

// Update image references in code
console.log('\n🔄 Updating image references in code...');

const codePatterns = [
  'client/src/**/*.{tsx,jsx,ts,js}',
  'server/**/*.{ts,js}'
];

let referencesUpdated = 0;

for (const pattern of codePatterns) {
  const files = await glob(pattern);
  
  for (const file of files) {
    let content = await fs.readFile(file, 'utf8');
    const originalContent = content;
    
    // Replace image extensions with .webp
    content = content.replace(/\.(jpg|jpeg|png)(['"])/gi, '.webp$2');
    
    if (content !== originalContent) {
      await fs.writeFile(file, content);
      referencesUpdated++;
    }
  }
}

console.log(`✅ Updated ${referencesUpdated} file references to use WebP format`);