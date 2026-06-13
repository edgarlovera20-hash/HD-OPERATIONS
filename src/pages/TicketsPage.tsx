import { PageHeader } from "../components/ui/PageHeader";
import { TicketCard } from "../components/ui/TicketCard";
import { Plus } from "lucide-react";

type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
type TicketPriority = "critical" | "high" | "medium" | "low";

interface Ticket {
  id: string;
  title: string;
  priority: TicketPriority;
  status: TicketStatus;
  category: string;
  assignee: string;
  createdAt: string;
  sla?: string;
}

const TICKETS: Ticket[] = [
  { id: "1089", title: "Sistema de nómina no procesa incidencias del mes", priority: "critical", status: "in_progress", category: "Sistema", assignee: "C.Méndez", createdAt: "Jun 13, 09:15", sla: "4h" },
  { id: "1088", title: "Error al exportar reporte mensual de KPIs", priority: "high", status: "open", category: "Reportes", assignee: "Sin asignar", createdAt: "Jun 13, 08:45", sla: "8h" },
  { id: "1087", title: "Acceso denegado a módulo de aprobaciones", priority: "high", status: "in_progress", category: "Permisos", assignee: "R.Silva", createdAt: "Jun 12, 16:20" },
  { id: "1086", title: "Discrepancia en inventario de oficina sur", priority: "medium", status: "open", category: "Inventario", assignee: "D.Ruiz", createdAt: "Jun 12, 14:00" },
  { id: "1085", title: "Formulario de solicitudes no envía notificaciones", priority: "medium", status: "in_progress", category: "Sistema", assignee: "C.Méndez", createdAt: "Jun 12, 11:30" },
  { id: "1084", title: "Solicitud de acceso VPN para equipo remoto", priority: "low", status: "resolved", category: "Infraestructura", assignee: "P.López", createdAt: "Jun 11, 10:00" },
  { id: "1083", title: "Actualización de licencias de software", priority: "low", status: "resolved", category: "Licencias", assignee: "R.Silva", createdAt: "Jun 10, 13:00" },
  { id: "1082", title: "Configuración de cuentas de correo nuevas", priority: "medium", status: "closed", category: "Email", assignee: "P.López", createdAt: "Jun 9, 09:00" },
];

const STATS = [
  { label: "Abiertos", count: (t: Ticket[]) => t.filter(x => x.status === "open").length, color: "#EF4444" },
  { label: "En Progreso", count: (t: Ticket[]) => t.filter(x => x.status === "in_progress").length, color: "#F59E0B" },
  { label: "Resueltos", count: (t: Ticket[]) => t.filter(x => x.status === "resolved").length, color: "#10B981" },
  { label: "Críticos", count: (t: Ticket[]) => t.filter(x => x.priority === "critical").length, color: "#EF4444" },
];

export default function TicketsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestión de Tickets"
        description="Control de incidencias y solicitudes del equipo"
        actions={
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#0066FF,#00A3FF)" }}>
            <Plus className="w-4 h-4" />
            Nuevo Ticket
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(s => (
          <div key={s.label} className="bg-[#161F33] border border-white/[0.08] rounded-[14px] p-4 text-center">
            <p className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.count(TICKETS)}</p>
            <p className="text-[#9CA3AF] text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Ticket cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {TICKETS.map(ticket => (
          <TicketCard
            key={ticket.id}
            id={ticket.id}
            title={ticket.title}
            priority={ticket.priority}
            status={ticket.status}
            category={ticket.category}
            assignee={ticket.assignee}
            createdAt={ticket.createdAt}
            sla={ticket.sla}
          />
        ))}
      </div>
    </div>
  );
}
