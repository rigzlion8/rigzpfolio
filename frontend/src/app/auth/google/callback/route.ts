import { NextRequest, NextResponse } from "next/server";

// Google OAuth Callback Handler
// This endpoint handles Google OAuth callbacks (though NextAuth handles this automatically)

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');
    
    console.log("Google OAuth Callback Received:", {
      code: code ? 'present' : 'missing',
      state: state ? 'present' : 'missing',
      error,
      timestamp: new Date().toISOString()
    });

    if (error) {
      console.error("Google OAuth Error:", error);
      return NextResponse.json({
        success: false,
        error: error,
        message: "Google OAuth authentication failed"
      });
    }

    if (!code) {
      return NextResponse.json({
        success: false,
        error: "missing_code",
        message: "Authorization code not provided"
      });
    }

    // Note: NextAuth.js automatically handles the OAuth flow
    // This endpoint is mainly for logging and debugging
    // The actual authentication is handled by NextAuth at /api/auth/callback/google
    
    return NextResponse.json({
      success: true,
      message: "Google OAuth callback received",
      data: {
        code: 'present',
        state: state ? 'present' : 'missing',
        processedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error("Google OAuth Callback Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "callback_processing_failed",
        message: "Failed to process Google OAuth callback" 
      },
      { status: 500 }
    );
  }
}

// Handle POST requests (if needed)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log("Google OAuth POST Callback:", {
      body,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: "Google OAuth POST callback received",
      data: body
    });

  } catch (error) {
    console.error("Google OAuth POST Callback Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "post_callback_processing_failed",
        message: "Failed to process Google OAuth POST callback" 
      },
      { status: 500 }
    );
  }
}
