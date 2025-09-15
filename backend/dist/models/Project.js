import mongoose, { Schema } from "mongoose";
const ProjectSchema = new Schema({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    cover: { type: String, required: true },
    images: [{ type: String }],
    videos: [{ type: String }],
    technologies: [{ type: String }],
    features: [{ type: String }],
    liveUrl: { type: String },
    githubUrl: { type: String },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
}, { timestamps: true });
export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
