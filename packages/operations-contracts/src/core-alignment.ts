import { hdEvents, hdPermissions, hdPlatforms } from "@hd/core-contracts";

export const operationsCoreAlignment = {
  platform: hdPlatforms.operations,
  events: {
    taskCreated: hdEvents.operationsTaskCreated,
    taskCompleted: hdEvents.operationsTaskCompleted,
    productivitySnapshotCreated: hdEvents.operationsProductivitySnapshotCreated
  },
  permissions: {
    reportsView: hdPermissions.operationsReportsView,
    tasksCreate: hdPermissions.operationsTasksCreate,
    tasksUpdate: hdPermissions.operationsTasksUpdate
  }
} as const;
