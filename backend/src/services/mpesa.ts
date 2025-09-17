import { Router } from "express";
import axios from "axios";

const router = Router();

router.post("/stk-push", async (req, res) => {
  try {
    const { phoneNumber, amount, reference, description } = req.body || {};
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
		const shortcode = process.env.MPESA_BUSINESS_SHORT_CODE;
    const passkey = process.env.MPESA_PASSKEY;
    const callbackUrl = process.env.MPESA_CALLBACK_URL;
    if (!consumerKey || !consumerSecret || !shortcode || !passkey || !callbackUrl) {
      return res.status(500).json({ error: "Missing Mpesa env vars" });
    }

    const authResp = await axios.get("https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
      auth: { username: consumerKey, password: consumerSecret },
    });
    const accessToken = authResp.data.access_token;

    const timestamp = new Date()
      .toISOString()
      .replace(/[-:TZ.]/g, "")
      .slice(0, 14);
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

    const payload = {
      BusinessShortCode: Number(shortcode),
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Number(amount),
      PartyA: phoneNumber,
      PartyB: Number(shortcode),
      PhoneNumber: phoneNumber,
      CallBackURL: callbackUrl,
      AccountReference: reference || "MaishaTech",
      TransactionDesc: description || "Payment",
    };

    const resp = await axios.post(
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return res.json(resp.data);
  } catch (err: any) {
    return res.status(400).json({ error: err?.response?.data || err?.message || "Mpesa error" });
  }
});

router.post("/callback", (_req, res) => {
  res.status(200).send("ok");
});

export default router;


