import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"

export const gradientButtonVariants = cva(
  "gradient-button rounded-md inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        variant: "gradient-button-variant",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-3 py-2 text-xs",
        lg: "h-14 px-8 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gradientButtonVariants> {
  asChild?: boolean
  href?: string
}

export const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant, size, asChild = false, href, ...props }, ref) => {
    const Comp = asChild ? Slot : href ? "a" : "button"
    
    // Strip out button-specific props if using an anchor
    if (href) {
      const { type, ...rest } = props;
      return (
        <Comp
          className={cn(gradientButtonVariants({ variant, size, className }))}
          ref={ref as any}
          href={href}
          {...rest}
        />
      );
    }
    
    return (
      <Comp
        className={cn(gradientButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
)

GradientButton.displayName = "GradientButton"