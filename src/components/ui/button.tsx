import * as React from "react"
import { cn } from "@/lib/utils"

// Note: I need to install class-variance-authority and @radix-ui/react-slot for full shadcn-like implementation.
// For now, I'll implement a simpler version without cva if I don't want to install more deps, 
// BUT users expect "shadcn-like", so I should probably install them or write a simpler version manually.
// To save time on installs/prompts, I will write a simpler manual variant handler for now, 
// OR just install them. Installing is better for "premium" feel maintenance.

// Actually, I'll skip CVA and Radix for this first pass to keep it zero-dep for now (except what I have),
// and just use standard props and template literals. 
// A truly premium feel comes from CSS/Animations, not necessarily the library backing it.

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    
    const variants = {
      default: "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-sm",
      destructive: "bg-red-500 text-white hover:bg-red-500/90 shadow-sm",
      outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    }

    const sizes = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
