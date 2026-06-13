import { Clock, User, Tag } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

type TicketPriority = "high" | "medium" | "low" | "critical";
type TicketStatus = "open" | "in_progress" | "resolved" | "closed";

interface TicketCardProps {
  id: string;
  title: string;
  priority: TicketPriority;
  status: TicketStatus;
  category: string;
  assignee: string;
  createdAt: string;
  sla?: string;
}

const priorityConfig: Record<TicketPriority, { label: string; color: string; bg: string }> = {
  critical: { label: "Crítico", color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
  high: { label: "Alta", color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  medium: { label: "Media", color: "#00A3FF", bg: "rgba(0,163,255,0.12)" },
  low: { label: "Baja", color: "#10B981", bg: "rgba(16,185,129,0.12)" },
};

export function TicketCard({
  id, title, priority, status, category, assignee, createdAt, sla,
}: TicketCardProps) {
  const pConf = priorityConfig[priority];

  return (
    <div className="bg-[#161F33] border border-white/[0.08] rounded-[16px] p-4 hover:border-[#0066FF]/40 transition-all cursor-pointer">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-[#94A3B8] font-mono bg-white/[0.05] px-1.5 py-0.5 rounded">#{id}</span>
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{ color: pConf.color, background: pConf.bg }}
            >
              {pConf.label}
            </span>
          </div>
          <p className="text-white text-sm font-medium leading-snug truncate">{title}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[10px] text-[#94A3B8]">
            <Tag className="w-3 h-3" />
            {category}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-[#94A3B8]">
            <User className="w-3 h-3" />
            {assignee}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[10px] text-[#94A3B8]">
            <Clock className="w-3 h-3" />
            {createdAt}
          </span>
          {sla && (
            <span className="text-[10px] text-[#F59E0B] font-medium">SLA: {sla}</span>
          )}
        </div>
      </div>
    </div>
  );
}
