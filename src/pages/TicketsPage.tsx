import { useState } from "react";
import { Plus, AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { TicketCard } from "../components/ui/TicketCard";

type TicketPriority = "high" | "medium" | "low" | "critical";
type TicketStatus = "open" | "in_progress" | "resolved" | "closed";

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

const tickets: Ticket[] = [
  { id: "TKT-089", title: "Error en módulo de facturación — no genera XML", priority: "critical", status: "open", category: "Finanzas", assignee: "Miguel Torres", createdAt: "Hoy 09:14", sla: "2h restantes" },
  { id: "TKT-088", title: "Acceso denegado al sistema CRM para equipo de ventas", priority: "high", status: "in_progress", category: "Accesos", assignee: "Ana López", createdAt: "Hoy 08:30", sla: "4h restantes" },
  { id: "TKT-087", title: "Falla en envío de correos automáticos de bienvenida", priority: "medium", status: "in_progress", category: "Correo", assignee: "Carlos Ruiz", createdAt: "Ayer 17:45" },
  { id: "TKT-086", title: "Reporte de nómina no generado automáticamente", priority: "high", status: "resolved", category: "Nómina", assignee: "Sofia Mendez", createdAt: "Ayer 14:20" },
  { id: "TKT-085", title: "Lentitud extrema en portal de autoservicio de clientes", priority: "medium", status: "resolved", category: "Rendimiento", assignee: "Ricardo García", createdAt: "Ayer 11:00" },
  { id: "TKT-084", title: "Integración de WhatsApp no envía mensajes de seguimiento", priority: "high", status: "open", category: "Integraciones", assignee: "Miguel Torres", createdAt: "Ayer 09:30", sla: "Expirado" },
  { id: "TKT-083", title: "Error al exportar reportes en formato Excel", priority: "low", status: "open", category: "Reportes", assignee: "Paola Sánchez", createdAt: "11 Jun" },
  { id: "TKT-082", title: "Duplicación de registros en base de datos de candidatos", priority: "high", status: "in_progress", category: "Base de Datos", assignee: "Miguel Torres", createdAt: "11 Jun" },
  { id: "TKT-081", title: "Campo de RFC no valida correctamente el formato", priority: "medium", status: "resolved", category: "Validaciones", assignee: "Carlos Ruiz", createdAt: "10 Jun" },
  { id: "TKT-080", title: "Contraseña de usuario no puede ser restablecida", priority: "medium", status: "open", category: "Accesos", assignee: "Ana López", createdAt: "10 Jun", sla: "En tiempo" },
  { id: "TKT-079", title: "Impresión de recibos de pago con formato incorrecto", priority: "low", status: "closed", category: "Finanzas", assignee: "Sofia Mendez", createdAt: "09 Jun" },
  { id: "TKT-078", title: "Notificaciones push no llegan en dispositivos iOS", priority: "medium", status: "closed", category: "Notificaciones", assignee: "Ricardo García", createdAt: "08 Jun" },
  { id: "TKT-077", title: "Sesión expira antes del tiempo configurado", priority: "medium", status: "resolved", category: "Seguridad", assignee: "Carlos Ruiz", createdAt: "08 Jun" },
  { id: "TKT-076", title: "Filtros de búsqueda no funcionan en módulo de reportes", priority: "low", status: "closed", category: "Reportes", assignee: "Paola Sánchez", createdAt: "07 Jun" },
  { id: "TKT-075", title: "Carga de archivos adjuntos falla para PDF mayores a 10MB", priority: "medium", status: "resolved", category: "Archivos", assignee: "Miguel Torres", createdAt: "07 Jun" },
];

const summaryStats = [
  { label: "Abiertos", value: "12", icon: AlertCircle, color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
  { label: "En Proceso", value: "7", icon: Clock, color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  { label: "Resueltos Hoy", value: "5", icon: CheckCircle, color: "#10B981", bg: "rgba(16,185,129,0.12)" },
  { label: "Tiempo Prom.", value: "4.2h", icon: XCircle, color: "#00A3FF", bg: "rgba(0,163,255,0.12)" },
];

const statusFilters: Array<{ label: string; value: TicketStatus | "all" }> = [
  { label: "Todos", value: "all" },
  { label: "Abiertos", value: "open" },
  { label: "En Proceso", value: "in_progress" },
  { label: "Resueltos", value: "resolved" },
  { label: "Cerrados", value: "closed" },
];

export default function TicketsPage() {
  const [activeFilter, setActiveFilter] = useState<TicketStatus | "all">("all");

  const filteredTickets =
    activeFilter === "all"
      ? tickets
      : tickets.filter((t) => t.status === activeFilter);

  return (
    <div>
      <PageHeader
        title="Centro de Soporte"
        description="Gestión de tickets e incidencias operativas"
        actions={
          <button className="flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-medium px-4 py-2.5 rounded-[14px] transition-colors">
            <Plus className="w-4 h-4" />
            Nuevo Ticket
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summaryStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#161F33] border border-white/[0.08] rounded-[16px] p-4 flex items-center gap-3"
          >
            <div
              className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
              style={{ background: stat.bg }}
            >
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <div>
              <p className="text-white text-xl font-bold">{stat.value}</p>
              <p className="text-[#94A3B8] text-xs">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-4 py-2 rounded-[10px] text-sm font-medium transition-all ${
              activeFilter === f.value
                ? "bg-[#0066FF] text-white"
                : "bg-[#161F33] text-[#94A3B8] hover:text-white border border-white/[0.08]"
            }`}
          >
            {f.label}
            {f.value !== "all" && (
              <span className="ml-1.5 opacity-70">
                ({tickets.filter((t) => t.status === f.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tickets List */}
      <div className="space-y-3">
        {filteredTickets.map((ticket) => (
          <TicketCard key={ticket.id} {...ticket} />
        ))}
        {filteredTickets.length === 0 && (
          <div className="text-center text-[#94A3B8] py-16 text-sm">
            No hay tickets con este filtro.
          </div>
        )}
      </div>
    </div>
  );
}
