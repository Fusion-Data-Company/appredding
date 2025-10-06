import { useState } from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Lock, Mail } from 'lucide-react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const Footer = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    
    if (pin === '0843') {
      sessionStorage.setItem('adminAccess', 'true');
      setAdminDialogOpen(false);
      setPin('');
      toast({
        title: 'Access Granted',
        description: 'Redirecting to admin panel...',
      });
      setLocation('/admin-crm');
    } else {
      setPinError('Invalid PIN code');
      setPin('');
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: 'Error',
        description: 'Please enter your email address',
        variant: 'destructive',
      });
      return;
    }

    setIsSubscribing(true);
    try {
      await apiRequest('POST', '/api/newsletter/subscribe', {
        email,
        source: 'newsletter_form',
      });

      toast({
        title: 'Success!',
        description: 'You have been subscribed to our newsletter',
      });
      setEmail('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to subscribe. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <>
      <footer className="fixed bottom-0 left-0 w-full bg-gray-900/95 backdrop-blur-xl border-t border-orange-500/30 shadow-[0_-4px_25px_rgba(0,0,0,0.3)] z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors"
                aria-label="Facebook"
                data-testid="link-facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors"
                aria-label="LinkedIn"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors"
                aria-label="Twitter"
                data-testid="link-twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>

            <div className="flex items-center justify-center">
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full max-w-md">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Subscribe to newsletter"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500"
                    disabled={isSubscribing}
                    data-testid="input-newsletter-email"
                  />
                </div>
                <Button
                  type="submit"
                  variant="default"
                  disabled={isSubscribing}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  data-testid="button-newsletter-subscribe"
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </div>

            <div className="flex items-center justify-center md:justify-end gap-4">
              <span className="text-white font-medium text-sm">
                ©2025 Advance Power of Redding
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAdminDialogOpen(true)}
                className="text-gray-500 hover:text-orange-500 transition-colors"
                data-testid="button-admin"
              >
                <Lock className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={adminDialogOpen} onOpenChange={setAdminDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Admin Access</DialogTitle>
            <DialogDescription>
              Enter the 4-digit PIN code to access the admin panel
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                inputMode="numeric"
                maxLength={4}
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value.replace(/[^0-9]/g, ''));
                  setPinError('');
                }}
                className="text-center text-2xl tracking-widest"
                autoFocus
                data-testid="input-admin-pin"
              />
              {pinError && (
                <p className="text-sm text-red-500 text-center" data-testid="text-pin-error">
                  {pinError}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setAdminDialogOpen(false);
                  setPin('');
                  setPinError('');
                }}
                className="flex-1"
                data-testid="button-cancel-pin"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                data-testid="button-submit-pin"
              >
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Footer;