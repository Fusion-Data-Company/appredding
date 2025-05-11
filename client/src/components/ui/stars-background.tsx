"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";

interface StarsBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
}

export function StarsBackground({
  className,
  intensity = "strong",
  children
}: StarsBackgroundProps) {
  const opacityMap = {
    subtle: 0.5,
    medium: 0.7,
    strong: 1,
  };

  const starsOpacity = opacityMap[intensity] || 1;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-black",
        className
      )}
    >
      {/* Dark background gradient with subtle fire-water color hints */}
      <div 
          className="absolute inset-0 bg-gradient-to-b from-black via-black to-black"
          style={{
              background: "radial-gradient(circle at 75% 10%, rgba(255, 69, 0, 0.1) 0%, rgba(0, 0, 0, 0) 40%), radial-gradient(circle at 25% 90%, rgba(0, 153, 255, 0.1) 0%, rgba(0, 0, 0, 0) 40%), black"
          }}
      />
      
      {/* Static stars background */}
      <div 
        className="stars absolute inset-0" 
        style={{ opacity: starsOpacity }}
      />

      {/* Multiple shooting star layers with different colors and speeds - enhanced brightness */}
      <ShootingStars
        starColor="#FF8000"
        trailColor="#FFC000"
        minSpeed={20}
        maxSpeed={45}
        minDelay={800}
        maxDelay={2200}
        starWidth={15} 
        starHeight={2}
      />
      <ShootingStars
        starColor="#00CFFF"
        trailColor="#80FFFF"
        minSpeed={15}
        maxSpeed={35}
        minDelay={1000}
        maxDelay={2500}
        starWidth={12}
        starHeight={2}
      />
      <ShootingStars
        starColor="#FF00AA"
        trailColor="#FFAAFF"
        minSpeed={25}
        maxSpeed={55}
        minDelay={1200}
        maxDelay={3000}
        starWidth={18}
        starHeight={2.5}
      />

      {children && (
        <div className="relative z-1 w-full">
          {children}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ 
        __html: `
          .stars {
            background-image: 
              radial-gradient(3px 3px at 20px 30px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 40px 70px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 50px 160px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 90px 40px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 130px 80px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 160px 120px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 200px 180px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 250px 220px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 300px 250px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 350px 190px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 400px 230px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 450px 270px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 500px 310px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 550px 350px, #FFF, rgba(0,0,0,0));
            background-repeat: repeat;
            background-size: 600px 600px;
            animation: twinkle 5s ease-in-out infinite;
          }

          @keyframes twinkle {
            0% { opacity: ${starsOpacity * 0.7}; }
            50% { opacity: ${starsOpacity}; }
            100% { opacity: ${starsOpacity * 0.7}; }
          }
        `
      }} />
    </div>
  );
}