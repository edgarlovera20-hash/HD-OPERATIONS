import { Router } from "express";
import { z } from "zod";
import { requireAuth, AuthRequest } from "../middleware/requireAuth.js";
import { runSupervisorAgent } from "../agents/supervisor-agent.js";

const router = Router();

const inputSchema = z.object({
  type: z.enum([
    "task_prioritization",
    "schedule_optimization",
    "productivity_report",
  ]),
});

// POST /api/agent/run — SUPERVISOR_AGENT entry point (requireAuth enforced)
router.post("/run", requireAuth, (req: AuthRequest, res) => {
  try {
    const input = inputSchema.parse(req.body);
    const result = runSupervisorAgent(input, req.user?.sub ?? "unknown");
    return res.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return res.status(400).json({ error: message });
  }
});

export default router;
