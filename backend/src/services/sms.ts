import { Router } from "express";
import africastalking from "africastalking";

const router = Router();

router.post("/send", async (req, res) => {
	try {
		const { to, message } = req.body || {};
		const username = process.env.AT_USERNAME;
		const apiKey = process.env.AT_API_KEY;
		if (!username || !apiKey) return res.status(500).json({ error: "Missing Africa's Talking creds" });
		
		// Format phone number for Africa's Talking
		let formattedTo = to;
		if (to.startsWith('254')) {
			formattedTo = '+' + to;
		} else if (to.startsWith('+254')) {
			formattedTo = to;
		} else if (to.startsWith('0')) {
			formattedTo = '+254' + to.substring(1);
		} else {
			formattedTo = '+254' + to;
		}

		console.log("SMS Send Request:", {
			originalTo: to,
			formattedTo,
			message: message.substring(0, 50) + '...',
			username
		});

		const at = africastalking({ username, apiKey });
		const results = await at.SMS.send({ 
			to: formattedTo, 
			message, 
			from: process.env.AT_SENDER_ID
		});
		return res.json(results);
	} catch (err: any) {
		console.error("SMS Send Error:", err);
		return res.status(400).json({ 
			error: err?.message || "SMS error",
			details: err?.response?.data || err
		});
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
	} catch (err: any) {
		console.error("SMS Delivery Report Error:", err);
		return res.status(400).json({ error: err?.message || "Delivery report error" });
	}
});

// SMS Subscription Callback (for shortcode 4700 and Sportstips keyword)
router.post("/subscription", async (req, res) => {
	try {
		const { 
			phoneNumber, 
			shortCode, 
			keyword, 
			updateType, 
			date, 
			linkId 
		} = req.body || {};

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
	} catch (err: any) {
		console.error("SMS Subscription Callback Error:", err);
		return res.status(400).json({ error: err?.message || "Subscription callback error" });
	}
});

// Send SMS to subscribers (bulk SMS to all Sportstips subscribers)
router.post("/send-to-subscribers", async (req, res) => {
	try {
		const { message, phoneNumbers } = req.body || {};
		const username = process.env.AT_USERNAME;
		const apiKey = process.env.AT_API_KEY;
		const shortCode = process.env.AT_SHORTCODE;
		const keyword = process.env.AT_KEYWORD;

		if (!username || !apiKey || !shortCode || !keyword) {
			return res.status(500).json({ error: "Missing Africa's Talking configuration" });
		}

		if (!message) {
			return res.status(400).json({ error: "Message is required" });
		}

		const at = africastalking({ username, apiKey });
		
		// If phoneNumbers array is provided, send to those numbers
		// Otherwise, this is a placeholder for bulk messaging
		if (phoneNumbers && Array.isArray(phoneNumbers) && phoneNumbers.length > 0) {
			// Format phone numbers for Africa's Talking
			const formattedPhoneNumbers = phoneNumbers.map(phone => {
				if (phone.startsWith('254')) {
					return '+' + phone;
				} else if (phone.startsWith('+254')) {
					return phone;
				} else if (phone.startsWith('0')) {
					return '+254' + phone.substring(1);
				} else {
					return '+254' + phone;
				}
			});

			console.log("Bulk SMS Request:", {
				originalNumbers: phoneNumbers,
				formattedNumbers: formattedPhoneNumbers,
				message: `${keyword} ${message}`.substring(0, 50) + '...'
			});

			// Send to specific phone numbers
			const results = await at.SMS.send({
				to: formattedPhoneNumbers,
				message: `${keyword} ${message}`,
				from: process.env.AT_SENDER_ID
			});

			return res.json({
				success: true,
				message: "SMS sent to specified subscribers",
				data: results
			});
		} else {
			// For now, return a message indicating that bulk SMS to all subscribers
			// requires a list of phone numbers or integration with Africa's Talking's
			// subscription management system
			return res.json({
				success: false,
				message: "Bulk SMS to all subscribers requires phone numbers list",
				note: "To send to all Sportstips subscribers, you need to provide a phoneNumbers array or integrate with Africa's Talking subscription management",
				suggestion: "Use the regular /send endpoint with a list of phone numbers"
			});
		}
	} catch (err: any) {
		console.error("Bulk SMS Error:", err);
		return res.status(400).json({ 
			error: err?.message || "Bulk SMS error",
			details: err?.response?.data || err
		});
	}
});

export default router;
