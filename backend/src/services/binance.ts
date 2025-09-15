import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/ping", async (_req, res) => {
	try {
		const resp = await axios.get("https://api.binance.com/api/v3/ping");
		return res.json({ ok: true, data: resp.data });
	} catch (err: any) {
		return res.status(400).json({ error: err?.message || "Binance error" });
	}
});

export default router;
