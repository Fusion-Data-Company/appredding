import React from "react";
import { cn } from "@/lib/utils";

interface GradientHeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  variant?: "blue" | "orange" | "green" | "mixed" | "white";
}

const gradientVariants = {
  blue: "from-blue-300 to-blue-100",
  orange: "from-orange-300 to-orange-100",
  green: "from-green-300 to-green-100",
  mixed: "from-blue-300 via-white to-orange-300",
  white: "from-white to-gray-100"
};

const GradientHeading: React.FC<GradientHeadingProps> = ({
  level = 2,
  children,
  className,
  variant = "blue"
}) => {
  const gradientClass = gradientVariants[variant];
  const baseClasses = cn(
    "font-bold bg-gradient-to-r bg-clip-text text-transparent",
    gradientClass,
    className
  );
  
  switch (level) {
    case 1:
      return <h1 className={baseClasses}>{children}</h1>;
    case 2:
      return <h2 className={baseClasses}>{children}</h2>;
    case 3:
      return <h3 className={baseClasses}>{children}</h3>;
    case 4:
      return <h4 className={baseClasses}>{children}</h4>;
    case 5:
      return <h5 className={baseClasses}>{children}</h5>;
    case 6:
      return <h6 className={baseClasses}>{children}</h6>;
    default:
      return <h2 className={baseClasses}>{children}</h2>;
  }
};

export default GradientHeading;