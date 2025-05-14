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
    <div className="min-h-screen flex flex-col bg-black relative">
      {/* Global shadow overlay - This creates a consistent dark look across all pages */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.85) 100%)',
          mixBlendMode: 'multiply'
        }}
      />

      {/* Subtle texture overlay for depth */}
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '20px 20px'
        }}
      />

      <ProfessionalHeader />
      
      <main className={cn(
        "flex-1 pt-24 relative z-10", // z-index ensures content is above overlays
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