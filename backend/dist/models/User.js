import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
}, { timestamps: true });
export default mongoose.models.User || mongoose.model("User", UserSchema);
