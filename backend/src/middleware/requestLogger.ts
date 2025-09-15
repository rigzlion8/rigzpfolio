import type { Request, Response, NextFunction } from "express";
import Log from "../models/Log.js";

export async function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const originalJson = res.json.bind(res);
  let responseBody: any;
  // capture response json body
  (res as any).json = (body: any) => {
    responseBody = body;
    return originalJson(body);
  };

  res.on("finish", async () => {
    try {
      const latencyMs = Date.now() - start;
      await Log.create({
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        userAgent: req.headers["user-agent"],
        ip: req.ip,
        latencyMs,
        requestBody: req.method !== "GET" ? req.body : undefined,
        responseBody,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to save log:", err);
    }
  });

  next();
}


