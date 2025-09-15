import { Router } from "express";
import Project from "../models/Project.js";

const router = Router();

// Get all published projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({ isPublished: true })
      .sort({ order: 1, createdAt: -1 })
      .select("-__v");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Get single project by slug
router.get("/:slug", async (req, res) => {
  try {
    const project = await Project.findOne({ 
      slug: req.params.slug, 
      isPublished: true 
    }).select("-__v");
    
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// Admin: Create project
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Project slug already exists" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// Admin: Update project
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    res.json(project);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Admin: Delete project
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

export default router;
