// HD-OPERATIONS domain routes: tasks, agenda, productivity.
// Domain boundary: this platform owns tasks, schedule slots, and productivity
// reports only. It must NOT touch CRM debt collection, finance, or global admin.
import crypto from "crypto";
import { Router } from "express";
import { z } from "zod";
import { requireAuth, type AuthRequest } from "../middleware/requireAuth.js";
import type { AgendaSlot, ProductivitySummary, Task, TaskStatus } from "../types.js";
import { emitEvent } from "../events/emitter.js";

const router = Router();

// In-memory seed data (replaced by the operational DB in production).
const tasks: Task[] = [
  { id: "tsk_001", title: "Revisar agenda diaria del equipo", assignee: "Lucía Mendoza", status: "done", priority: "medium", dueDate: "2026-06-12", correlationId: crypto.randomUUID() },
  { id: "tsk_002", title: "Asignar turnos de la semana", assignee: "Carlos Ruiz", status: "in_progress", priority: "high", dueDate: "2026-06-13", correlationId: crypto.randomUUID() },
  { id: "tsk_003", title: "Actualizar checklist de apertura", assignee: "Lucía Mendoza", status: "todo", priority: "low", dueDate: "2026-06-14", correlationId: crypto.randomUUID() },
  { id: "tsk_004", title: "Reporte de productividad semanal", assignee: "Ana Torres", status: "done", priority: "high", dueDate: "2026-06-12", correlationId: crypto.randomUUID() },
  { id: "tsk_005", title: "Coordinar mantenimiento de equipo", assignee: "Carlos Ruiz", status: "todo", priority: "medium", dueDate: "2026-06-15", correlationId: crypto.randomUUID() },
  { id: "tsk_006", title: "Capacitación de nuevos operadores", assignee: "Ana Torres", status: "in_progress", priority: "medium", dueDate: "2026-06-16", correlationId: crypto.randomUUID() },
  { id: "tsk_007", title: "Auditoría de inventario operativo", assignee: "Lucía Mendoza", status: "todo", priority: "high", dueDate: "2026-06-17", correlationId: crypto.randomUUID() },
  { id: "tsk_008", title: "Cierre de tareas pendientes del día", assignee: "Carlos Ruiz", status: "done", priority: "low", dueDate: "2026-06-12", correlationId: crypto.randomUUID() },
  { id: "tsk_009", title: "Planificar agenda de la próxima semana", assignee: "Ana Torres", status: "todo", priority: "medium", dueDate: "2026-06-18", correlationId: crypto.randomUUID() },
];

const agenda: AgendaSlot[] = [
  { id: "slot_001", time: "08:00", title: "Reunión de apertura del equipo", durationMin: 30 },
  { id: "slot_002", time: "09:30", title: "Asignación de tareas operativas", durationMin: 45 },
  { id: "slot_003", time: "11:00", title: "Revisión de productividad", durationMin: 30 },
  { id: "slot_004", time: "13:00", title: "Coordinación con supervisores", durationMin: 60 },
  { id: "slot_005", time: "16:00", title: "Cierre y reporte del día", durationMin: 30 },
  { id: "slot_006", time: "17:30", title: "Planeación de la jornada siguiente", durationMin: 30 },
];

const statusOrder: TaskStatus[] = ["todo", "in_progress", "done"];

function advanceStatus(current: TaskStatus): TaskStatus {
  const idx = statusOrder.indexOf(current);
  return statusOrder[(idx + 1) % statusOrder.length];
}

// All operations routes require authentication.
router.use(requireAuth);

const statusFilterSchema = z.enum(["todo", "in_progress", "done"]).optional();

// GET /api/tasks — list tasks, optional ?status= filter
router.get("/tasks", (req, res) => {
  const parsed = statusFilterSchema.safeParse(req.query.status);
  if (!parsed.success) {
    return res.status(400).json({ error: "Filtro de estado inválido" });
  }
  const status = parsed.data;
  const result = status ? tasks.filter((t) => t.status === status) : tasks;
  return res.json({ tasks: result });
});

const createTaskSchema = z.object({
  title: z.string().min(1),
  assignee: z.string().min(1),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().min(1),
});

// POST /api/tasks — create a task
router.post("/tasks", (req: AuthRequest, res) => {
  const parsed = createTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Solicitud inválida" });
  }
  const correlationId = crypto.randomUUID();
  const task: Task = {
    id: `tsk_${crypto.randomUUID().slice(0, 8)}`,
    title: parsed.data.title,
    assignee: parsed.data.assignee,
    status: "todo",
    priority: parsed.data.priority,
    dueDate: parsed.data.dueDate,
    correlationId,
  };
  tasks.push(task);

  // Audit stub: a real AuditEntry (actorType "user") must be persisted here.
  console.log(`[AUDIT STUB] task.create`, {
    resourceType: "task",
    resourceId: task.id,
    correlationId,
    platform: "HD-OPERATIONS",
    action: "create",
  });

  emitEvent(
    "operations.task.created",
    { taskId: task.id, title: task.title, assignee: task.assignee, priority: task.priority },
    "HD-OPERATIONS",
    { id: req.user?.sub ?? "system", type: req.user ? "user" : "system" },
    correlationId
  );

  return res.status(201).json({ task });
});

const patchTaskSchema = z
  .object({ status: z.enum(["todo", "in_progress", "done"]).optional() })
  .optional();

// PATCH /api/tasks/:id — advance status (or set explicitly)
router.patch("/tasks/:id", (req: AuthRequest, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  const parsed = patchTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Solicitud inválida" });
  }
  const fromStatus = task.status;
  task.status = parsed.data?.status ?? advanceStatus(task.status);

  // Audit stub: a real AuditEntry (actorType "user") must be persisted here.
  console.log(`[AUDIT STUB] task.update`, {
    resourceType: "task",
    resourceId: task.id,
    correlationId: task.correlationId,
    platform: "HD-OPERATIONS",
    action: "update",
  });

  emitEvent(
    "operations.task.status_changed",
    { taskId: task.id, fromStatus, toStatus: task.status },
    "HD-OPERATIONS",
    { id: req.user?.sub ?? "system", type: req.user ? "user" : "system" },
    task.correlationId
  );

  return res.json({ task });
});

// GET /api/agenda — today's schedule slots
router.get("/agenda", (_req, res) => {
  return res.json({ agenda });
});

// GET /api/productivity — productivity summary
router.get("/productivity", (_req, res) => {
  const tasksCompleted = tasks.filter((t) => t.status === "done").length;
  const tasksPending = tasks.length - tasksCompleted;
  const completionRate = tasks.length === 0 ? 0 : tasksCompleted / tasks.length;

  const byAssignee = new Map<string, number>();
  for (const t of tasks) {
    if (t.status === "done") {
      byAssignee.set(t.assignee, (byAssignee.get(t.assignee) ?? 0) + 1);
    }
  }
  const topAssignees = [...byAssignee.entries()]
    .map(([assignee, completed]) => ({ assignee, completed }))
    .sort((a, b) => b.completed - a.completed)
    .slice(0, 3);

  const summary: ProductivitySummary = {
    tasksCompleted,
    tasksPending,
    completionRate,
    topAssignees,
  };
  return res.json({ productivity: summary });
});

export default router;
