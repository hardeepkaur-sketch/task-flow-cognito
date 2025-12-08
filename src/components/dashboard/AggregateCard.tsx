import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AggregateCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    label: string;
  };
  icon: React.ReactNode;
  color: "primary" | "success" | "warning" | "destructive" | "info";
  onClick?: () => void;
}

const colorClasses = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    icon: "text-primary",
  },
  success: {
    bg: "bg-success/10",
    text: "text-success",
    icon: "text-success",
  },
  warning: {
    bg: "bg-warning/10",
    text: "text-warning",
    icon: "text-warning",
  },
  destructive: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    icon: "text-destructive",
  },
  info: {
    bg: "bg-info/10",
    text: "text-info",
    icon: "text-info",
  },
};

export const AggregateCard = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  color,
  onClick,
}: AggregateCardProps) => {
  const colors = colorClasses[color];
  const isPositive = trend ? trend.value > 0 : null;
  const isNeutral = trend ? trend.value === 0 : null;

  return (
    <Card
      variant="interactive"
      className={cn(
        "group cursor-pointer overflow-hidden",
        onClick && "hover:border-primary/30"
      )}
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="space-y-1">
              <p className="text-3xl font-bold tracking-tight">{value}</p>
              {subtitle && (
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {trend && (
              <div
                className={cn(
                  "inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                  isPositive && "bg-success/10 text-success",
                  isNeutral && "bg-muted text-muted-foreground",
                  !isPositive && !isNeutral && "bg-destructive/10 text-destructive"
                )}
              >
                {isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : isNeutral ? (
                  <Minus className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>
                  {isPositive && "+"}
                  {trend.value}% {trend.label}
                </span>
              </div>
            )}
          </div>
          <div
            className={cn(
              "h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
              colors.bg
            )}
          >
            <div className={colors.icon}>{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
