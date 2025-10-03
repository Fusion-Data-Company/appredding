import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOHeadProps {
  title: string;
  description: string;
  imagePath?: string;
  industry: string;
  slug: string;
  keywords?: string[];
  canonical?: string;
  structuredData?: Record<string, any>;
}

/**
 * SEOHead Component - Enhanced for Accessibility and SEO
 * 
 * Provides comprehensive metadata for industry pages including:
 * - Standard meta tags
 * - Open Graph / Facebook tags
 * - Twitter Card tags
 * - Structured data (JSON-LD)
 * - Canonicalization
 * - Preloaded hero images
 * - Accessibility enhancement
 */
const SEOHead: React.FC<SEOHeadProps> = ({ 
  title, 
  description, 
  imagePath = `/images/og-default.jpg`, 
  industry,
  slug,
  keywords = [],
  canonical,
  structuredData
}) => {
  // Default keywords if none provided
  const defaultKeywords = [
    'Advance Power Redding', 
    'solar panels',
    'solar energy',
    'battery storage',
    'renewable energy',
    industry,
    'solar installation'
  ];

  // Combine default keywords with any provided and remove duplicates
  const allKeywords = Array.from(new Set([...defaultKeywords, ...keywords])).join(', ');
  
  // Build canonical URL if provided
  const canonicalUrl = canonical || `https://apredding.net/${slug}`;
  
  // Generate default structured data if none provided
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Advance Power Redding for ${industry}`,
    "description": description,
    "image": `https://apredding.net/images/og-${slug}.jpg`,
    "brand": {
      "@type": "Brand",
      "name": "Advance Power Redding"
    },
    "offers": {
      "@type": "Offer",
      "url": canonicalUrl,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  // Use provided structured data or default
  const finalStructuredData = structuredData || defaultStructuredData;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang="en" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={`Advance Power Redding – ${industry}`} />
      <meta property="og:description" content={`Solar energy solutions for ${industry}. Powering your future.`} />
      <meta property="og:image" content={`https://apredding.net/images/og-${slug}.jpg`} />
      <meta property="og:site_name" content="Advance Power Redding" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={`Advance Power Redding – ${industry}`} />
      <meta name="twitter:description" content={`Solar energy solutions for ${industry}. Powering your future.`} />
      <meta name="twitter:image" content={`https://apredding.net/images/og-${slug}.jpg`} />
      
      {/* Preload hero image */}
      <link rel="preload" as="image" href={imagePath} />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;