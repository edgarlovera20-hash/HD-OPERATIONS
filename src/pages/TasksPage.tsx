import { useState } from "react";
import { Plus, List, LayoutDashboard } from "lucide-react";
import { TaskCard } from "../components/ui/TaskCard";
import { PageHeader } from "../components/ui/PageHeader";

type Priority = "high" | "medium" | "low";
type TaskStatus = "todo" | "in_progress" | "review" | "done";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  assignee: string;
  dueDate: string;
  project: string;
}

const allTasks: Task[] = [
  // TODO
  { id: "1", title: "Actualizar SOP de onboarding de empleados", project: "RH", priority: "high", status: "todo", assignee: "Ana López", dueDate: "20 Jun", description: "Revisar y actualizar el proceso completo de incorporación" },
  { id: "2", title: "Diseñar plantilla de evaluación de desempeño", project: "RH", priority: "medium", status: "todo", assignee: "Laura Díaz", dueDate: "22 Jun" },
  { id: "3", title: "Preparar informe mensual de productividad", project: "Reportes", priority: "medium", status: "todo", assignee: "Sofia Mendez", dueDate: "25 Jun" },
  { id: "4", title: "Revisar políticas de uso de sistemas", project: "TI", priority: "low", status: "todo", assignee: "Miguel Torres", dueDate: "28 Jun" },
  { id: "5", title: "Actualizar directorio de contactos de proveedores", project: "Compras", priority: "low", status: "todo", assignee: "Paola Sánchez", dueDate: "30 Jun" },
  { id: "6", title: "Crear checklist de cierre mensual", project: "Finanzas", priority: "high", status: "todo", assignee: "Carlos Ruiz", dueDate: "19 Jun" },
  { id: "7", title: "Definir KPIs de atención al cliente para Q3", project: "CRM", priority: "medium", status: "todo", assignee: "Ricardo García", dueDate: "26 Jun" },
  { id: "8", title: "Documentar proceso de escalamiento de incidencias", project: "TI", priority: "medium", status: "todo", assignee: "Miguel Torres", dueDate: "24 Jun" },
  // IN_PROGRESS
  { id: "9", title: "Revisar proceso de facturación mensual", project: "Finanzas", priority: "high", status: "in_progress", assignee: "Carlos Ruiz", dueDate: "15 Jun", description: "Optimizar el flujo de generación de facturas" },
  { id: "10", title: "Configurar integración WhatsApp Business", project: "TI", priority: "medium", status: "in_progress", assignee: "Miguel Torres", dueDate: "18 Jun" },
  { id: "11", title: "Capacitación al equipo en nuevo CRM", project: "CRM", priority: "high", status: "in_progress", assignee: "Laura Díaz", dueDate: "16 Jun" },
  { id: "12", title: "Migración de base de datos a servidor de producción", project: "TI", priority: "high", status: "in_progress", assignee: "Miguel Torres", dueDate: "14 Jun" },
  { id: "13", title: "Implementar módulo de reportes automáticos", project: "Reportes", priority: "medium", status: "in_progress", assignee: "Ricardo García", dueDate: "21 Jun" },
  // REVIEW
  { id: "14", title: "Optimizar flujo de aprobaciones internas", project: "Operaciones", priority: "medium", status: "review", assignee: "Paola Sánchez", dueDate: "17 Jun" },
  { id: "15", title: "Validar contratos con nuevos proveedores", project: "Legal", priority: "high", status: "review", assignee: "Ana López", dueDate: "15 Jun" },
  { id: "16", title: "Revisar seguridad del portal de empleados", project: "TI", priority: "high", status: "review", assignee: "Miguel Torres", dueDate: "13 Jun" },
  // DONE
  { id: "17", title: "Auditoría de permisos de usuarios del sistema", project: "Seguridad", priority: "high", status: "done", assignee: "Carlos Ruiz", dueDate: "12 Jun" },
  { id: "18", title: "Actualizar certificados SSL del servidor", project: "TI", priority: "high", status: "done", assignee: "Miguel Torres", dueDate: "11 Jun" },
  { id: "19", title: "Enviar reporte semanal a dirección", project: "Reportes", priority: "medium", status: "done", assignee: "Sofia Mendez", dueDate: "10 Jun" },
  { id: "20", title: "Configurar alertas de monitoreo del sistema", project: "TI", priority: "medium", status: "done", assignee: "Ricardo García", dueDate: "09 Jun" },
  { id: "21", title: "Actualizar contraseñas de acceso a sistemas críticos", project: "Seguridad", priority: "high", status: "done", assignee: "Carlos Ruiz", dueDate: "08 Jun" },
  { id: "22", title: "Procesar nómina quincenal", project: "Finanzas", priority: "high", status: "done", assignee: "Ana López", dueDate: "07 Jun" },
];

type ViewMode = "kanban" | "list";

const columns: Array<{ id: TaskStatus; label: string; color: string }> = [
  { id: "todo", label: "Por Hacer", color: "#94A3B8" },
  { id: "in_progress", label: "En Progreso", color: "#F59E0B" },
  { id: "review", label: "En Revisión", color: "#00A3FF" },
  { id: "done", label: "Completado", color: "#10B981" },
];

export default function TasksPage() {
  const [view, setView] = useState<ViewMode>("kanban");

  const tasksByStatus = (status: TaskStatus) =>
    allTasks.filter((t) => t.status === status);

  return (
    <div>
      <PageHeader
        title="Gestión de Tareas"
        description="Tablero kanban y lista de tareas del equipo"
        actions={
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-[#161F33] border border-white/[0.08] rounded-[10px] p-1">
              <button
                onClick={() => setView("list")}
                className={`p-1.5 rounded-[8px] transition-colors ${view === "list" ? "bg-[#0066FF] text-white" : "text-[#94A3B8] hover:text-white"}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("kanban")}
                className={`p-1.5 rounded-[8px] transition-colors ${view === "kanban" ? "bg-[#0066FF] text-white" : "text-[#94A3B8] hover:text-white"}`}
              >
                <LayoutDashboard className="w-4 h-4" />
              </button>
            </div>
            <button className="flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-medium px-4 py-2.5 rounded-[14px] transition-colors">
              <Plus className="w-4 h-4" />
              Nueva Tarea
            </button>
          </div>
        }
      />

      {view === "kanban" ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 min-h-[600px]">
          {columns.map((col) => {
            const tasks = tasksByStatus(col.id);
            return (
              <div key={col.id} className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: col.color }} />
                    <span className="text-sm font-semibold text-white">{col.label}</span>
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ color: col.color, background: `${col.color}18` }}
                  >
                    {tasks.length}
                  </span>
                </div>
                <div className="flex-1 bg-[#111827] border border-white/[0.05] rounded-[16px] p-3 space-y-3 min-h-[200px]">
                  {tasks.map((task) => (
                    <TaskCard key={task.id} {...task} />
                  ))}
                  {tasks.length === 0 && (
                    <div className="flex items-center justify-center h-24 text-[#94A3B8] text-xs">
                      Sin tareas
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {allTasks.map((task) => (
            <div key={task.id} className="bg-[#161F33] border border-white/[0.08] rounded-[16px] p-4 flex items-center gap-4">
              <span className="text-[#94A3B8] font-mono text-xs w-16 flex-shrink-0">{task.id}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{task.title}</p>
                <p className="text-[#94A3B8] text-xs">{task.project}</p>
              </div>
              <span className="text-[#94A3B8] text-xs hidden sm:block">{task.assignee}</span>
              <span className="text-[#94A3B8] text-xs hidden md:block">{task.dueDate}</span>
              <div className="flex-shrink-0">
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{
                    color: task.priority === "high" ? "#EF4444" : task.priority === "medium" ? "#F59E0B" : "#10B981",
                    background: task.priority === "high" ? "rgba(239,68,68,0.12)" : task.priority === "medium" ? "rgba(245,158,11,0.12)" : "rgba(16,185,129,0.12)",
                  }}
                >
                  {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Media" : "Baja"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
