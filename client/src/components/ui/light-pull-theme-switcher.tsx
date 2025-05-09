import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, ChevronDown } from "lucide-react";

export function LightPullThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Ensure component is mounted before accessing theme to avoid hydration issues
    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        
        // Also save to localStorage for persistence
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme);
        }
    };

    if (!mounted) {
        return (
            <div className="relative py-1 px-2 overflow-hidden mt-3 mb-2 h-24">
                <div className="h-7 w-7 mx-auto rounded-full bg-gray-300 opacity-70 mt-8"></div>
                <div className="flex justify-center absolute bottom-2 left-0 right-0">
                    <div className="h-4 w-8 rounded-md bg-gray-300 opacity-70"></div>
                </div>
            </div>
        );
    }

    return (
      <div className="relative py-1 px-2 overflow-hidden mt-3 mb-2 h-24">
        <motion.div
          drag="y"
          dragDirectionLock
          onDragEnd={(event, info) => {
            if (info.offset.y > 0) {
              toggleTheme();
            }
          }}
          dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
          dragElastic={0.075}
          whileDrag={{ cursor: "grabbing" }}
          className="relative bottom-0 w-7 h-7 mx-auto rounded-full mt-8
               bg-[radial-gradient(circle_at_center,_#facc15,_#fcd34d,_#fef9c3)] 
               dark:bg-[radial-gradient(circle_at_center,_#4b5563,_#1f2937,_#000)] 
               shadow-[0_0_15px_6px_rgba(250,204,21,0.5)] 
               dark:shadow-[0_0_15px_4px_rgba(31,41,55,0.7)]
               border-2 dark:border-gray-800 border-white
               cursor-pointer"
        >
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-0.5 h-[9999px] 
                bg-black dark:bg-white opacity-40 dark:opacity-30"></div>
        </motion.div>
        
        {/* Text positioned in center of component */}
        <div className="flex justify-center mt-1 text-xs font-medium absolute bottom-2 left-0 right-0">
          <span className="text-black dark:text-white text-center">PULL</span>
        </div>
      </div>
    );
}