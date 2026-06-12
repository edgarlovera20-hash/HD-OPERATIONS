import { Calendar, CheckSquare, Clock, LogOut, Plus, TrendingUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type TaskStatus = "todo" | "in_progress" | "done";
type TaskPriority = "low" | "medium" | "high";

interface Task {
  id: string;
  title: string;
  assignee: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  correlationId: string;
}

interface AgendaSlot {
  id: string;
  time: string;
  title: string;
  durationMin: number;
}

interface ProductivitySummary {
  tasksCompleted: number;
  tasksPending: number;
  completionRate: number;
  topAssignees: Array<{ assignee: string; completed: number }>;
}

const statusLabels: Record<TaskStatus, string> = {
  todo: "Por hacer",
  in_progress: "En progreso",
  done: "Completada",
};

const statusStyles: Record<TaskStatus, string> = {
  todo: "bg-[#334155]/40 text-[#9CA3AF] border-[#334155]",
  in_progress: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30",
  done: "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30",
};

const priorityStyles: Record<TaskPriority, string> = {
  low: "bg-[#9CA3AF]",
  medium: "bg-[#00A3FF]",
  high: "bg-[#EF4444]",
};

const priorityLabels: Record<TaskPriority, string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
};

export default function DashboardPage() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [agenda, setAgenda] = useState<AgendaSlot[]>([]);
  const [productivity, setProductivity] = useState<ProductivitySummary | null>(null);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const authHeaders = useCallback(
    () => ({ Authorization: `Bearer ${token ?? ""}` }),
    [token]
  );

  const loadData = useCallback(async () => {
    try {
      const [tRes, aRes, pRes] = await Promise.all([
        fetch("/api/tasks", { headers: authHeaders() }),
        fetch("/api/agenda", { headers: authHeaders() }),
        fetch("/api/productivity", { headers: authHeaders() }),
      ]);
      if (tRes.status === 401 || aRes.status === 401 || pRes.status === 401) {
        logout();
        navigate("/login", { replace: true });
        return;
      }
      const tData = await tRes.json();
      const aData = await aRes.json();
      const pData = await pRes.json();
      setTasks(tData.tasks ?? []);
      setAgenda(aData.agenda ?? []);
      setProductivity(pData.productivity ?? null);
    } catch {
      setError("No se pudieron cargar los datos de operaciones.");
    }
  }, [authHeaders, logout, navigate]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !assignee.trim() || !dueDate) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ title, assignee, priority, dueDate }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "No se pudo crear la tarea.");
        return;
      }
      setTitle("");
      setAssignee("");
      setPriority("medium");
      setDueDate("");
      await loadData();
    } catch {
      setError("Error de conexión al crear la tarea.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleAdvance(taskId: string) {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({}),
      });
      if (res.ok) await loadData();
    } catch {
      setError("No se pudo actualizar la tarea.");
    }
  }

  const completionPct = productivity
    ? Math.round(productivity.completionRate * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-[#F9FAFB]">
      <header className="bg-[#111827] border-b border-[#1F2937] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center">
            <CheckSquare className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
            HD Operations
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#9CA3AF] text-sm">{user?.email ?? "Ops"}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Salir
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
            Operaciones diarias
          </h1>
          <p className="text-[#9CA3AF] mt-1 text-sm">
            Tareas, agenda y productividad del equipo operativo
          </p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Productivity summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-[#10B981]" />
              </div>
              <span className="text-[#9CA3AF] text-sm">Completadas</span>
            </div>
            <p className="text-3xl font-bold text-white">
              {productivity?.tasksCompleted ?? 0}
            </p>
          </div>
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <span className="text-[#9CA3AF] text-sm">Pendientes</span>
            </div>
            <p className="text-3xl font-bold text-white">
              {productivity?.tasksPending ?? 0}
            </p>
          </div>
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#0066FF]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#0066FF]" />
              </div>
              <span className="text-[#9CA3AF] text-sm">Tasa de cumplimiento</span>
            </div>
            <p className="text-3xl font-bold text-white">{completionPct}%</p>
            {productivity && productivity.topAssignees.length > 0 && (
              <p className="text-[#9CA3AF] text-xs mt-2">
                Líder: {productivity.topAssignees[0].assignee} (
                {productivity.topAssignees[0].completed})
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task board */}
          <section className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <CheckSquare className="w-5 h-5 text-[#0066FF]" />
              <h2 className="font-semibold text-[#F9FAFB]">Tablero de tareas</h2>
            </div>

            {/* Add task form */}
            <form
              onSubmit={handleAddTask}
              className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título de la tarea"
                className="px-3 py-2 rounded-lg bg-[#161F33] border border-[#334155] text-[#F9FAFB] placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#0066FF]"
              />
              <input
                type="text"
                required
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                placeholder="Responsable"
                className="px-3 py-2 rounded-lg bg-[#161F33] border border-[#334155] text-[#F9FAFB] placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#0066FF]"
              />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="px-3 py-2 rounded-lg bg-[#161F33] border border-[#334155] text-[#F9FAFB] text-sm focus:outline-none focus:border-[#0066FF]"
              >
                <option value="low">Prioridad: Baja</option>
                <option value="medium">Prioridad: Media</option>
                <option value="high">Prioridad: Alta</option>
              </select>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-3 py-2 rounded-lg bg-[#161F33] border border-[#334155] text-[#F9FAFB] text-sm focus:outline-none focus:border-[#0066FF]"
              />
              <button
                type="submit"
                disabled={submitting}
                className="sm:col-span-2 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] disabled:opacity-50 text-white font-medium text-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                {submitting ? "Agregando..." : "Agregar tarea"}
              </button>
            </form>

            <div className="space-y-3">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => handleAdvance(task.id)}
                  title="Clic para avanzar el estado"
                  className="w-full text-left bg-[#111827] border border-[#1F2937] rounded-xl p-4 hover:border-[#0066FF] hover:bg-[#161F33] transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${priorityStyles[task.priority]}`}
                        title={`Prioridad ${priorityLabels[task.priority]}`}
                      />
                      <div>
                        <p className="text-[#F9FAFB] font-medium text-sm">{task.title}</p>
                        <p className="text-[#9CA3AF] text-xs mt-1">
                          {task.assignee} · vence {task.dueDate} · {priorityLabels[task.priority]}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-md border flex-shrink-0 ${statusStyles[task.status]}`}
                    >
                      {statusLabels[task.status]}
                    </span>
                  </div>
                </button>
              ))}
              {tasks.length === 0 && (
                <p className="text-[#9CA3AF] text-sm">No hay tareas registradas.</p>
              )}
            </div>
          </section>

          {/* Today's agenda */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-[#0066FF]" />
              <h2 className="font-semibold text-[#F9FAFB]">Agenda de hoy</h2>
            </div>
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 space-y-4">
              {agenda.map((slot) => (
                <div key={slot.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className="text-[#0066FF] text-sm font-semibold">{slot.time}</span>
                    <span className="w-px flex-1 bg-[#1F2937] mt-1" />
                  </div>
                  <div className="pb-2">
                    <p className="text-[#F9FAFB] text-sm">{slot.title}</p>
                    <p className="text-[#9CA3AF] text-xs mt-0.5">{slot.durationMin} min</p>
                  </div>
                </div>
              ))}
              {agenda.length === 0 && (
                <p className="text-[#9CA3AF] text-sm">Sin eventos programados.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
