import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const customBadgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-0.5 text-sm font-medium text-white transition-all duration-500 hover:scale-105 z-[100] relative",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-orange-700 to-blue-700 shadow-[0_0_25px_rgba(249,115,22,0.5)] border-orange-500/40",
        secondary:
          "bg-gradient-to-r from-blue-700 to-orange-700 shadow-[0_0_25px_rgba(59,130,246,0.5)] border-blue-500/40",
        outline: 
          "bg-transparent border-orange-500/40 text-orange-500",
      },
      size: {
        default: "px-3 py-0.5 text-sm",
        sm: "px-2.5 py-0.5 text-xs",
        lg: "px-4 py-1 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface CustomBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof customBadgeVariants> {}

function CustomBadge({ className, variant, size, ...props }: CustomBadgeProps) {
  return (
    <div className={cn(customBadgeVariants({ variant, size }), className)} {...props} />
  )
}

export { CustomBadge, customBadgeVariants }