import mongoose, { Document, Schema } from "mongoose";

export interface ILog extends Document {
  method: string;
  path: string;
  status: number;
  userAgent?: string;
  ip?: string;
  latencyMs: number;
  requestBody?: any;
  responseBody?: any;
  createdAt: Date;
}

const LogSchema = new Schema<ILog>(
  {
    method: { type: String, required: true },
    path: { type: String, required: true },
    status: { type: Number, required: true },
    userAgent: { type: String },
    ip: { type: String },
    latencyMs: { type: Number, required: true },
    requestBody: { type: Schema.Types.Mixed },
    responseBody: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.Log || mongoose.model<ILog>("Log", LogSchema);


