import { NextRequest, NextResponse } from "next/server";

// M-Pesa STK Push Callback Handler
// This endpoint receives payment notifications from M-Pesa

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log the incoming callback for debugging
    console.log("M-Pesa Callback Received:", {
      body,
      timestamp: new Date().toISOString(),
      headers: Object.fromEntries(request.headers.entries())
    });

    // M-Pesa callback structure
    const {
      Body: {
        stkCallback: {
          MerchantRequestID,
          CheckoutRequestID,
          ResultCode,
          ResultDesc,
          CallbackMetadata
        } = {}
      } = {}
    } = body;

    // Extract payment details from callback metadata
    const metadata = CallbackMetadata?.Item || [];
    const paymentDetails: Record<string, string | number> = {};
    
    metadata.forEach((item: { Name?: string; Value?: string | number }) => {
      if (item.Name && item.Value !== undefined) {
        paymentDetails[item.Name] = item.Value;
      }
    });

    console.log("M-Pesa Payment Details:", {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      paymentDetails,
      timestamp: new Date().toISOString()
    });

    // Handle different result codes
    switch (ResultCode) {
      case 0:
        console.log("M-Pesa Payment Successful:", {
          CheckoutRequestID,
          Amount: paymentDetails.Amount,
          MpesaReceiptNumber: paymentDetails.MpesaReceiptNumber,
          PhoneNumber: paymentDetails.PhoneNumber
        });
        
        // Here you can:
        // 1. Update payment status in your database
        // 2. Send confirmation email/SMS
        // 3. Trigger business logic for successful payment
        // 4. Send webhooks to other systems
        
        break;
        
      case 1:
        console.log("M-Pesa Payment Cancelled by User:", {
          CheckoutRequestID,
          ResultDesc
        });
        break;
        
      case 1032:
        console.log("M-Pesa Payment Cancelled by User:", {
          CheckoutRequestID,
          ResultDesc
        });
        break;
        
      default:
        console.log("M-Pesa Payment Failed:", {
          CheckoutRequestID,
          ResultCode,
          ResultDesc
        });
    }

    // Always return success to M-Pesa (they expect 200 OK)
    return NextResponse.json({
      ResultCode: 0,
      ResultDesc: "Success"
    });

  } catch (error) {
    console.error("M-Pesa Callback Error:", error);
    
    // Still return success to M-Pesa to avoid retries
    return NextResponse.json({
      ResultCode: 0,
      ResultDesc: "Success"
    });
  }
}

// Handle GET requests (for testing)
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const test = url.searchParams.get('test');
  
  if (test === 'success') {
    // Test successful payment callback
    const testData = {
      Body: {
        stkCallback: {
          MerchantRequestID: 'test_merchant_' + Date.now(),
          CheckoutRequestID: 'test_checkout_' + Date.now(),
          ResultCode: 0,
          ResultDesc: 'The service request is processed successfully.',
          CallbackMetadata: {
            Item: [
              { Name: 'Amount', Value: 100 },
              { Name: 'MpesaReceiptNumber', Value: 'test_receipt_' + Date.now() },
              { Name: 'Balance', Value: 0 },
              { Name: 'TransactionDate', Value: Date.now() },
              { Name: 'PhoneNumber', Value: '254708374149' }
            ]
          }
        }
      }
    };
    
    // Simulate the callback
    const { Body: { stkCallback: { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = {} } = {} } = testData;
    const metadata = CallbackMetadata?.Item || [];
    const paymentDetails: Record<string, string | number> = {};
    
    metadata.forEach((item: { Name?: string; Value?: string | number }) => {
      if (item.Name && item.Value !== undefined) {
        paymentDetails[item.Name] = item.Value;
      }
    });

    return NextResponse.json({
      success: true,
      message: "M-Pesa Test Callback Processed",
      data: {
        MerchantRequestID,
        CheckoutRequestID,
        ResultCode,
        ResultDesc,
        paymentDetails,
        processedAt: new Date().toISOString()
      }
    });
  }
  
  return NextResponse.json({
    success: true,
    message: "M-Pesa Callback Endpoint",
    endpoints: {
      test: "/auth/mpesa/callback?test=success"
    },
    timestamp: new Date().toISOString()
  });
}
