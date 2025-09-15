import { Router } from "express";
import axios from "axios";
const router = Router();
router.post("/initialize", async (req, res) => {
    try {
        const { email, amount, reference, callback_url } = req.body || {};
        const secretKey = process.env.PAYSTACK_SECRET_KEY;
        if (!secretKey)
            return res.status(500).json({ error: "Missing PAYSTACK_SECRET_KEY" });
        const payload = { email, amount, reference, callback_url, currency: "KES" };
        const resp = await axios.post("https://api.paystack.co/transaction/initialize", payload, {
            headers: { Authorization: `Bearer ${secretKey}`, "Content-Type": "application/json" },
        });
        return res.json(resp.data);
    }
    catch (err) {
        return res.status(400).json({ error: err?.response?.data || err?.message || "Paystack error" });
    }
});
router.post("/webhook", async (req, res) => {
    // TODO: verify signature: x-paystack-signature
    res.status(200).send("ok");
});
export default router;
