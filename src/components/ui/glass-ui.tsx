import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Layout Components ---

export const GlassCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-10",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const GlassContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full bg-[#1a1410] font-[Rubik,sans-serif] text-white",
        className,
      )}
    >
      {/* Background Image - Fixed */}
      <div
        className="fixed inset-0 z-0 bg-[url('/background.jpg')] bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style={{ filter: "brightness(0.7) blur(8px)" }} // Adjusted for the safari image
      />
      {/* Gradient Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-8">{children}</div>
    </div>
  );
};

// --- Form Components ---

export const GlassLabel = ({
  htmlFor,
  children,
  className,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "block text-xs font-medium text-blue-200 uppercase tracking-wider mb-1.5 ml-1",
        className,
      )}
    >
      {children}
    </label>
  );
};

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative group w-full">
        <input
          ref={ref}
          className={cn(
            "block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:bg-white/10",
            error && "border-red-500/50 focus:ring-red-500/50",
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-300 ml-1">{error}</p>}
      </div>
    );
  },
);
GlassInput.displayName = "GlassInput";

interface GlassSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  options?: { value: string | number; label: string }[];
}

export const GlassSelect = React.forwardRef<
  HTMLSelectElement,
  GlassSelectProps
>(({ className, error, children, options, ...props }, ref) => {
  return (
    <div className="relative group w-full">
      <select
        ref={ref}
        className={cn(
          "block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:bg-white/10 appearance-none",
          " [&>option]:bg-[#2a1d15] [&>option]:text-white", // Fix dropdown option visibility
          error && "border-red-500/50 focus:ring-red-500/50",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {/* Custom Arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
      {error && <p className="mt-1 text-xs text-red-300 ml-1">{error}</p>}
    </div>
  );
});
GlassSelect.displayName = "GlassSelect";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
}

export const GlassButton = React.forwardRef<
  HTMLButtonElement,
  GlassButtonProps
>(({ className, variant = "primary", isLoading, children, ...props }, ref) => {
  const variants = {
    primary: "bg-white/20 hover:bg-white/30 border-white/10 text-white",
    secondary: "bg-transparent hover:bg-white/10 border-white/20 text-blue-200",
    danger: "bg-red-500/20 hover:bg-red-500/30 border-red-500/20 text-red-100",
  };

  return (
    <button
      ref={ref}
      disabled={isLoading || props.disabled}
      className={cn(
        "flex justify-center py-3 px-6 rounded-xl shadow-lg text-sm font-semibold border backdrop-blur-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]",
        variants[variant],
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
});
GlassButton.displayName = "GlassButton";
