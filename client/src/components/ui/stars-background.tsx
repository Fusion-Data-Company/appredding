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

      {/* Multiple shooting star layers with different colors and speeds - ULTRA BRIGHT */}
      <ShootingStars
        starColor="#FFFFFF" 
        trailColor="#FFDD00"
        minSpeed={25}
        maxSpeed={50}
        minDelay={500}
        maxDelay={1800}
        starWidth={25} 
        starHeight={3}
      />
      <ShootingStars
        starColor="#FFFFFF"
        trailColor="#00FFFF"
        minSpeed={20}
        maxSpeed={45}
        minDelay={700}
        maxDelay={2000}
        starWidth={20}
        starHeight={2.5}
      />
      <ShootingStars
        starColor="#FFFFFF"
        trailColor="#FF20FF"
        minSpeed={30}
        maxSpeed={60}
        minDelay={900}
        maxDelay={2200}
        starWidth={28}
        starHeight={3.5}
      />
      {/* Additional shooting stars for more density */}
      <ShootingStars
        starColor="#FFFFFF"
        trailColor="#FF5000"
        minSpeed={35}
        maxSpeed={65}
        minDelay={600}
        maxDelay={1500}
        starWidth={22}
        starHeight={3}
      />
      <ShootingStars
        starColor="#FFFFFF" 
        trailColor="#00FF80"
        minSpeed={22}
        maxSpeed={48}
        minDelay={800}
        maxDelay={1600}
        starWidth={24}
        starHeight={3.2}
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
              /* Bright larger stars */
              radial-gradient(4px 4px at 20px 30px, #FFF, rgba(0,0,0,0)),
              radial-gradient(4px 4px at 40px 70px, #FFF, rgba(0,0,0,0)),
              radial-gradient(4px 4px at 50px 160px, #FFF, rgba(0,0,0,0)),
              radial-gradient(4px 4px at 90px 40px, #FFF, rgba(0,0,0,0)),
              radial-gradient(4px 4px at 130px 80px, #FFF, rgba(0,0,0,0)),
              radial-gradient(4px 4px at 160px 120px, #FFF, rgba(0,0,0,0)),
              radial-gradient(4px 4px at 200px 180px, #FFF, rgba(0,0,0,0)),
              radial-gradient(5px 5px at 250px 220px, #FFF, rgba(0,0,0,0)),
              radial-gradient(5px 5px at 300px 250px, #FFF, rgba(0,0,0,0)),
              radial-gradient(5px 5px at 350px 190px, #FFF, rgba(0,0,0,0)),
              radial-gradient(4px 4px at 400px 230px, #FFF, rgba(0,0,0,0)),
              radial-gradient(4px 4px at 450px 270px, #FFF, rgba(0,0,0,0)),
              radial-gradient(4px 4px at 500px 310px, #FFF, rgba(0,0,0,0)),
              radial-gradient(5px 5px at 550px 350px, #FFF, rgba(0,0,0,0)),
              /* Additional stars for more density */
              radial-gradient(3px 3px at 100px 50px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 150px 100px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 220px 150px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 280px 210px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 330px 280px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 380px 240px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 430px 290px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 480px 330px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 530px 370px, #FFF, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 580px 290px, #FFF, rgba(0,0,0,0)),
              /* Extra-bright stars with glow */
              radial-gradient(6px 6px at 120px 120px, rgba(255, 255, 255, 1), rgba(0,0,0,0)),
              radial-gradient(6px 6px at 270px 180px, rgba(255, 255, 255, 1), rgba(0,0,0,0)),
              radial-gradient(6px 6px at 350px 320px, rgba(255, 255, 255, 1), rgba(0,0,0,0)),
              radial-gradient(6px 6px at 420px 150px, rgba(255, 255, 255, 1), rgba(0,0,0,0)),
              radial-gradient(6px 6px at 520px 250px, rgba(255, 255, 255, 1), rgba(0,0,0,0));
            background-repeat: repeat;
            background-size: 600px 600px;
            animation: twinkle 4s ease-in-out infinite;
            filter: drop-shadow(0 0 4px rgba(255,255,255,0.8));
          }

          @keyframes twinkle {
            0% { opacity: ${starsOpacity * 0.75}; filter: brightness(0.9); }
            25% { opacity: ${starsOpacity}; filter: brightness(1.2); }
            50% { opacity: ${starsOpacity * 0.85}; filter: brightness(1); }
            75% { opacity: ${starsOpacity}; filter: brightness(1.3); }
            100% { opacity: ${starsOpacity * 0.75}; filter: brightness(0.9); }
          }
        `
      }} />
    </div>
  );
}