import { Plus, Users, CheckSquare, Calendar, MoreVertical } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { StatusBadge } from "../components/ui/StatusBadge";

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  tasks: number;
  completedTasks: number;
  members: number;
  status: "active" | "paused" | "done";
  dueDate: string;
  color: string;
  teamInitials: string[];
}

const projects: Project[] = [
  {
    id: "P-01", name: "Implementación CRM", description: "Despliegue completo del sistema CRM para gestión de clientes y prospectos",
    progress: 67, tasks: 8, completedTasks: 5, members: 3, status: "active", dueDate: "30 Jun 2026", color: "#0066FF",
    teamInitials: ["A", "C", "M"],
  },
  {
    id: "P-02", name: "Migración de Base de Datos", description: "Migración de datos legados al nuevo esquema de base de datos PostgreSQL",
    progress: 23, tasks: 15, completedTasks: 3, members: 5, status: "active", dueDate: "15 Jul 2026", color: "#F59E0B",
    teamInitials: ["M", "R", "S", "L", "C"],
  },
  {
    id: "P-03", name: "Rediseño Portal Web", description: "Renovación del portal público con nueva identidad visual y mejor UX",
    progress: 45, tasks: 12, completedTasks: 5, members: 4, status: "active", dueDate: "31 Jul 2026", color: "#00A3FF",
    teamInitials: ["L", "P", "R", "A"],
  },
  {
    id: "P-04", name: "Automatización de Nómina", description: "Sistema automático de cálculo y dispersión de nómina quincenal",
    progress: 89, tasks: 6, completedTasks: 5, members: 2, status: "active", dueDate: "20 Jun 2026", color: "#10B981",
    teamInitials: ["A", "C"],
  },
  {
    id: "P-05", name: "Sistema de Tickets", description: "Plataforma de soporte interno para gestión de incidencias y solicitudes",
    progress: 12, tasks: 20, completedTasks: 2, members: 6, status: "paused", dueDate: "31 Ago 2026", color: "#EF4444",
    teamInitials: ["M", "R", "S", "L", "P", "C"],
  },
  {
    id: "P-06", name: "Integración WhatsApp Business", description: "Automatización de comunicaciones con clientes vía WhatsApp Business API",
    progress: 56, tasks: 9, completedTasks: 5, members: 3, status: "active", dueDate: "10 Jul 2026", color: "#10B981",
    teamInitials: ["M", "L", "R"],
  },
];

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader
        title="Proyectos"
        description="Gestión y seguimiento de proyectos del equipo operativo"
        actions={
          <button className="flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-medium px-4 py-2.5 rounded-[14px] transition-colors">
            <Plus className="w-4 h-4" />
            Nuevo Proyecto
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-[#161F33] border border-white/[0.08] rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-6 flex flex-col gap-4 hover:border-[#0066FF]/30 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] text-[#94A3B8] font-mono">{project.id}</span>
                  <StatusBadge status={project.status} />
                </div>
                <h3 className="text-white font-semibold text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {project.name}
                </h3>
              </div>
              <button className="text-[#94A3B8] hover:text-white transition-colors flex-shrink-0">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[#94A3B8] text-xs leading-relaxed">{project.description}</p>

            {/* Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-[#94A3B8]">Progreso</span>
                <span className="text-xs font-bold text-white">{project.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${project.progress}%`,
                    background: `linear-gradient(90deg, ${project.color}, ${project.color}99)`,
                  }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[#94A3B8] text-xs">
                <CheckSquare className="w-3.5 h-3.5" />
                <span>{project.completedTasks}/{project.tasks} tareas</span>
              </div>
              <div className="flex items-center gap-1 text-[#94A3B8] text-xs">
                <Calendar className="w-3.5 h-3.5" />
                <span>{project.dueDate}</span>
              </div>
            </div>

            {/* Team */}
            <div className="flex items-center justify-between border-t border-white/[0.05] pt-4">
              <div className="flex -space-x-2">
                {project.teamInitials.slice(0, 5).map((initial, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-[#161F33] flex items-center justify-center text-[9px] font-bold"
                    style={{ background: `${project.color}30`, color: project.color }}
                  >
                    {initial}
                  </div>
                ))}
                {project.members > 5 && (
                  <div className="w-7 h-7 rounded-full border-2 border-[#161F33] bg-white/[0.08] flex items-center justify-center text-[9px] text-[#94A3B8]">
                    +{project.members - 5}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 text-[#94A3B8] text-xs">
                <Users className="w-3.5 h-3.5" />
                <span>{project.members} miembros</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
