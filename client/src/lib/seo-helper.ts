/**
 * Helper functions for enhancing SEO and accessibility across Advance Power industry pages
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
  // Use window.location.origin for environment-aware base URL
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://apredding.net';

  // Create meta tags dynamically
  const metaTags = [
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${baseUrl}/${slug}` },
    { property: 'og:title', content: `Advance Power – ${industry}` },
    { property: 'og:description', content: `Solar energy solutions for ${industry}. Powering your future.` },
    { property: 'og:image', content: `${baseUrl}${imagePath}` },
    { property: 'og:site_name', content: 'Advance Power Redding' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: `${baseUrl}/${slug}` },
    { name: 'twitter:title', content: `Advance Power – ${industry}` },
    { name: 'twitter:description', content: `Solar energy solutions for ${industry}. Powering your future.` },
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
  // Use window.location.origin for environment-aware base URL
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://apredding.net';
  
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
    'Advance Power Redding',
    'solar panels',
    'solar energy',
    'battery storage',
    'renewable energy',
    industry,
    'solar installation'
  ];
  
  // Add industry-specific keywords
  const industryKeywords: Record<string, string[]> = {
    'residential-solar': [
      'home solar panels',
      'residential solar installation',
      'home energy savings',
      'rooftop solar',
      'solar for homes'
    ],
    'commercial-solar': [
      'commercial solar panels',
      'business solar solutions',
      'commercial solar installation',
      'industrial solar',
      'solar for businesses'
    ],
    'construction': [
      'construction solar power',
      'job site solar',
      'temporary solar power',
      'construction energy solutions',
      'portable solar'
    ],
    'mobile-homes': [
      'manufactured home solar',
      'mobile home solar panels',
      'RV solar solutions',
      'mobile home energy',
      'solar for manufactured homes'
    ],
    'municipalities': [
      'municipal solar',
      'government solar solutions',
      'public solar projects',
      'city solar power',
      'municipal renewable energy'
    ],
    'battery-storage': [
      'solar battery backup',
      'energy storage systems',
      'lithium battery storage',
      'backup power',
      'grid independence'
    ],
    'data-centers': [
      'data center solar',
      'critical infrastructure power',
      'server solar backup',
      'data center energy',
      'reliable solar power'
    ]
  };
  
  const specificKeywords = industryKeywords[industry] || [];
  
  // Combine all keywords and remove duplicates
  return Array.from(new Set([...baseKeywords, ...specificKeywords, ...additionalKeywords]));
};