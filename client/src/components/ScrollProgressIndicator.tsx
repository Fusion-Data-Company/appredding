import { useScrollProgress } from '@/hooks/useScrollReveal';

export const ScrollProgressIndicator = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div className="scroll-indicator">
      <div 
        className="h-full bg-gradient-to-r from-orange-500 to-blue-500 transition-all duration-300 ease-out"
        style={{ 
          width: `${scrollProgress}%`,
          boxShadow: '0 0 10px rgba(249, 115, 22, 0.5)'
        }}
      />
    </div>
  );
};

export const FloatingScrollProgress = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative w-16 h-16">
        <svg 
          className="w-16 h-16 transform -rotate-90" 
          viewBox="0 0 36 36"
        >
          <path
            d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
            fill="none"
            stroke="rgba(249, 115, 22, 0.2)"
            strokeWidth="2"
          />
          <path
            d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="2"
            strokeDasharray={`${scrollProgress}, 100`}
            className="transition-all duration-300 ease-out"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white">
            {Math.round(scrollProgress)}%
          </span>
        </div>
      </div>
    </div>
  );
};