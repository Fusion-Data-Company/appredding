import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4 p-6 rounded-lg border bg-card", className)} data-testid="skeleton-card">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  )
}

function TextSkeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)} data-testid="skeleton-text">
      {[...Array(lines)].map((_, i) => (
        <Skeleton 
          key={i} 
          className={cn(
            "h-4",
            i === lines - 1 ? "w-3/4" : "w-full"
          )} 
        />
      ))}
    </div>
  )
}

function ImageSkeleton({ aspectRatio = "video", className }: { aspectRatio?: "video" | "square" | "portrait"; className?: string }) {
  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]"
  }
  
  return (
    <Skeleton 
      className={cn(aspectClasses[aspectRatio], "w-full", className)} 
      data-testid="skeleton-image"
    />
  )
}

function HeroSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full py-20 bg-background", className)} data-testid="skeleton-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Skeleton className="h-16 w-3/4 mx-auto" />
          <Skeleton className="h-8 w-2/3 mx-auto" />
          <Skeleton className="h-12 w-40 mx-auto rounded-full" />
        </div>
      </div>
    </div>
  )
}

function StatsSkeleton({ count = 3, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6", className)} data-testid="skeleton-stats">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="text-center space-y-2">
          <Skeleton className="h-12 w-24 mx-auto" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      ))}
    </div>
  )
}

function TableSkeleton({ rows = 5, columns = 4, className }: { rows?: number; columns?: number; className?: string }) {
  return (
    <div className={cn("space-y-3", className)} data-testid="skeleton-table">
      <div className="flex gap-4 pb-4 border-b">
        {[...Array(columns)].map((_, i) => (
          <Skeleton key={i} className="h-6 flex-1" />
        ))}
      </div>
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {[...Array(columns)].map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-8 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

function FormSkeleton({ fields = 4, className }: { fields?: number; className?: string }) {
  return (
    <div className={cn("space-y-4", className)} data-testid="skeleton-form">
      {[...Array(fields)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <Skeleton className="h-10 w-32 mt-6" />
    </div>
  )
}

export { 
  Skeleton,
  CardSkeleton,
  TextSkeleton,
  ImageSkeleton,
  HeroSkeleton,
  StatsSkeleton,
  TableSkeleton,
  FormSkeleton
}
