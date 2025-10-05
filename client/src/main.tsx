import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App";
import "./index.css";

// Production mode optimization
const isProduction = import.meta.env.PROD;

// Basic performance optimizations
if (typeof window !== 'undefined') {
  // Removed forced dark mode - let ThemeProvider handle it
  // document.documentElement.classList.add('dark');

  // Remove loading state
  setTimeout(() => {
    document.getElementById('root')?.classList.remove('loading');
  }, 50);
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
