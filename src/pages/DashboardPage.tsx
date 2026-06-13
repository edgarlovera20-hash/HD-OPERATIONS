import {
  CheckSquare, Clock, AlertCircle, Briefcase, TrendingUp, Timer,
  Plus, Eye,
} from "lucide-react";
import { MetricCard } from "../components/ui/MetricCard";
import { DataTable } from "../components/ui/DataTable";
import { StatusBadge } from "../components/ui/StatusBadge";
import { PageHeader } from "../components/ui/PageHeader";

type TaskStatus = "todo" | "in_progress" | "review" | "done";
type Priority = "high" | "medium" | "low";
type TicketStatus = "open" | "in_progress" | "resolved" | "closed";

interface ActiveTask {
  id: string;
  name: string;
  project: string;
  assignee: string;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
}

interface RecentTicket {
  id: string;
  title: string;
  priority: Priority;
  status: TicketStatus;
  assignee: string;
  created: string;
}

const activeTasks: ActiveTask[] = [
  { id: "T-001", name: "Actualizar SOP de onboarding", project: "Procesos RH", assignee: "Ana López", priority: "high", status: "in_progress", dueDate: "14 Jun" },
  { id: "T-002", name: "Revisar proceso de facturación mensual", project: "Finanzas", assignee: "Carlos Ruiz", priority: "high", status: "review", dueDate: "15 Jun" },
  { id: "T-003", name: "Configurar integración WhatsApp Business", project: "TI", assignee: "Miguel Torres", priority: "medium", status: "in_progress", dueDate: "18 Jun" },
  { id: "T-004", name: "Preparar informe de productividad Q2", project: "Reportes", assignee: "Sofia Mendez", priority: "medium", status: "todo", dueDate: "20 Jun" },
  { id: "T-005", name: "Capacitación sistema nuevo CRM", project: "CRM", assignee: "Laura Díaz", priority: "high", status: "in_progress", dueDate: "16 Jun" },
  { id: "T-006", name: "Revisión de contratos de proveedores", project: "Legal", assignee: "Ricardo García", priority: "low", status: "todo", dueDate: "25 Jun" },
  { id: "T-007", name: "Optimizar flujo de aprobaciones", project: "Operaciones", assignee: "Paola Sánchez", priority: "medium", status: "review", dueDate: "17 Jun" },
  { id: "T-008", name: "Migración base de datos a producción", project: "TI", assignee: "Miguel Torres", priority: "high", status: "in_progress", dueDate: "13 Jun" },
  { id: "T-009", name: "Actualizar políticas de privacidad", project: "Legal", assignee: "Ana López", priority: "medium", status: "todo", dueDate: "22 Jun" },
  { id: "T-010", name: "Auditoría de permisos de usuarios", project: "Seguridad", assignee: "Carlos Ruiz", priority: "high", status: "done", dueDate: "12 Jun" },
];

const recentTickets: RecentTicket[] = [
  { id: "TKT-089", title: "Error en módulo de facturación", priority: "high", status: "open", assignee: "Miguel Torres", created: "Hoy 09:14" },
  { id: "TKT-088", title: "Acceso denegado al sistema CRM", priority: "high", status: "in_progress", assignee: "Ana López", created: "Hoy 08:30" },
  { id: "TKT-087", title: "Falla en envío de correos automáticos", priority: "medium", status: "in_progress", assignee: "Carlos Ruiz", created: "Ayer 17:45" },
  { id: "TKT-086", title: "Reporte de nómina no generado", priority: "high", status: "resolved", assignee: "Sofia Mendez", created: "Ayer 14:20" },
  { id: "TKT-085", title: "Lentitud en portal de clientes", priority: "medium", status: "resolved", assignee: "Ricardo García", created: "Ayer 11:00" },
];

const priorityLabels: Record<Priority, { label: string; color: string }> = {
  high: { label: "Alta", color: "#EF4444" },
  medium: { label: "Media", color: "#F59E0B" },
  low: { label: "Baja", color: "#10B981" },
};

const taskColumns = [
  {
    key: "id",
    header: "ID",
    width: "80px",
    render: (row: ActiveTask) => (
      <span className="text-[#94A3B8] font-mono text-xs">{row.id}</span>
    ),
  },
  {
    key: "name",
    header: "Tarea",
    render: (row: ActiveTask) => (
      <span className="text-white font-medium">{row.name}</span>
    ),
  },
  {
    key: "project",
    header: "Proyecto",
    render: (row: ActiveTask) => (
      <span className="text-[#94A3B8]">{row.project}</span>
    ),
  },
  {
    key: "assignee",
    header: "Responsable",
    render: (row: ActiveTask) => (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-[#0066FF]/20 flex items-center justify-center flex-shrink-0">
          <span className="text-[#0066FF] text-[9px] font-bold">
            {row.assignee.charAt(0)}
          </span>
        </div>
        <span className="text-[#94A3B8]">{row.assignee}</span>
      </div>
    ),
  },
  {
    key: "priority",
    header: "Prioridad",
    render: (row: ActiveTask) => (
      <span style={{ color: priorityLabels[row.priority].color }} className="text-xs font-medium">
        {priorityLabels[row.priority].label}
      </span>
    ),
  },
  {
    key: "status",
    header: "Estado",
    render: (row: ActiveTask) => <StatusBadge status={row.status} />,
  },
  {
    key: "dueDate",
    header: "Vence",
    render: (row: ActiveTask) => (
      <span className="text-[#94A3B8]">{row.dueDate}</span>
    ),
  },
];

const ticketColumns = [
  {
    key: "id",
    header: "ID",
    width: "90px",
    render: (row: RecentTicket) => (
      <span className="text-[#94A3B8] font-mono text-xs">{row.id}</span>
    ),
  },
  {
    key: "title",
    header: "Ticket",
    render: (row: RecentTicket) => (
      <span className="text-white font-medium">{row.title}</span>
    ),
  },
  {
    key: "priority",
    header: "Prioridad",
    render: (row: RecentTicket) => (
      <span style={{ color: priorityLabels[row.priority].color }} className="text-xs font-medium">
        {priorityLabels[row.priority].label}
      </span>
    ),
  },
  {
    key: "status",
    header: "Estado",
    render: (row: RecentTicket) => <StatusBadge status={row.status} />,
  },
  {
    key: "assignee",
    header: "Asignado",
    render: (row: RecentTicket) => (
      <span className="text-[#94A3B8]">{row.assignee}</span>
    ),
  },
  {
    key: "created",
    header: "Creado",
    render: (row: RecentTicket) => (
      <span className="text-[#94A3B8]">{row.created}</span>
    ),
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Centro de Operaciones"
        description="Panel de control operativo — Heavenly Dreams"
        actions={
          <button className="flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-medium px-4 py-2.5 rounded-[14px] transition-colors">
            <Plus className="w-4 h-4" />
            Nueva Tarea
          </button>
        }
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <MetricCard title="Tareas Activas" value="47" change="+5 hoy" trend="up"
          icon={CheckSquare} iconColor="#0066FF" iconBg="rgba(0,102,255,0.12)" />
        <MetricCard title="Completadas Hoy" value="23" change="+8 vs ayer" trend="up"
          icon={CheckSquare} iconColor="#10B981" iconBg="rgba(16,185,129,0.12)" />
        <MetricCard title="Tickets Abiertos" value="12" change="-3 hoy" trend="down" downIsGood
          icon={AlertCircle} iconColor="#EF4444" iconBg="rgba(239,68,68,0.12)" />
        <MetricCard title="Proyectos Activos" value="8" change="Sin cambios" trend="neutral"
          icon={Briefcase} iconColor="#00A3FF" iconBg="rgba(0,163,255,0.12)" />
        <MetricCard title="Productividad" value="87%" change="+3% esta semana" trend="up"
          icon={TrendingUp} iconColor="#F59E0B" iconBg="rgba(245,158,11,0.12)" />
        <MetricCard title="Tiempo Promedio" value="2.4h" change="-0.3h vs ayer" trend="down" downIsGood
          icon={Timer} iconColor="#10B981" iconBg="rgba(16,185,129,0.12)" />
      </div>

      {/* Active Tasks Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
            Tareas Activas
          </h2>
          <button className="flex items-center gap-1.5 text-[#94A3B8] hover:text-white text-sm transition-colors">
            <Eye className="w-4 h-4" />
            Ver todas
          </button>
        </div>
        <DataTable columns={taskColumns} data={activeTasks} emptyMessage="No hay tareas activas" />
      </div>

      {/* Recent Tickets */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
            Tickets Recientes
          </h2>
          <button className="flex items-center gap-1.5 text-[#94A3B8] hover:text-white text-sm transition-colors">
            <Eye className="w-4 h-4" />
            Ver todos
          </button>
        </div>
        <DataTable columns={ticketColumns} data={recentTickets} emptyMessage="No hay tickets" />
      </div>
    </div>
  );
}
