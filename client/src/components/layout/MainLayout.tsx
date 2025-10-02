import React, { ReactNode } from 'react';
import SolarCompanyHeader from '@/components/layout/Header';
import SolarFooter from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-id'?: string;
      };
    }
  }
}

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <SolarCompanyHeader />
      
      <main className={cn(
        "flex-1 pt-24 pb-16 relative z-10", // Account for header and footer height on mobile
        "md:pt-20 md:pb-12", // Larger screens get normal padding
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
      
      <SolarFooter />
      
      {/* ElevenLabs Voice Widget */}
      <elevenlabs-convai agent-id="demo"></elevenlabs-convai>
    </div>
  );
}