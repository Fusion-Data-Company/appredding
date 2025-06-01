/**
 * Enhanced Toast Notification System
 * Provides better user feedback for errors and system status
 */

import { useEffect, useState } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastNotificationSystemProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
};

const toastColors = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800'
};

const iconColors = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500'
};

export function ToastNotificationSystem({ toasts, onRemove }: ToastNotificationSystemProps) {
  const [mountedToasts, setMountedToasts] = useState<string[]>([]);

  useEffect(() => {
    toasts.forEach(toast => {
      if (!mountedToasts.includes(toast.id)) {
        setMountedToasts(prev => [...prev, toast.id]);
        
        if (!toast.persistent && toast.duration !== 0) {
          const duration = toast.duration || (toast.type === 'error' ? 8000 : 5000);
          setTimeout(() => {
            onRemove(toast.id);
          }, duration);
        }
      }
    });
  }, [toasts, mountedToasts, onRemove]);

  const handleRemove = (id: string) => {
    setMountedToasts(prev => prev.filter(toastId => toastId !== id));
    setTimeout(() => onRemove(id), 200); // Allow exit animation
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = toastIcons[toast.type];
          
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "relative p-4 rounded-lg border shadow-lg backdrop-blur-sm",
                toastColors[toast.type]
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", iconColors[toast.type])} />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm">{toast.title}</h4>
                  {toast.message && (
                    <p className="text-sm opacity-90 mt-1">{toast.message}</p>
                  )}
                  
                  {toast.action && (
                    <button
                      onClick={toast.action.onClick}
                      className="mt-2 text-sm font-medium underline hover:no-underline"
                    >
                      {toast.action.label}
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleRemove(toast.id)}
                  className="flex-shrink-0 p-1 rounded-md hover:bg-black/10 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// Hook for managing toasts
export function useToastSystem() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearAll = () => {
    setToasts([]);
  };

  // Convenience methods
  const success = (title: string, message?: string, options?: Partial<Toast>) => {
    return addToast({ type: 'success', title, message, ...options });
  };

  const error = (title: string, message?: string, options?: Partial<Toast>) => {
    return addToast({ type: 'error', title, message, ...options });
  };

  const warning = (title: string, message?: string, options?: Partial<Toast>) => {
    return addToast({ type: 'warning', title, message, ...options });
  };

  const info = (title: string, message?: string, options?: Partial<Toast>) => {
    return addToast({ type: 'info', title, message, ...options });
  };

  return {
    toasts,
    addToast,
    removeToast,
    clearAll,
    success,
    error,
    warning,
    info
  };
}