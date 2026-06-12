import { Router } from "express";
import { z } from "zod";

const router = Router();

// Service-principal auth: n8n sends N8N_SECRET header
function requireN8nSecret(req: any, res: any, next: any) {
  const secret = process.env.N8N_WEBHOOK_SECRET ?? "dev-n8n-secret";
  if (req.headers["x-n8n-secret"] !== secret) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

const webhookSchema = z.object({
  correlationId: z.string().uuid(),
  workflowId: z.string(),
  payload: z.record(z.string(), z.unknown()).optional(),
});

const WORKFLOWS: Record<string, { humanReviewRequired: boolean }> = {
  OPERATIONS_TASK_REMINDER: { humanReviewRequired: false },
};

router.post("/", requireN8nSecret, (req, res) => {
  try {
    const { correlationId, workflowId, payload } = webhookSchema.parse(req.body);
    const workflow = WORKFLOWS[workflowId];
    if (!workflow) {
      return res.status(400).json({ error: `Unknown workflow: ${workflowId}` });
    }
    console.log(`[AUDIT STUB] n8n webhook workflowId=${workflowId} correlationId=${correlationId} platform=HD-OPERATIONS actorType=n8n_workflow`);
    if (workflow.humanReviewRequired) {
      console.log(`[HUMAN REVIEW] workflowId=${workflowId} correlationId=${correlationId} queued for review`);
      return res.json({ ok: false, status: "queued_for_review", correlationId });
    }
    // Process OPERATIONS_TASK_REMINDER: trigger task reminder from payload
    console.log(`[n8n] Processing ${workflowId}`, payload);
    return res.json({ ok: true, correlationId });
  } catch (err: any) {
    return res.status(400).json({ error: err.message ?? "Invalid request" });
  }
});

export default router;
