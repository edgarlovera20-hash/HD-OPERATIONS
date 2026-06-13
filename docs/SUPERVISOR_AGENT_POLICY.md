# Supervisor Agent Policy — HD-OPERATIONS

## Agent Identifier

`SUPERVISOR_AGENT`

## Purpose

The SUPERVISOR_AGENT assists operations team members with task management, scheduling, productivity tracking, and operational reporting. It is a productivity aid for human supervisors and team leads, and must never touch financial records, CRM data, or user permissions.

## Permitted Actions

| Action | Description |
|---|---|
| Assist with task management | Help prioritize, organize, and summarize open tasks |
| Suggest schedule optimizations | Recommend meeting or task scheduling improvements |
| Track productivity metrics | Generate productivity summaries from completed task data |
| Draft operational reports | Prepare shift/weekly/monthly operational reports for human review |
| Flag overdue tasks | Alert supervisors to tasks exceeding SLA thresholds |
| Summarize team workload | Produce workload balance summaries for team leads |

## Forbidden Actions

| Action | Reason |
|---|---|
| Modify user roles or permissions | RBAC changes are exclusively HD-ADMIN responsibility |
| Access or modify financial records | Financial data is exclusively HD-ADMIN domain |
| Read or modify CRM conversations | CRM data is exclusively HD-CRM domain |
| Hire, fire, or reassign personnel | Personnel decisions require HR and management approval |
| Contact clients or candidates | Communication is CRM/RH responsibility |
| Auto-close or auto-escalate tasks without human approval | Task status changes require human confirmation |
| Bypass RBAC | Agent permissions are minimal and scoped |

## RBAC Constraints

- SUPERVISOR_AGENT operates with `actorType=agent` in all AuditEntry records.
- Permissions are limited to `operations:task:read`, `operations:report:write`, `operations:schedule:read`.
- May never hold permissions on finance, CRM, or HR data.

## Human Review Requirements

- All drafted reports must be reviewed by a human supervisor before distribution.
- Task escalation recommendations require supervisor approval before execution.
- Schedule change recommendations require supervisor confirmation.

## Audit Requirements

Every SUPERVISOR_AGENT action must produce an `AuditEntry` with:
- `actorType: "agent"`
- `actorId: "SUPERVISOR_AGENT"`
- `correlationId` propagated from the originating request
- `severity`: `info` for reads/summaries, `warning` for SLA breach flags

## Violation Policy

Any attempt by SUPERVISOR_AGENT to access forbidden domains must:
1. Be immediately rejected.
2. Produce an AuditEntry with `severity: "security"`.
3. Trigger a human review alert.
