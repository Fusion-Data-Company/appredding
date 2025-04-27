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
    };

    if (!mounted) {
        return (
            <div className="relative py-1 px-2 overflow-hidden mt-3 mb-2 h-24 w-36 mx-auto">
                {/* Placeholder for Sun icon */}
                <div className="absolute left-0 top-7 -translate-x-full pr-2">
                    <div className="h-5 w-5 rounded-full bg-gray-300 opacity-70"></div>
                </div>
                
                {/* Placeholder for ball */}
                <div className="h-12 w-12 mx-auto rounded-full bg-gray-300 opacity-70 mt-6"></div>
                
                {/* Placeholder for Moon icon */}
                <div className="absolute right-0 top-7 translate-x-full pl-2">
                    <div className="h-5 w-5 rounded-full bg-gray-300 opacity-70"></div>
                </div>
                
                {/* Placeholder for Pull text */}
                <div className="flex justify-center absolute bottom-1 left-0 right-0">
                    <div className="h-5 w-14 rounded-md bg-gray-300 opacity-70"></div>
                </div>
            </div>
        );
    }

    return (
      <div className="relative py-1 px-2 overflow-hidden mt-3 mb-2 h-24 w-36 mx-auto">
        {/* Sun icon on left outside */}
        <div className="absolute left-0 top-7 -translate-x-full pr-2">
          <Sun size={20} className="text-yellow-500 dark:text-yellow-400" />
        </div>
        
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
          className="relative bottom-0 w-12 h-12 mx-auto rounded-full mt-6
               bg-[radial-gradient(circle_at_center,_#facc15,_#fcd34d,_#fef9c3)] 
               dark:bg-[radial-gradient(circle_at_center,_#4b5563,_#1f2937,_#000)] 
               shadow-[0_0_20px_8px_rgba(250,204,21,0.5)] 
               dark:shadow-[0_0_20px_6px_rgba(31,41,55,0.7)]
               border-2 dark:border-gray-800 border-white
               cursor-pointer"
        >
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-0.5 h-[9999px] 
                bg-black dark:bg-white opacity-40 dark:opacity-30"></div>
        </motion.div>
        
        {/* Moon icon on right outside */}
        <div className="absolute right-0 top-7 translate-x-full pl-2">
          <Moon size={20} className="text-blue-600 dark:text-blue-400" />
        </div>
        
        {/* Pull Text - centered at bottom */}
        <div className="flex items-center justify-center gap-1 text-sm font-medium absolute bottom-1 left-0 right-0">
          <span className="text-black dark:text-white">PULL</span>
          <ChevronDown size={16} className="ml-0.5 text-black dark:text-white animate-bounce" />
        </div>
      </div>
    );
}