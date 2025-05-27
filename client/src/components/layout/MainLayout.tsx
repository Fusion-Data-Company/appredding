import React, { ReactNode } from 'react';
import SolarHeader from '@/components/SolarHeader';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import VoiceChatPopout from '@/components/VoiceChatPopout';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

/**
 * Main layout component for Advance Power of Redding solar company
 */
export default function MainLayout({ children, className, fullWidth = false }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <SolarHeader />
      
      <main className={cn(
        "flex-1 pt-32 relative z-10", // Account for the new header height
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
      <VoiceChatPopout />
    </div>
  );
}