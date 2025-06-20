import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App";
import "./index.css";

// Basic performance optimizations
if (typeof window !== 'undefined') {
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
