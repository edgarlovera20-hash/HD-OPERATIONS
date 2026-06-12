import { randomUUID } from "crypto";

export interface HdEventEnvelope<T = unknown> {
  eventId: string;
  eventName: string;
  version: string;
  correlationId: string;
  occurredAt: string;
  producer: string;         // platform name e.g. "HD-OPERATIONS"
  actor: { id: string; type: "user" | "service_principal" | "system" };
  payload: T;
}

const MAX_EVENTS = 100;
const eventLog: HdEventEnvelope[] = [];

export function emitEvent<T>(
  eventName: string,
  payload: T,
  producer: string,
  actor: HdEventEnvelope["actor"],
  correlationId?: string
): HdEventEnvelope<T> {
  const envelope: HdEventEnvelope<T> = {
    eventId: randomUUID(),
    eventName,
    version: "1.0",
    correlationId: correlationId ?? randomUUID(),
    occurredAt: new Date().toISOString(),
    producer,
    actor,
    payload,
  };
  eventLog.push(envelope as HdEventEnvelope);
  if (eventLog.length > MAX_EVENTS) eventLog.shift();
  console.log(
    `[EVENT] ${eventName} producer=${producer} correlationId=${envelope.correlationId} actor=${actor.id}(${actor.type})`
  );
  return envelope;
}

export function getRecentEvents(): HdEventEnvelope[] {
  return [...eventLog];
}
