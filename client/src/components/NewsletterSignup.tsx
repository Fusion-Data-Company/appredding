import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Mail, Check } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

interface NewsletterSignupProps {
  className?: string;
  variant?: 'inline' | 'footer';
}

export default function NewsletterSignup({ className = '', variant = 'footer' }: NewsletterSignupProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (data: NewsletterFormValues) => {
      return await apiRequest('/api/newsletter/subscribe', {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          source: 'newsletter_form'
        }),
      });
    },
    onSuccess: () => {
      setIsSuccess(true);
      form.reset();
      setTimeout(() => setIsSuccess(false), 5000);
    },
    onError: (error: any) => {
      console.error('Newsletter subscription error:', error);
    },
  });

  const onSubmit = (data: NewsletterFormValues) => {
    subscribeMutation.mutate(data);
  };

  if (isSuccess) {
    return (
      <div className={`flex items-center gap-2 text-green-400 ${className}`}>
        <Check className="w-5 h-5" />
        <span className="text-sm">Successfully subscribed to newsletter!</span>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-3 ${className}`}>
          <div className="flex flex-col sm:flex-row gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
                      data-testid="input-newsletter-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={subscribeMutation.isPending}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
              data-testid="button-newsletter-subscribe"
            >
              {subscribeMutation.isPending ? (
                <span>Subscribing...</span>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Subscribe
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`w-full ${className}`}>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="your@email.com"
                    className="h-12"
                    data-testid="input-newsletter-email-inline"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={subscribeMutation.isPending}
            className="h-12 px-6"
            data-testid="button-newsletter-subscribe-inline"
          >
            {subscribeMutation.isPending ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
