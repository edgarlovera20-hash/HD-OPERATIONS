export type OperationalTaskStatus =
  | "pending"
  | "in_progress"
  | "blocked"
  | "completed"
  | "cancelled";

export type OperationalPriority =
  | "low"
  | "medium"
  | "high"
  | "critical";

export interface OperationalTask {
  id: string;
  title: string;
  description?: string;
  assignedTo: string;
  supervisorId?: string;
  status: OperationalTaskStatus;
  priority: OperationalPriority;
  dueAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OperationalAgendaItem {
  id: string;
  title: string;
  assignedTo: string;
  startsAt: string;
  endsAt?: string;
  status: "scheduled" | "done" | "cancelled" | "missed";
}

export interface ProductivitySnapshot {
  id: string;
  userId: string;
  periodStart: string;
  periodEnd: string;
  tasksCompleted: number;
  tasksBlocked: number;
  agendaItemsCompleted: number;
  score: number;
}
