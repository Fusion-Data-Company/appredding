import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ChevronDown } from "lucide-react";

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
            <div className="relative py-4 p-3 overflow-hidden h-14 w-10">
                <div className="h-8 w-8 mx-auto rounded-full bg-gray-300 opacity-70"></div>
                <div className="flex justify-center mt-1">
                    <div className="h-3 w-8 rounded-md bg-gray-300 opacity-70"></div>
                </div>
            </div>
        );
    }

    return (
      <div className="relative py-4 p-3 overflow-hidden h-14 w-10">
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
          className="relative bottom-0 w-8 h-8 mx-auto rounded-full
               bg-[radial-gradient(circle_at_center,_#facc15,_#fcd34d,_#fef9c3)] 
               dark:bg-[radial-gradient(circle_at_center,_#4b5563,_#1f2937,_#000)] 
               shadow-[0_0_20px_8px_rgba(250,204,21,0.5)] 
               dark:shadow-[0_0_20px_6px_rgba(31,41,55,0.7)]
               border-2 dark:border-gray-800 border-white
               cursor-pointer"
        >
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-[9999px] 
                bg-black dark:bg-white opacity-40 dark:opacity-30"></div>
        </motion.div>
        
        {/* Pull Text - centered at bottom */}
        <div className="flex items-center justify-center gap-1 text-[10px] font-medium mt-1 pl-3">
          <span className="text-black dark:text-white">PULL</span>
          <ChevronDown size={10} className="text-black dark:text-white animate-bounce" />
        </div>
      </div>
    );
}