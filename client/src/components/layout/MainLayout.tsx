import React, { ReactNode } from 'react';
import ProfessionalHeader from '@/components/ProfessionalHeader';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import VoiceChatPopout from '@/components/VoiceChatPopout';
import PitchDeckSlider from '@/components/ui/PitchDeckSlider';
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
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 relative">
      {/* Main background with consistent dark overlay */}
      <div 
        className="fixed inset-0 z-0 bg-black/60" 
        style={{ 
          pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.75) 100%)'
        }}
      />

      <ProfessionalHeader />
      
      <main className={cn(
        "flex-1 pt-24 relative z-10", // Added z-index to ensure content is above overlay
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
      <PitchDeckSlider />
    </div>
  );
}