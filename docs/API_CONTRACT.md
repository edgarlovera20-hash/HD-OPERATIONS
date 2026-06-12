# API Contract — HD-OPERATIONS

## Overview

This document defines the expected API surface for HD-OPERATIONS.

## Base URL

```
https://api.hd-operations.internal/v1
```

## Authentication

- All endpoints require a valid JWT issued by HD-CORE identity service.
- RBAC permissions defined in `HD-CORE/packages/contracts/src/rbac.ts`.

## Resources

### Tasks

| Method | Endpoint | Permission | Description |
|---|---|---|---|
| GET | /tasks | `operations:task:read` | List tasks with filters |
| GET | /tasks/:id | `operations:task:read` | Get task detail |
| POST | /tasks | `operations:task:create` | Create a task |
| PATCH | /tasks/:id | `operations:task:update` | Update task (status, assignee, due date) |
| DELETE | /tasks/:id | `operations:task:delete` | Delete task (soft delete) |

### Schedule

| Method | Endpoint | Permission | Description |
|---|---|---|---|
| GET | /schedule | `operations:schedule:read` | Get team schedule |
| POST | /schedule/slots | `operations:schedule:update` | Reserve a schedule slot |
| DELETE | /schedule/slots/:id | `operations:schedule:update` | Release a slot |

### Reports

| Method | Endpoint | Permission | Description |
|---|---|---|---|
| GET | /reports/productivity | `operations:report:read` | Productivity report |
| GET | /reports/overdue | `operations:report:read` | Overdue tasks report |

## Events Emitted

See `docs/EVENTS.md`.

## Audit Rules

- All task mutations must produce an `AuditEntry`.
- SUPERVISOR_AGENT actions must use `actorType: agent`.

## Error Contract

| Code | Meaning |
|---|---|
| 400 | Validation error |
| 401 | Not authenticated |
| 403 | Insufficient permissions |
| 404 | Resource not found |
| 429 | Rate limit |
| 500 | Internal error |

## Prohibited

- No direct database access from other platforms.
- No mutation endpoints accessible by agents without human-in-the-loop.
