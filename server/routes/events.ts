import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { getRecentEvents } from "../events/emitter.js";
import { requireEventBusSecret, ingestEvent } from "../events/ingest.js";
import { addOnboardingTask } from "./tasks.js";

const router = Router();

// GET /api/events — return in-memory event log (last 100 events)
router.get("/", requireAuth, (_req, res) => res.json(getRecentEvents()));

// POST /api/events/ingest — receive cross-platform events.
// Only rh.candidate.hired is handled; all other events are silently acknowledged.
router.post("/ingest", requireEventBusSecret, (req, res) => {
  const result = ingestEvent(req.body, addOnboardingTask);
  if (!result.ok) {
    return res.status(400).json({ error: result.error ?? "Invalid event envelope" });
  }
  return res.status(200).json({ received: true });
});

export default router;
