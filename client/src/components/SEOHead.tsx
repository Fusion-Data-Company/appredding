import { Helmet } from 'react-helmet';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string | string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'service';
  structuredData?: Record<string, any> | Record<string, any>[];
  canonical?: string;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords = [],
  image = '/advance-power-logo.jpg',
  url,
  type = 'website',
  structuredData,
  canonical
}: SEOHeadProps) => {
  // Use window.location.origin for environment-aware base URL
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://apredding.net';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const canonicalUrl = canonical || fullUrl;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  
  const keywordsString = typeof keywords === 'string' 
    ? keywords 
    : (Array.isArray(keywords) ? keywords.join(', ') : '');
  
  const defaultKeywords = 'solar installation, solar panels, solar repair, Northern California solar, NEM 3.0, battery storage, solar energy, Advance Power Redding';
  const finalKeywords = keywordsString ? `${keywordsString}, ${defaultKeywords}` : defaultKeywords;
  
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Advance Power Redding",
    "alternateName": "APR Solar",
    "url": baseUrl,
    "logo": `${baseUrl}/advance-power-logo.jpg`,
    "description": "Northern California's premier solar installation company with 25+ years of experience",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "843 N. Market St.",
      "addressLocality": "Redding",
      "addressRegion": "CA",
      "postalCode": "96001",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Sales",
      "telephone": "+1-530-221-1234",
      "email": "office@apredding.net"
    },
    "sameAs": [
      "https://www.facebook.com/AdvancePowerRedding",
      "https://www.linkedin.com/company/advance-power-redding"
    ]
  };
  
  const structuredDataArray = structuredData 
    ? (Array.isArray(structuredData) ? structuredData : [structuredData])
    : [defaultStructuredData];
  
  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:secure_url" content={fullImageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Advance Power Redding" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {structuredDataArray.map((data, index) => (
        <script key={`structured-data-${index}`} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
