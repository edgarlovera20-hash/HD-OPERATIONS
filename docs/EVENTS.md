# Events — HD-OPERATIONS

## Overview

This document catalogs all domain events produced and consumed by HD-OPERATIONS. All shared event names must originate from HD-CORE.

## Produced Events

| Event | Producer | Consumers | Payload Summary | Sensitivity |
|---|---|---|---|---|
| `operations.task.created` | HD-OPERATIONS | HD-BRAIN | taskId, assigneeId, dueDate, priority, correlationId | internal |
| `operations.task.completed` | HD-OPERATIONS | HD-BRAIN | taskId, completedBy, completedAt, correlationId | internal |
| `operations.task.overdue` | HD-OPERATIONS | HD-BRAIN, HD-ADMIN | taskId, assigneeId, daysOverdue, correlationId | internal |
| `operations.schedule.updated` | HD-OPERATIONS | HD-BRAIN | scheduleId, affectedUserIds[], changeType, correlationId | internal |
| `operations.report.generated` | HD-OPERATIONS | HD-ADMIN | reportId, type, period, correlationId | internal |

## Consumed Events

| Event | Consumer | Source | Action Taken |
|---|---|---|---|
| `rh.interview.scheduled` | HD-OPERATIONS | HD-RH | Block interviewer schedule slot |
| `rh.candidate.hired` | HD-OPERATIONS | HD-RH | Create onboarding task sequence |
| `brain.risk.alert_generated` | HD-OPERATIONS | HD-BRAIN | Flag relevant tasks for supervisor review |
| `admin.user.role_changed` | HD-OPERATIONS | HD-ADMIN | Refresh RBAC context |

## Rules

1. All shared event names must come from `HD-CORE/packages/contracts/src/events.ts`.
2. Every event payload must include `correlationId` and `createdAt`.
3. Events must be processed idempotently.
4. SUPERVISOR_AGENT must not produce events that mutate CRM, Finance, or HR data.
