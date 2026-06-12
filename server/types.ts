// Server-only types for HD-OPERATIONS

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  assignee: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // ISO 8601 date
  correlationId: string; // UUID — crosses platform boundaries for audit
}

export interface AgendaSlot {
  id: string;
  time: string; // HH:mm
  title: string;
  durationMin: number;
}

export interface ProductivitySummary {
  tasksCompleted: number;
  tasksPending: number;
  completionRate: number; // 0..1
  topAssignees: Array<{ assignee: string; completed: number }>;
}
