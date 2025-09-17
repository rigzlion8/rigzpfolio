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
        const results = await at.SMS.send({
            to,
            message,
            from: process.env.AT_SENDER_ID
        });
        return res.json(results);
    }
    catch (err) {
        return res.status(400).json({ error: err?.message || "SMS error" });
    }
});
// SMS Delivery Reports Callback
router.post("/delivery-report", async (req, res) => {
    try {
        const { requestId, status, networkCode, failureReason } = req.body || {};
        console.log("SMS Delivery Report:", {
            requestId,
            status,
            networkCode,
            failureReason,
            timestamp: new Date().toISOString()
        });
        // Here you can save the delivery report to your database
        // or trigger any business logic based on the status
        return res.status(200).json({ success: true, message: "Delivery report received" });
    }
    catch (err) {
        console.error("SMS Delivery Report Error:", err);
        return res.status(400).json({ error: err?.message || "Delivery report error" });
    }
});
// SMS Subscription Callback (for shortcode 4700 and Sportstips keyword)
router.post("/subscription", async (req, res) => {
    try {
        const { phoneNumber, shortCode, keyword, updateType, date, linkId } = req.body || {};
        console.log("SMS Subscription Callback:", {
            phoneNumber,
            shortCode,
            keyword,
            updateType,
            date,
            linkId,
            timestamp: new Date().toISOString()
        });
        // Handle different subscription update types
        switch (updateType) {
            case "Addition":
                console.log(`User ${phoneNumber} subscribed to ${keyword} on ${shortCode}`);
                // Add user to subscription list
                break;
            case "Deletion":
                console.log(`User ${phoneNumber} unsubscribed from ${keyword} on ${shortCode}`);
                // Remove user from subscription list
                break;
            default:
                console.log(`Unknown subscription update type: ${updateType}`);
        }
        // Here you can save the subscription data to your database
        // and trigger any business logic
        return res.status(200).json({ success: true, message: "Subscription callback received" });
    }
    catch (err) {
        console.error("SMS Subscription Callback Error:", err);
        return res.status(400).json({ error: err?.message || "Subscription callback error" });
    }
});
// Send SMS to subscribers (bulk SMS to all Sportstips subscribers)
router.post("/send-to-subscribers", async (req, res) => {
    try {
        const { message } = req.body || {};
        const username = process.env.AT_USERNAME;
        const apiKey = process.env.AT_API_KEY;
        const shortCode = process.env.AT_SHORTCODE;
        const keyword = process.env.AT_KEYWORD;
        if (!username || !apiKey || !shortCode || !keyword) {
            return res.status(500).json({ error: "Missing Africa's Talking configuration" });
        }
        const at = africastalking({ username, apiKey });
        // Send to all subscribers of the Sportstips keyword
        const results = await at.SMS.send({
            to: `+${shortCode}`,
            message: `${keyword} ${message}`,
            from: process.env.AT_SENDER_ID
        });
        return res.json({
            success: true,
            message: "SMS sent to subscribers",
            data: results
        });
    }
    catch (err) {
        return res.status(400).json({ error: err?.message || "Bulk SMS error" });
    }
});
export default router;
