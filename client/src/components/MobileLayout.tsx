import { ReactNode } from 'react';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

interface MobileLayoutProps {
  desktopComponent: ReactNode;
  mobileComponent: ReactNode;
  tabletComponent?: ReactNode;
}

export const ResponsiveLayout = ({ 
  desktopComponent, 
  mobileComponent, 
  tabletComponent 
}: MobileLayoutProps) => {
  const { isMobile, isTablet, isDesktop } = useDeviceDetection();

  if (isMobile) {
    return <>{mobileComponent}</>;
  }

  if (isTablet && tabletComponent) {
    return <>{tabletComponent}</>;
  }

  if (isDesktop) {
    return <>{desktopComponent}</>;
  }

  return <>{desktopComponent}</>;
};

export const MobileWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mobile-layout min-h-screen bg-gray-900">
      <div className="mobile-container">
        {children}
      </div>
    </div>
  );
};

export const MobileSection = ({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string; 
}) => {
  return (
    <section className={`mobile-section py-8 px-4 ${className}`}>
      <div className="max-w-sm mx-auto">
        {children}
      </div>
    </section>
  );
};