import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import SolarConsultationForm from '@/components/SolarConsultationForm';
import { X } from 'lucide-react';

interface FormModalContextType {
  openSolarForm: () => void;
  closeSolarForm: () => void;
}

const FormModalContext = createContext<FormModalContextType | undefined>(undefined);

export function FormModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openSolarForm = () => {
    // Store the currently focused element (the button that opened the modal)
    triggerRef.current = document.activeElement as HTMLElement;
    setIsOpen(true);
  };
  
  const closeSolarForm = () => {
    setIsOpen(false);
    // Restore focus to the trigger element after closing
    setTimeout(() => {
      triggerRef.current?.focus();
      triggerRef.current = null;
    }, 100);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <FormModalContext.Provider value={{ openSolarForm, closeSolarForm }}>
      {children}
      <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open) {
          closeSolarForm();
        }
      }}>
        <DialogContent 
          className="max-w-5xl w-[95vw] max-h-[95vh] h-auto p-0 gap-0 flex flex-col overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.98))',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            boxShadow: `
              0 0 0 1px rgba(255, 255, 255, 0.1) inset,
              0 25px 50px -12px rgba(0, 0, 0, 0.5),
              0 0 100px rgba(59, 130, 246, 0.15)
            `
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
            closeSolarForm();
          }}
        >
          {/* Premium Close Button */}
          <button
            onClick={closeSolarForm}
            className="absolute right-6 top-6 z-50 p-2 rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
            data-testid="button-close-form"
            aria-label="Close form"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <DialogHeader className="sr-only">
            <DialogTitle>Solar Consultation Request Form</DialogTitle>
            <DialogDescription>Fill out the form below to request a solar consultation</DialogDescription>
          </DialogHeader>
          
          {/* Ultra-Premium Scrollable Content with PLENTY of room */}
          <div 
            className="overflow-y-auto flex-1 p-8 md:p-10"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(148, 163, 184, 0.3) transparent'
            }}
          >
            <SolarConsultationForm onSuccess={closeSolarForm} />
          </div>
        </DialogContent>
      </Dialog>
    </FormModalContext.Provider>
  );
}

export function useFormModal() {
  const context = useContext(FormModalContext);
  if (!context) {
    throw new Error('useFormModal must be used within FormModalProvider');
  }
  return context;
}
