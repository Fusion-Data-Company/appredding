import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOHeadProps {
  title: string;
  description: string;
  imagePath?: string;
  industry: string;
  slug: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ 
  title, 
  description, 
  imagePath = `/images/og-default.jpg`, 
  industry,
  slug
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`Praetorian Smart-Coat – ${industry}`} />
      <meta property="og:description" content={`Fireproof, insulating ceramic paint for ${industry}. Guard what matters.`} />
      <meta property="og:image" content={`/images/og-${slug}.jpg`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`Praetorian Smart-Coat – ${industry}`} />
      <meta name="twitter:description" content={`Fireproof, insulating ceramic paint for ${industry}. Guard what matters.`} />
      <meta name="twitter:image" content={`/images/og-${slug}.jpg`} />
      
      {/* Preload hero image */}
      <link rel="preload" as="image" href={imagePath} />
    </Helmet>
  );
};

export default SEOHead;