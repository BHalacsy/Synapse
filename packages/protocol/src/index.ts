import { z } from "zod";

// --- HTTP Schemas ---
export const HealthResponseSchema = z.object({
  status: z.literal("ok"),
  uptime: z.number().nonnegative(),
  timestamp: z.string().datetime(),
});
export type HealthResponse = z.infer<typeof HealthResponseSchema>;

// --- WebSocket Message Schemas ---
export const NodeRegisterMessageSchema = z.object({
  type: z.literal("node:register"),
  nodeId: z.string().min(1),
  capabilities: z.array(z.string()).default([]),
});
export type NodeRegisterMessage = z.infer<typeof NodeRegisterMessageSchema>;

export const NodeHeartbeatMessageSchema = z.object({
  type: z.literal("node:heartbeat"),
  nodeId: z.string().min(1),
  status: z.enum(["idle", "busy", "error"]),
});
export type NodeHeartbeatMessage = z.infer<typeof NodeHeartbeatMessageSchema>;

export const ServerTaskAssignMessageSchema = z.object({
  type: z.literal("server:task_assign"),
  taskId: z.string().min(1),
  action: z.string().min(1),
  payload: z.record(z.unknown()).default({}),
});
export type ServerTaskAssignMessage = z.infer<typeof ServerTaskAssignMessageSchema>;

export const WebSocketMessageSchema = z.discriminatedUnion("type", [
  NodeRegisterMessageSchema,
  NodeHeartbeatMessageSchema,
  ServerTaskAssignMessageSchema,
]);
export type WebSocketMessage = z.infer<typeof WebSocketMessageSchema>;
