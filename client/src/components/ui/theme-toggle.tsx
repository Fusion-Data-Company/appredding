import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before accessing theme to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[#1a1a1a]/50 backdrop-blur-sm">
        <i className="fas fa-circle-half-stroke text-lg text-white/70"></i>
      </div>
    );
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    // Also save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  };
  
  return (
    <button
      onClick={toggleTheme}
      className={`w-10 h-10 flex items-center justify-center rounded-md backdrop-blur-sm transition-all duration-200 ${
        theme === "dark" 
          ? "bg-white/90 hover:bg-white text-gray-800 border border-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
          : "bg-black/90 hover:bg-black text-white border border-[#ffffff20] shadow-[0_0_15px_rgba(0,0,0,0.4)]"
      }`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <i className="fas fa-sun text-lg text-[#ff8c00]"></i>
      ) : (
        <i className="fas fa-moon text-lg text-[#38b0de]"></i>
      )}
    </button>
  );
}