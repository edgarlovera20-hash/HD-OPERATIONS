import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { getRecentEvents } from "../events/emitter.js";

const router = Router();

// GET /api/events — return in-memory event log (last 100 events)
router.get("/", requireAuth, (_req, res) => res.json(getRecentEvents()));

export default router;
