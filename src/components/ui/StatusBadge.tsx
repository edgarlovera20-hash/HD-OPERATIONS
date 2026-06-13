type StatusType =
  | "todo"
  | "in_progress"
  | "review"
  | "done"
  | "open"
  | "resolved"
  | "closed"
  | "active"
  | "paused"
  | "cancelled";

const statusConfig: Record<
  StatusType,
  { label: string; color: string; bg: string }
> = {
  todo: { label: "Por hacer", color: "#94A3B8", bg: "rgba(148,163,184,0.12)" },
  in_progress: { label: "En progreso", color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  review: { label: "Revisión", color: "#00A3FF", bg: "rgba(0,163,255,0.12)" },
  done: { label: "Completado", color: "#10B981", bg: "rgba(16,185,129,0.12)" },
  open: { label: "Abierto", color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
  resolved: { label: "Resuelto", color: "#10B981", bg: "rgba(16,185,129,0.12)" },
  closed: { label: "Cerrado", color: "#94A3B8", bg: "rgba(148,163,184,0.12)" },
  active: { label: "Activo", color: "#10B981", bg: "rgba(16,185,129,0.12)" },
  paused: { label: "Pausado", color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  cancelled: { label: "Cancelado", color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
};

interface StatusBadgeProps {
  status: StatusType;
  size?: "sm" | "md";
}

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const config = statusConfig[status] ?? statusConfig.todo;
  const px = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${px}`}
      style={{ color: config.color, background: config.bg }}
    >
      {config.label}
    </span>
  );
}
