import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { auditLog } from "./server/middleware/auditLog.js";
import authRoutes from "./server/routes/auth.js";
import agentRouter from "./server/routes/agent.js";
import eventsRouter from "./server/routes/events.js";
import healthRoutes from "./server/routes/health.js";
import opsRoutes from "./server/routes/tasks.js";
import webhooksRouter from "./server/routes/webhooks.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT ?? 3005;
const isDev = process.env.NODE_ENV !== "production";

app.use(express.json());

// Audit middleware: every mutation on /api must produce an AuditEntry (stub).
app.use("/api", auditLog);

app.use("/api/auth", authRoutes);
app.use("/api/agent", agentRouter);
app.use("/api", healthRoutes);
app.use("/api", opsRoutes);
app.use("/api/events", eventsRouter);
app.use("/api/webhooks/n8n", webhooksRouter);

if (!isDev) {
  const clientDist = path.join(__dirname, "dist/client");
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
} else {
  app.get("/api/ping", (_req, res) => res.json({ ok: true, env: "dev" }));
}

app.listen(PORT, () => {
  console.log(`HD-OPERATIONS server running on port ${PORT}`);
});

export default app;
