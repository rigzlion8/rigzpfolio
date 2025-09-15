import Log from "../models/Log.js";
export async function requestLogger(req, res, next) {
    const start = Date.now();
    const originalJson = res.json.bind(res);
    let responseBody;
    // capture response json body
    res.json = (body) => {
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
        }
        catch (err) {
            // eslint-disable-next-line no-console
            console.error("Failed to save log:", err);
        }
    });
    next();
}
