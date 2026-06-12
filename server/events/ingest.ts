import { z } from "zod";

const EVENT_BUS_SECRET = process.env.EVENT_BUS_SECRET ?? "";

export function requireEventBusSecret(
  req: import("express").Request,
  res: import("express").Response,
  next: import("express").NextFunction
): void {
  if (!EVENT_BUS_SECRET) {
    console.warn("[INGEST] EVENT_BUS_SECRET not set — accepting all ingest requests");
    next();
    return;
  }
  const header = req.headers["x-event-bus-secret"];
  if (header !== EVENT_BUS_SECRET) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

const envelopeSchema = z.object({
  eventId: z.string(),
  eventName: z.string(),
  correlationId: z.string(),
  occurredAt: z.string(),
  producer: z.string(),
  actor: z.object({
    id: z.string(),
    type: z.enum(["user", "agent", "system", "n8n_workflow", "service_principal"]),
  }),
  payload: z.record(z.string(), z.unknown()),
  schemaVersion: z.string().optional(),
  version: z.string().optional(),
});

// ingestEvent handles only rh.candidate.hired.
// Calls addOnboardingTask injected from the tasks router.
export function ingestEvent(
  body: unknown,
  addOnboardingTask: (candidateId: string, correlationId: string) => void
): { ok: boolean; error?: string } {
  const parsed = envelopeSchema.safeParse(body);
  if (!parsed.success) {
    return { ok: false, error: "Invalid event envelope" };
  }
  const envelope = parsed.data;
  if (envelope.eventName === "rh.candidate.hired") {
    const p = envelope.payload as { candidateId?: string };
    addOnboardingTask(p.candidateId ?? "unknown", envelope.correlationId);
  }
  // Other event names are silently ignored — OPERATIONS only needs rh.candidate.hired.
  return { ok: true };
}
