import { Router } from "express";
import Log from "../models/Log.js";

const router = Router();

router.get("/", async (req, res) => {
  const { page = "1", pageSize = "20", method, path } = req.query as Record<string, string>;
  const pageNum = Math.max(1, parseInt(page));
  const sizeNum = Math.min(100, Math.max(1, parseInt(pageSize)));
  const filter: Record<string, any> = {};
  if (method) filter.method = method.toUpperCase();
  if (path) filter.path = { $regex: path, $options: "i" };

  const [items, total] = await Promise.all([
    Log.find(filter)
      .sort({ _id: -1 })
      .skip((pageNum - 1) * sizeNum)
      .limit(sizeNum)
      .lean(),
    Log.countDocuments(filter),
  ]);

  res.json({ items, total, page: pageNum, pageSize: sizeNum });
});

router.delete("/:id", async (req, res) => {
  await Log.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

router.delete("/", async (_req, res) => {
  await Log.deleteMany({});
  res.json({ ok: true });
});

export default router;


