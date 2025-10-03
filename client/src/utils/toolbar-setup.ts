/**
 * 21st Extension Toolbar Setup
 * 
 * This utility initializes the 21st extension toolbar for enhanced AI development workflow.
 * Only runs in development mode and connects to the Cursor extension.
 */

import { initToolbar } from '@21st-extension/toolbar';

// Toolbar configuration for the solar platform
const stagewiseConfig = {
  plugins: [
    // Add any specific plugins for your solar platform here
    // Example: 'solar-component-generator', 'energy-calculator-helper'
  ],
  // Custom configuration for your platform
  theme: 'dark', // Match your platform's dark theme
  position: 'bottom-right', // Position of the toolbar
  autoConnect: false, // Disable auto-connect in Replit environment
  standalone: true, // Run in standalone mode without IDE connection
  hideConnectionError: true, // Hide connection errors in Replit
  environment: 'replit', // Specify Replit environment
};

/**
 * Initialize the 21st extension toolbar
 * Only runs in development mode to avoid production overhead
 */
export function setupStagewiseToolbar(): void {
  // Only initialize in development mode
  if (import.meta.env.DEV) {
    try {
      // Initialize the toolbar with our configuration
      initToolbar(stagewiseConfig);
      
      // Log successful initialization (only in dev)
      console.log('🚀 21st Extension Toolbar initialized successfully');
      console.log('💡 Running in Replit standalone mode - IDE connection not required');
      
    } catch (error) {
      // Gracefully handle any initialization errors
      console.warn('⚠️ Failed to initialize 21st Extension Toolbar:', error);
    }
  }
}

/**
 * Check if the toolbar is available and connected
 */
export function isToolbarConnected(): boolean {
  // Check if we're in development and toolbar is available
  return import.meta.env.DEV && typeof window !== 'undefined';
}

/**
 * Get toolbar status for debugging
 */
export function getToolbarStatus(): {
  isDev: boolean;
  isAvailable: boolean;
  config: typeof stagewiseConfig;
} {
  return {
    isDev: import.meta.env.DEV,
    isAvailable: typeof window !== 'undefined',
    config: stagewiseConfig,
  };
}
