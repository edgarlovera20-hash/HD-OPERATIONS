export interface TaskReminderJobPayload {
  taskId: string;
  assignedTo: string;
  dueAt: string;
}

export function shouldNotifySupervisor(
  status: string,
  priority: string
): boolean {
  return status === "blocked" || priority === "critical";
}
