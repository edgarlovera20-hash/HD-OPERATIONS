import { Router } from "express";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", platform: "HD-OPERATIONS", timestamp: new Date().toISOString() });
});

export default router;
