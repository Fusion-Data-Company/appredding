/**
 * Helper function to get optimized image path if available
 * Falls back to original image if optimized version doesn't exist
 */
export function getOptimizedImagePath(imagePath: string): string {
  // Check if this is already a path with "/images/" in it
  if (imagePath.includes('/images/')) {
    const pathParts = imagePath.split('/images/');
    return `${pathParts[0]}/images/optimized/${pathParts[1]}`;
  }
  
  // Otherwise, assume it's just a filename
  return `/images/optimized/${imagePath}`;
}