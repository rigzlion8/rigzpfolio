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
} else {
  // Configure mongoose connection options
  const mongooseOptions = {
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    maxPoolSize: 10, // Maintain up to 10 socket connections
    minPoolSize: 5, // Maintain a minimum of 5 socket connections
    maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
    retryWrites: true,
    w: 'majority'
  };

  mongoose
    .connect(mongoUri, mongooseOptions)
    .then(() => {
      console.log("✅ MongoDB connected successfully");
      console.log(`📊 Database: ${mongoose.connection.db?.databaseName}`);
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err.message);
      console.error("🔧 Connection string format check:");
      console.error("   - Should start with 'mongodb://' or 'mongodb+srv://'");
      console.error("   - Should include username:password@host/database");
      console.error("   - Should include retryWrites=true&w=majority");
      
      // Don't exit the process, let the app run without DB
      console.warn("⚠️  Continuing without database connection...");
    });
}

app.get("/health", (_req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const dbStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({ 
    ok: true, 
    uptime: process.uptime(),
    database: {
      status: dbStates[dbStatus] || 'unknown',
      readyState: dbStatus
    },
    timestamp: new Date().toISOString()
  });
});

app.use("/api/paystack", paystackRouter);
app.use("/api/mpesa", mpesaRouter);
app.use("/api/sms", smsRouter);
app.use("/api/binance", binanceRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/email", emailRouter);
app.use("/api/logs", logsRouter);

const server = app.listen(port, () => {
  console.log(`🚀 Backend listening on http://localhost:${port}`);
  console.log(`🏥 Health check: http://localhost:${port}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Process terminated');
    mongoose.connection.close();
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Process terminated');
    mongoose.connection.close();
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  // Don't exit, let the process continue
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit, let the process continue
});


