import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App";
import "./index.css";

// Performance optimization for animations
// This ensures smoother animations by using requestAnimationFrame
if (typeof window !== 'undefined') {
  // Add a class to indicate JS is loaded, which can be used for animation triggers
  document.documentElement.classList.add('js-loaded');
  
  // Set up a helper for smooth animations
  window.requestAnimationFrame(() => {
    document.documentElement.dataset.animationsLoaded = 'true';
  });
  
  // Reduce animation jank by optimizing for 60fps
  document.addEventListener('DOMContentLoaded', () => {
    // Use passive event listeners for better scroll performance
    window.addEventListener('scroll', () => {}, { passive: true });
    
    // Only animate visible elements
    if ('IntersectionObserver' in window) {
      const animateOnScrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            animateOnScrollObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      // Target elements with animation classes
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        animateOnScrollObserver.observe(element);
      });
    }
  });
}

// Force dark theme for consistent styling
if (typeof window !== 'undefined') {
  // Add dark class to html element
  document.documentElement.classList.add('dark');
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider 
    attribute="class" 
    defaultTheme="dark" 
    enableSystem={false}
    disableTransitionOnChange 
    forcedTheme="dark" // Force dark theme, no switching allowed
  >
    <App />
  </ThemeProvider>
);
