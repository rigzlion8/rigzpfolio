import { Router } from "express";
import africastalking from "africastalking";
const router = Router();
router.post("/send", async (req, res) => {
    try {
        const { to, message } = req.body || {};
        const username = process.env.AT_USERNAME;
        const apiKey = process.env.AT_API_KEY;
        if (!username || !apiKey)
            return res.status(500).json({ error: "Missing Africa's Talking creds" });
        const at = africastalking({ username, apiKey });
        const results = await at.SMS.send({ to, message, from: process.env.AT_SENDER_ID });
        return res.json(results);
    }
    catch (err) {
        return res.status(400).json({ error: err?.message || "SMS error" });
    }
});
export default router;
