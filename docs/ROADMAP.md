# Roadmap — HD-OPERATIONS

## Phase 1: Technical Foundation

- [ ] TypeScript + Node project setup
- [ ] Shared contracts from HD-CORE integrated
- [ ] tsconfig.json strict mode
- [ ] CI/CD pipeline (typecheck + lint)
- [ ] .env.example documented

## Phase 2: Domain Model

- [ ] Task entity (id, title, assigneeId, status, priority, dueDate, tags[])
- [ ] ScheduleSlot entity (id, userId, start, end, type, linkedTo)
- [ ] Report entity (id, type, period, generatedBy, data)
- [ ] AuditEntry integration from HD-CORE

## Phase 3: API Layer

- [ ] REST API following docs/API_CONTRACT.md
- [ ] JWT authentication middleware
- [ ] RBAC middleware using HD-CORE permissions
- [ ] Input validation
- [ ] Error handling

## Phase 4: UI

- [ ] Task board (Kanban by status/priority)
- [ ] Team schedule calendar
- [ ] Productivity dashboard
- [ ] Overdue task alerts panel
- [ ] Report generator UI

## Phase 5: Integrations

- [ ] n8n: OPERATIONS_TASK_REMINDER workflow
- [ ] Event bus: publish operations.task.* events to HD-BRAIN
- [ ] Event bus: consume rh.candidate.hired for onboarding task creation
- [ ] Event bus: consume rh.interview.scheduled for schedule blocking

## Phase 6: AI Agents

- [ ] SUPERVISOR_AGENT integration following docs/SUPERVISOR_AGENT_POLICY.md
- [ ] Task prioritization assistant
- [ ] Workload balance analyzer
- [ ] Operational report draft generator
- [ ] Human-in-the-loop for all agent report outputs

## Phase 7: Observability

- [ ] AuditEntry persistence
- [ ] Task SLA metrics
- [ ] Team productivity KPIs
- [ ] Alerting: SLA breach notifications

## Phase 8: Production Readiness

- [ ] Load testing for task listing and schedule endpoints
- [ ] Disaster recovery plan
- [ ] Security review: SUPERVISOR_AGENT domain isolation enforcement
