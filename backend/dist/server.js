import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import paystackRouter from "./services/paystack.js";
import mpesaRouter from "./services/mpesa.js";
import smsRouter from "./services/sms.js";
import binanceRouter from "./services/binance.js";
import projectsRouter from "./routes/projects.js";
import uploadRouter from "./services/upload.js";
import emailRouter from "./services/email.js";
import logsRouter from "./routes/logs.js";
import { requestLogger } from "./middleware/requestLogger.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
const port = process.env.PORT || 8080;
const mongoUri = process.env.MONGODB_URI || "";
if (!mongoUri) {
    // eslint-disable-next-line no-console
    console.warn("MONGODB_URI is not set. Skipping DB connection.");
}
else {
    mongoose
        .connect(mongoUri)
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.error("MongoDB connection error", err));
}
app.get("/health", (_req, res) => {
    res.json({ ok: true, uptime: process.uptime() });
});
app.use("/api/paystack", paystackRouter);
app.use("/api/mpesa", mpesaRouter);
app.use("/api/sms", smsRouter);
app.use("/api/binance", binanceRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/email", emailRouter);
app.use("/api/logs", logsRouter);
app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
});
