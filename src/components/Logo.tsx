import { Activity } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const Logo = ({ size = "md", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-12 w-12",
  };

  const textClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
        <div className={`${sizeClasses[size]} relative bg-gradient-to-br from-primary to-info rounded-xl flex items-center justify-center shadow-lg`}>
          <Activity className="h-1/2 w-1/2 text-primary-foreground" strokeWidth={2.5} />
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${textClasses[size]} font-bold tracking-tight text-foreground`}>
            AI WorkTracker
          </span>
          {size === "lg" && (
            <span className="text-xs text-muted-foreground -mt-0.5">
              Team Productivity Intelligence
            </span>
          )}
        </div>
      )}
    </div>
  );
};
