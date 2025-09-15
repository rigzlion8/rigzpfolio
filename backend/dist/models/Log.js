import mongoose, { Schema } from "mongoose";
const LogSchema = new Schema({
    method: { type: String, required: true },
    path: { type: String, required: true },
    status: { type: Number, required: true },
    userAgent: { type: String },
    ip: { type: String },
    latencyMs: { type: Number, required: true },
    requestBody: { type: Schema.Types.Mixed },
    responseBody: { type: Schema.Types.Mixed },
}, { timestamps: { createdAt: true, updatedAt: false } });
export default mongoose.models.Log || mongoose.model("Log", LogSchema);
