import { createContext, useContext, useState, ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import SolarConsultationForm from '@/components/SolarConsultationForm';

interface FormModalContextType {
  openSolarForm: () => void;
  closeSolarForm: () => void;
}

const FormModalContext = createContext<FormModalContextType | undefined>(undefined);

export function FormModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openSolarForm = () => setIsOpen(true);
  const closeSolarForm = () => setIsOpen(false);

  return (
    <FormModalContext.Provider value={{ openSolarForm, closeSolarForm }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0 flex flex-col">
          <DialogHeader className="sr-only">
            <DialogTitle>Solar Consultation Request Form</DialogTitle>
            <DialogDescription>Fill out the form below to request a solar consultation</DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto flex-1 p-6">
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
