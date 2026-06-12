import { NextFunction, Request, Response } from "express";

/**
 * HD-OPERATIONS audit log middleware stub.
 * TODO: Replace with real AuditEntry persistence to the audit DB (separate from operational DB).
 * Every mutation must produce an AuditEntry per HD-CORE contracts.
 */
export function auditLog(req: Request, _res: Response, next: NextFunction) {
  // Stub: log to console only — wire to audit DB in production
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    console.log(`[AUDIT STUB] HD-OPERATIONS ${req.method} ${req.path}`, {
      ip: req.ip,
      at: new Date().toISOString(),
    });
  }
  next();
}
