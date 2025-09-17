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

    // Validate required fields
    if (!phoneNumber || !amount) {
      return res.status(400).json({ error: "Phone number and amount are required" });
    }

    // Format phone number (remove +254 prefix if present, ensure it starts with 254)
    let formattedPhone = phoneNumber.replace(/^\+/, '').replace(/^0/, '254');
    if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone;
    }

    // Convert amount to cents (M-Pesa expects amount in cents)
    const amountInCents = Math.round(Number(amount) * 100);

    console.log("M-Pesa STK Push Request:", {
      originalPhone: phoneNumber,
      formattedPhone,
      originalAmount: amount,
      amountInCents,
      shortcode,
      reference,
      description
    });

    // Use sandbox endpoint for testing
    const authUrl = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    console.log("M-Pesa Auth URL:", authUrl);
    
    const authResp = await axios.get(authUrl, {
      auth: { username: consumerKey, password: consumerSecret },
    });
    const accessToken = authResp.data.access_token;
    console.log("M-Pesa Access Token:", accessToken ? "Received" : "Failed");

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
      Amount: amountInCents,
      PartyA: formattedPhone,
      PartyB: Number(shortcode),
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: reference || "MaishaTech",
      TransactionDesc: description || "Payment",
    };

    console.log("M-Pesa Payload:", payload);

    // Use sandbox endpoint for STK push
    const stkPushUrl = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    console.log("M-Pesa STK Push URL:", stkPushUrl);
    
    const resp = await axios.post(
      stkPushUrl,
      payload,
      { 
        headers: { 
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        } 
      }
    );
    
    console.log("M-Pesa Response:", resp.data);
    return res.json(resp.data);
  } catch (err: any) {
    console.error("M-Pesa Error Details:", {
      message: err?.message,
      status: err?.response?.status,
      statusText: err?.response?.statusText,
      responseData: err?.response?.data,
      responseHeaders: err?.response?.headers,
      config: {
        url: err?.config?.url,
        method: err?.config?.method,
        headers: err?.config?.headers
      }
    });
    
    // Return more detailed error information
    const errorResponse = {
      error: err?.response?.data || err?.message || "Mpesa error",
      status: err?.response?.status,
      statusText: err?.response?.statusText,
      details: err?.response?.data
    };
    
    return res.status(400).json(errorResponse);
  }
});

router.post("/callback", (_req, res) => {
  res.status(200).send("ok");
});

export default router;


