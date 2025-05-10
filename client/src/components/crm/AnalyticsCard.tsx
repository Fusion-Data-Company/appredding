import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  description: string;
  value: number | string;
  subValue?: string;
  icon: LucideIcon;
  iconColor: string;
  isGlowing?: boolean;
  glowColor?: string;
  animationDelay?: string;
  isLoading?: boolean;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  description,
  value,
  subValue,
  icon: Icon,
  iconColor,
  isGlowing = false,
  glowColor,
  animationDelay,
  isLoading = false
}) => {
  const cardClass = isGlowing
    ? `card-premium card-glow-${glowColor} transition-all duration-300 animate-fade-in-up`
    : 'card-premium transition-all duration-300 animate-fade-in-up';

  const style = animationDelay ? { animationDelay } : {};
  
  return (
    <Card className={cardClass} style={style}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Icon className={`h-5 w-5 ${iconColor} ${isGlowing ? (glowColor === 'orange' ? 'animate-glow-pulse-orange' : 'animate-glow-pulse') : ''}`} />
          {title}
        </CardTitle>
        <CardDescription className="text-gray-300">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-8 w-16 bg-gray-700 rounded-md"></div>
            <div className="h-4 w-24 bg-gray-700 rounded-md mt-2"></div>
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold text-white">{value}</div>
            {subValue && <p className={`text-xs ${glowColor ? `text-${glowColor}-300/80` : 'text-gray-400'} mt-1`}>{subValue}</p>}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;