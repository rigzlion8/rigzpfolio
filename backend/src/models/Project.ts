import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  cover: string;
  images: string[];
  videos: string[];
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  isPublished: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
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
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
