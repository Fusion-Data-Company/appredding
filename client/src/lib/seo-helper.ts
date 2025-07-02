/**
 * Helper functions for enhancing SEO and accessibility across Praetorian Smart-Coat industry pages
 */

// Add preload link for critical images
export const preloadCriticalImage = (imagePath: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = imagePath;
  link.as = 'image';
  link.setAttribute('fetchpriority', 'high');
  document.head.appendChild(link);

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
  const baseUrl = 'https://praetorian-smart-coat.com';
  
  // Create meta tags dynamically
  const metaTags = [
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${baseUrl}/${slug}` },
    { property: 'og:title', content: `Praetorian Smart-Coat – ${industry}` },
    { property: 'og:description', content: `Fireproof, insulating ceramic paint for ${industry}. Guard what matters.` },
    { property: 'og:image', content: `${baseUrl}${imagePath}` },
    { property: 'og:site_name', content: 'Praetorian Smart-Coat' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: `${baseUrl}/${slug}` },
    { name: 'twitter:title', content: `Praetorian Smart-Coat – ${industry}` },
    { name: 'twitter:description', content: `Fireproof, insulating ceramic paint for ${industry}. Guard what matters.` },
    { name: 'twitter:image', content: `${baseUrl}${imagePath}` }
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

/**
 * Generate proper alt text for images following accessibility best practices
 * Format: "Advance Power | {industry} | solar energy solutions {optional context}"
 */
export const getAccessibleAltText = (industry: string, context: string = '') => {
  return `Advance Power | ${industry} | solar energy solutions${context ? ` ${context}` : ''}`;
};

/**
 * Generate structured data for industry pages
 * Improves search engine visibility with JSON-LD markup
 */
export const generateStructuredData = (
  industry: string,
  description: string,
  slug: string,
  features: string[] = []
) => {
  const baseUrl = 'https://advance-power-redding.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Advance Power Solar Solutions for ${industry}`,
    "description": description,
    "image": `${baseUrl}/images/og-${slug}.jpg`,
    "brand": {
      "@type": "Brand",
      "name": "Advance Power",
      "logo": `${baseUrl}/images/advance-power-logo.png`
    },
    "offers": {
      "@type": "Offer",
      "url": `${baseUrl}/${slug}`,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    },
    ...(features.length > 0 && {
      "additionalProperty": features.map(feature => ({
        "@type": "PropertyValue",
        "name": "Feature",
        "value": feature
      }))
    })
  };
};

/**
 * Generate industry-specific keywords for SEO optimization
 */
export const getIndustryKeywords = (industry: string, additionalKeywords: string[] = []) => {
  const baseKeywords = [
    'Praetorian Smart-Coat', 
    'fireproof coating',
    'insulating paint',
    'ceramic coating',
    'thermal protection',
    industry,
    'fire resistant'
  ];
  
  // Add industry-specific keywords
  const industryKeywords: Record<string, string[]> = {
    'fire-prevention': [
      'fire protection',
      'flame resistant coating',
      'intumescent paint',
      'fireproof paint',
      'fire retardant'
    ],
    'construction': [
      'construction coatings',
      'building protection',
      'contractor supplies',
      'commercial construction',
      'building materials'
    ],
    'pools': [
      'pool coating',
      'swimming pool protection',
      'waterproof coating',
      'pool maintenance',
      'pool resurfacing'
    ],
    'mobile-home': [
      'manufactured home protection',
      'mobile home insulation',
      'energy efficient coating',
      'mobile home safety',
      'mobile home fire protection'
    ],
    'marinas': [
      'marine coating',
      'boat protection',
      'marine-grade paint',
      'corrosion protection',
      'saltwater resistant'
    ],
    'municipality': [
      'municipal building protection',
      'government building coating',
      'public works materials',
      'municipality supplies',
      'government fireproofing'
    ],
    'painters': [
      'professional paint supplies',
      'painting contractor materials',
      'specialty coatings',
      'commercial painting',
      'industrial coatings'
    ]
  };
  
  const specificKeywords = industryKeywords[industry] || [];
  
  // Combine all keywords and remove duplicates
  return Array.from(new Set([...baseKeywords, ...specificKeywords, ...additionalKeywords]));
};