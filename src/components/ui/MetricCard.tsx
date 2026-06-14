import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  downIsGood?: boolean;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  iconColor?: string;
  iconBg?: string;
}

export function MetricCard({
  title,
  value,
  change,
  trend,
  downIsGood = false,
  icon: Icon,
  iconColor = "#0066FF",
  iconBg = "rgba(0,102,255,0.12)",
}: MetricCardProps) {
  const isPositive = trend === "up" ? !downIsGood : downIsGood;
  const trendColor =
    trend === "neutral"
      ? "#94A3B8"
      : isPositive
      ? "#10B981"
      : "#EF4444";

  const TrendIcon =
    trend === "neutral" ? Minus : trend === "up" ? TrendingUp : TrendingDown;

  return (
    <div className="bg-[#161F33] border border-white/[0.08] rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-6">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-[12px] flex items-center justify-center flex-shrink-0"
          style={{ background: iconBg }}
        >
          <Icon className="w-5 h-5" style={{ color: iconColor }} />
        </div>
        <div
          className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
          style={{
            color: trendColor,
            background: `${trendColor}18`,
          }}
        >
          <TrendIcon className="w-3 h-3" />
          <span>{change}</span>
        </div>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-[#94A3B8] text-sm">{title}</p>
    </div>
  );
}
