import React, { ReactNode } from 'react';
import ProfessionalHeader from '@/components/ProfessionalHeader';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

/**
 * Main layout component with the premium professional header
 */
export default function MainLayout({ children, className, fullWidth = false }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <ProfessionalHeader />
      
      <main className={cn(
        "flex-1 pt-24", // Further reduced padding to match smaller header
        className
      )}>
        {fullWidth ? (
          children
        ) : (
          <div className="container mx-auto px-4 md:px-6">
            {children}
          </div>
        )}
      </main>
      
      <Footer />
      <ChatWidget />
    </div>
  );
}