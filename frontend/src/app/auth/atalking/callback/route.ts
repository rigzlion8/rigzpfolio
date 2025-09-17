import { NextRequest, NextResponse } from "next/server";

// Africa's Talking SMS Callback Handler
// This endpoint receives delivery reports and subscription updates from Africa's Talking

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log the incoming callback for debugging
    console.log("Africa's Talking Callback Received:", {
      body,
      timestamp: new Date().toISOString(),
      headers: Object.fromEntries(request.headers.entries())
    });

    // Determine the type of callback based on the data structure
    if (body.requestId && body.status) {
      // This is a delivery report
      return handleDeliveryReport(body);
    } else if (body.phoneNumber && body.shortCode && body.keyword) {
      // This is a subscription callback
      return handleSubscriptionCallback(body);
    } else {
      // Unknown callback type
      console.warn("Unknown callback type received:", body);
      return NextResponse.json(
        { success: true, message: "Callback received but type unknown" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Africa's Talking Callback Error:", error);
    return NextResponse.json(
      { success: false, error: "Callback processing failed" },
      { status: 500 }
    );
  }
}

// Handle SMS Delivery Reports
async function handleDeliveryReport(data: {
  requestId?: string;
  status?: string;
  networkCode?: string;
  failureReason?: string | null;
}) {
  const { requestId, status, networkCode, failureReason } = data;
  
  console.log("SMS Delivery Report:", {
    requestId,
    status,
    networkCode,
    failureReason,
    timestamp: new Date().toISOString()
  });

  // Here you can:
  // 1. Save the delivery report to your database
  // 2. Update the SMS status in your system
  // 3. Trigger notifications or retry logic based on status
  // 4. Send webhooks to other systems

  // For now, we'll just log it and return success
  return NextResponse.json({
    success: true,
    message: "Delivery report processed",
    data: {
      requestId,
      status,
      processedAt: new Date().toISOString()
    }
  });
}

// Handle SMS Subscription Callbacks
async function handleSubscriptionCallback(data: {
  phoneNumber?: string;
  shortCode?: string;
  keyword?: string;
  updateType?: string;
  date?: string;
  linkId?: string;
}) {
  const { 
    phoneNumber, 
    shortCode, 
    keyword, 
    updateType, 
    date, 
    linkId 
  } = data;

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
      // Here you can:
      // 1. Add user to your subscription database
      // 2. Send welcome message
      // 3. Update user preferences
      // 4. Trigger marketing automation
      break;
      
    case "Deletion":
      console.log(`User ${phoneNumber} unsubscribed from ${keyword} on ${shortCode}`);
      // Here you can:
      // 1. Remove user from subscription database
      // 2. Send goodbye message
      // 3. Update user preferences
      // 4. Stop marketing automation
      break;
      
    default:
      console.log(`Unknown subscription update type: ${updateType}`);
  }

  // For now, we'll just log it and return success
  return NextResponse.json({
    success: true,
    message: "Subscription callback processed",
    data: {
      phoneNumber,
      shortCode,
      keyword,
      updateType,
      processedAt: new Date().toISOString()
    }
  });
}

// Handle GET requests (for testing)
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const test = url.searchParams.get('test');
  
  if (test === 'delivery') {
    // Test delivery report callback
    const testData = {
      requestId: 'test_' + Date.now(),
      status: 'Delivered',
      networkCode: '63902',
      failureReason: null
    };
    return handleDeliveryReport(testData);
  } else if (test === 'subscription') {
    // Test subscription callback
    const testData = {
      phoneNumber: '254708374149',
      shortCode: '4700',
      keyword: 'Sportstips',
      updateType: 'Addition',
      date: new Date().toISOString(),
      linkId: 'test_link_' + Date.now()
    };
    return handleSubscriptionCallback(testData);
  }
  
  return NextResponse.json({
    success: true,
    message: "Africa's Talking Callback Endpoint",
    endpoints: {
      delivery: "/auth/atalking/callback?test=delivery",
      subscription: "/auth/atalking/callback?test=subscription"
    },
    timestamp: new Date().toISOString()
  });
}
