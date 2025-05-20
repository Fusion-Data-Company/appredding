import React from 'react';
import { Helmet } from 'react-helmet';

interface SimpleSEOProps {
  title: string;
  description: string;
  keywords?: string | string[];
}

const SimpleSEO: React.FC<SimpleSEOProps> = ({ 
  title, 
  description, 
  keywords = []
}) => {
  // Handle keywords whether they're a string or array
  const keywordsString = typeof keywords === 'string' 
    ? keywords 
    : (Array.isArray(keywords) ? keywords.join(', ') : '');
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
    </Helmet>
  );
};

export default SimpleSEO;