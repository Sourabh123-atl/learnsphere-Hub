import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
}

const StatCard = ({ icon: Icon, label, value, trend, trendUp }: StatCardProps) => (
  <div className="bg-card rounded-xl p-5 border border-border card-hover">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl font-display font-bold text-card-foreground">{value}</p>
        {trend && (
          <p className={`text-xs mt-1 font-medium ${trendUp ? "text-success" : "text-destructive"}`}>
            {trendUp ? "↑" : "↓"} {trend}
          </p>
        )}
      </div>
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
    </div>
  </div>
);

export default StatCard;
