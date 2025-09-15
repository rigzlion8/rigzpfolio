import { Router } from "express";
import { Resend } from "resend";
const router = Router();
router.post("/send", async (req, res) => {
    try {
        const { to, subject, html } = req.body || {};
        const apiKey = process.env.RESEND_API_KEY;
        const from = process.env.RESEND_FROM || "MaishaTech <noreply@maishatech.co.ke>";
        if (!apiKey)
            return res.status(500).json({ error: "Missing RESEND_API_KEY" });
        const resend = new Resend(apiKey);
        const resp = await resend.emails.send({ to, from, subject, html });
        return res.json(resp);
    }
    catch (err) {
        return res.status(400).json({ error: err?.message || "Email error" });
    }
});
export default router;
