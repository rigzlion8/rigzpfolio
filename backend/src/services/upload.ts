import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";

const router = Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Generate a signed upload preset token (client can upload directly to Cloudinary)
router.get("/signature", (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = (req.query.folder as string) || "maishatech";
  const paramsToSign: Record<string, string | number> = { timestamp, folder };
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET as string
  );
  res.json({ timestamp, folder, signature, apiKey: process.env.CLOUDINARY_API_KEY });
});

export default router;


