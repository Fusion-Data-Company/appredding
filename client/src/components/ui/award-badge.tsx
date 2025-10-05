import { MouseEvent, useEffect, useRef, useState } from "react";
import { Shield } from "lucide-react";

type AwardBadgeType = "customer-service-excellence" | "golden-kitty" | "product-of-the-day" | "product-of-the-month" | "product-of-the-week";

interface AwardBadgeProps {
  type: AwardBadgeType;
  place?: number;
  link?: string;
}

export const AwardBadge = ({ type, place, link }: AwardBadgeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (type === "customer-service-excellence") {
    return (
      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-testid="award-badge"
      >
        <div className={`
          bg-gradient-to-br from-slate-800 via-slate-900 to-black
          border-2 border-amber-400/60
          rounded-2xl px-6 py-4
          shadow-2xl shadow-amber-900/30
          transition-all duration-300
          ${isHovered ? 'scale-105 shadow-amber-500/40 border-amber-300' : ''}
        `}>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full"></div>
              <Shield className="w-12 h-12 text-amber-400 relative z-10 drop-shadow-lg" strokeWidth={2.5} />
            </div>
            
            <div className="flex flex-col">
              <span className="text-amber-400 text-xs font-bold tracking-wider uppercase mb-1">
                Certified Excellence
              </span>
              <span className="text-white text-xl font-black tracking-tight leading-tight">
                5-Star Service
              </span>
              <span className="text-slate-400 text-xs font-semibold mt-0.5">
                Advance Power Redding
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original Product Hunt style for other types
  return (
    <a
      href={link || "#"}
      target={link ? "_blank" : undefined}
      rel={link ? "noopener noreferrer" : undefined}
      className="block w-[180px] sm:w-[260px] h-auto cursor-pointer"
      data-testid="award-badge"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 54" className="w-[180px] sm:w-[260px] h-auto">
        <rect width="260" height="54" rx="10" fill="#f3e3ac" />
        <rect x="4" y="4" width="252" height="46" rx="8" fill="transparent" stroke="#bbb" strokeWidth="1" />
        <text fontFamily="Helvetica-Bold, Helvetica" fontSize="9" fontWeight="bold" fill="#666" x="53" y="20">
          PRODUCT HUNT
        </text>
        <text fontFamily="Helvetica-Bold, Helvetica" fontSize="16" fontWeight="bold" fill="#666" x="52" y="40">
          Product Award
        </text>
      </svg>
    </a>
  );
};
