// Solar-specific analytics tracking
export interface SolarEvent {
  event: string;
  category: 'hero' | 'funnel' | 'commerce' | 'benefits' | 'contact';
  action: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
}

class SolarAnalytics {
  private events: SolarEvent[] = [];

  track(event: SolarEvent) {
    // Add timestamp
    const eventWithTimestamp = {
      ...event,
      timestamp: new Date().toISOString(),
      url: window.location.pathname,
      userAgent: navigator.userAgent
    };

    this.events.push(eventWithTimestamp);
    
    // Log to console in development
    if (import.meta.env.DEV) {
      console.log('Solar Analytics:', eventWithTimestamp);
    }

    // Send to analytics service (placeholder)
    this.sendToAnalytics(eventWithTimestamp);
  }

  private sendToAnalytics(event: any) {
    // In production, this would send to your analytics service
    // For now, we'll just store in localStorage for debugging
    try {
      const existing = JSON.parse(localStorage.getItem('solar-analytics') || '[]');
      existing.push(event);
      localStorage.setItem('solar-analytics', JSON.stringify(existing.slice(-100))); // Keep last 100 events
    } catch (error) {
      console.error('Analytics storage error:', error);
    }
  }

  // Hero section tracking
  trackHeroInteraction(action: string, label?: string) {
    this.track({
      event: 'hero_interaction',
      category: 'hero',
      action,
      label
    });
  }

  // Funnel tracking
  trackFunnelStage(stage: string, action: string) {
    this.track({
      event: 'funnel_stage',
      category: 'funnel',
      action,
      label: stage
    });
  }

  // Commerce tracking
  trackCommerceAction(action: string, value?: number) {
    this.track({
      event: 'commerce_action',
      category: 'commerce',
      action,
      value
    });
  }

  // Benefits section tracking
  trackBenefitsView(benefit: string) {
    this.track({
      event: 'benefits_view',
      category: 'benefits',
      action: 'view',
      label: benefit
    });
  }

  // Contact form tracking
  trackContactSubmission(formType: string, success: boolean) {
    this.track({
      event: 'contact_submission',
      category: 'contact',
      action: success ? 'success' : 'error',
      label: formType
    });
  }

  // Get analytics data
  getAnalyticsData() {
    return this.events;
  }

  // Clear analytics data
  clearAnalyticsData() {
    this.events = [];
    localStorage.removeItem('solar-analytics');
  }
}

export const solarAnalytics = new SolarAnalytics();

