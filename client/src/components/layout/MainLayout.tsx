import React, { ReactNode, useEffect } from 'react';
import SolarCompanyHeader from '@/components/layout/Header';
import SolarFooter from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

/**
 * Main layout component for Advance Power Redding solar company
 */
export default function MainLayout({ children, className, fullWidth = false }: MainLayoutProps) {
  useEffect(() => {
    // Load ElevenLabs widget script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    // Create and append the custom element
    const widget = document.createElement('elevenlabs-convai');
    widget.setAttribute('agent-id', 'agent_01jw96xdk3etzvskmex8kx5mjn');
    document.body.appendChild(widget);

    // Cleanup on unmount
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (widget.parentNode) {
        widget.parentNode.removeChild(widget);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <SolarCompanyHeader />
      
      <main
        className={cn(
          "flex-1 pb-16 relative z-10",
          "md:pb-12",
          className
        )}
      >
        {fullWidth ? (
          children
        ) : (
          <div className="container mx-auto px-4 md:px-6">
            {children}
          </div>
        )}
      </main>
      
      <SolarFooter />
    </div>
  );
}