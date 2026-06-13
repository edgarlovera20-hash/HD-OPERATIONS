import { Calendar, User, Tag } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

type Priority = "high" | "medium" | "low";
type TaskStatus = "todo" | "in_progress" | "review" | "done";

interface TaskCardProps {
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  assignee: string;
  dueDate: string;
  project: string;
}

const priorityConfig: Record<Priority, { label: string; color: string; dot: string }> = {
  high: { label: "Alta", color: "text-[#EF4444]", dot: "bg-[#EF4444]" },
  medium: { label: "Media", color: "text-[#F59E0B]", dot: "bg-[#F59E0B]" },
  low: { label: "Baja", color: "text-[#10B981]", dot: "bg-[#10B981]" },
};

export function TaskCard({
  title,
  description,
  priority,
  status,
  assignee,
  dueDate,
  project,
}: TaskCardProps) {
  const pConf = priorityConfig[priority];

  return (
    <div className="bg-[#161F33] border border-white/[0.08] rounded-[16px] p-4 hover:border-[#0066FF]/40 hover:shadow-[0_4px_20px_rgba(0,102,255,0.1)] transition-all cursor-pointer group">
      {/* Priority indicator */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-0.5 ${pConf.dot}`} />
          <p className="text-white text-sm font-medium leading-snug group-hover:text-[#38BDF8] transition-colors">
            {title}
          </p>
        </div>
        <StatusBadge status={status} />
      </div>

      {description && (
        <p className="text-[#94A3B8] text-xs mb-3 ml-4 line-clamp-2">{description}</p>
      )}

      <div className="flex items-center justify-between mt-3 ml-4 gap-2 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[10px] text-[#94A3B8]">
            <Tag className="w-3 h-3" />
            {project}
          </span>
          <span className={`text-[10px] font-medium ${pConf.color}`}>{pConf.label}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[10px] text-[#94A3B8]">
            <User className="w-3 h-3" />
            {assignee}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-[#94A3B8]">
            <Calendar className="w-3 h-3" />
            {dueDate}
          </span>
        </div>
      </div>
    </div>
  );
}
