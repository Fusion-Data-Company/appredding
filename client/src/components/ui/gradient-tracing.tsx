import { memo, useMemo } from "react"
import { motion } from "framer-motion"

interface GradientTracingProps {
  baseColor?: string
  gradientColors?: string[]
  animationDuration?: number
  strokeWidth?: number
  className?: string
}

export const GradientTracing = memo<GradientTracingProps>(({
  baseColor = "black",
  gradientColors = ["#2EB9DF", "#2EB9DF", "#9E00FF"],
  animationDuration = 2,
  strokeWidth = 2,
  className = ""
}) => {
  const gradientId = useMemo(() => `pulse-${Math.random().toString(36).substr(2, 9)}`, [])

  return (
    <svg
      className={`w-full h-full ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M0,25 Q25,15 50,25 T100,25 M0,50 Q25,60 50,50 T100,50 M0,75 Q25,85 50,75 T100,75"
        stroke={baseColor}
        strokeOpacity="0.2"
        strokeWidth={strokeWidth * 0.05}
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M0,25 Q25,15 50,25 T100,25 M0,50 Q25,60 50,50 T100,50 M0,75 Q25,85 50,75 T100,75"
        stroke={`url(#${gradientId})`}
        strokeLinecap="round"
        strokeWidth={strokeWidth * 0.05}
        vectorEffect="non-scaling-stroke"
      />
      <defs>
        <motion.linearGradient
          animate={{
            x1: ["0%", "200%"],
            x2: ["0%", "100%"],
          }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: "linear",
          }}
          id={gradientId}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={gradientColors[0]} stopOpacity="0" />
          <stop stopColor={gradientColors[1]} />
          <stop offset="1" stopColor={gradientColors[2]} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  )
})

GradientTracing.displayName = "GradientTracing"
