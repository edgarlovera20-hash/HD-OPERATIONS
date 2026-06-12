export const operationsEvents = {
  taskCreated: "operations.task.created",
  taskAssigned: "operations.task.assigned",
  taskCompleted: "operations.task.completed",
  taskBlocked: "operations.task.blocked",
  agendaItemScheduled: "operations.agenda_item.scheduled",
  productivitySnapshotCreated: "operations.productivity_snapshot.created"
} as const;

export type OperationsEventName =
  typeof operationsEvents[keyof typeof operationsEvents];
