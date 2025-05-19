/**
 * Helper functions for enhancing SEO and accessibility across Praetorian Smart-Coat industry pages
 */

// Add preload link for critical images
export const preloadCriticalImage = (imagePath: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = imagePath;
  link.as = 'image';
  document.head.appendChild(link);
  
  console.log('Hero image path:', imagePath);
  
  return true;
};

// Add Open Graph and Twitter meta tags
export const addSocialTags = (
  title: string, 
  description: string, 
  industry: string,
  slug: string,
  imagePath: string = `/images/og-${slug}.jpg`
) => {
  // Create meta tags dynamically
  const metaTags = [
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: `Praetorian Smart-Coat – ${industry}` },
    { property: 'og:description', content: `Fireproof, insulating ceramic paint for ${industry}. Guard what matters.` },
    { property: 'og:image', content: imagePath },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `Praetorian Smart-Coat – ${industry}` },
    { name: 'twitter:description', content: `Fireproof, insulating ceramic paint for ${industry}. Guard what matters.` },
    { name: 'twitter:image', content: imagePath }
  ];
  
  // Add each meta tag to the document head
  metaTags.forEach(tag => {
    const meta = document.createElement('meta');
    
    if (tag.property) {
      meta.setAttribute('property', tag.property);
    } else if (tag.name) {
      meta.setAttribute('name', tag.name);
    }
    
    meta.setAttribute('content', tag.content);
    document.head.appendChild(meta);
  });
  
  return true;
};

// Generate proper alt text for images
export const getAccessibleAltText = (industry: string, context: string = '') => {
  return `Praetorian Smart-Coat | ${industry} | fireproof coating${context ? ` ${context}` : ''}`;
};