// SUPERVISOR_AGENT — task/schedule assistance only. NEVER modifies roles, finance, or CRM data.
import { randomUUID } from "crypto";

export interface SupervisorAgentInput {
  type: "task_prioritization" | "schedule_optimization" | "productivity_report";
}

export interface SupervisorAgentResult {
  agentId: "SUPERVISOR_AGENT";
  correlationId: string;
  actorType: "agent";
  input: SupervisorAgentInput;
  output: Record<string, unknown>;
  timestamp: string;
}

const FORBIDDEN_ACTIONS = [
  "modify_roles",
  "access_finance",
  "access_crm_data",
  "bypass_rbac",
];

const PERMITTED_ACTIONS = [
  "task_prioritization",
  "schedule_optimization",
  "productivity_report",
];

export function runSupervisorAgent(
  input: SupervisorAgentInput,
  actorId: string,
): SupervisorAgentResult {
  const correlationId = randomUUID();

  if (!PERMITTED_ACTIONS.includes(input.type)) {
    console.warn(
      `[SUPERVISOR_AGENT] FORBIDDEN action attempted: ${input.type} actor=${actorId} correlationId=${correlationId}`,
    );
    throw new Error(
      `SUPERVISOR_AGENT: action '${input.type}' not permitted. Forbidden: ${FORBIDDEN_ACTIONS.join(", ")}`,
    );
  }

  console.log(
    `[AUDIT STUB] SUPERVISOR_AGENT action=${input.type} actorId=${actorId} actorType=agent correlationId=${correlationId} platform=HD-OPERATIONS severity=info`,
  );

  return {
    agentId: "SUPERVISOR_AGENT",
    correlationId,
    actorType: "agent",
    input,
    output: {
      analysis: `SUPERVISOR_AGENT stub: ${input.type}`,
      requiresHumanApproval: true,
    },
    timestamp: new Date().toISOString(),
  };
}
