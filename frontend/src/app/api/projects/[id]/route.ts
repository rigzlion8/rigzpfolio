import { NextRequest, NextResponse } from "next/server";

// Mock data for now - in production this would come from your backend
const mockProjects = [
  {
    _id: "1",
    slug: "myduka-ecommerce",
    name: "MyDuka E-commerce",
    tagline: "Modern e-commerce platform for African businesses",
    description: "A comprehensive e-commerce solution built with Next.js, featuring inventory management, payment processing, and mobile-first design.",
    category: "e-commerce",
    cover: "https://myduka-beta.vercel.app",
    isPublished: true,
    order: 1,
  },
  {
    _id: "2",
    slug: "saka-kazi-service",
    name: "Saka Kazi Service Delivery",
    tagline: "On-demand service delivery platform",
    description: "A service delivery platform connecting customers with local service providers, featuring real-time tracking and secure payments.",
    category: "service-delivery",
    cover: "https://saka-kazi.vercel.app",
    isPublished: true,
    order: 2,
  },
  {
    _id: "3",
    slug: "teenzoom-chat",
    name: "TeenZoom Chat Room",
    tagline: "Safe teen chat platform with moderation",
    description: "A secure chat application designed specifically for teenagers, featuring content moderation, parental controls, and educational resources.",
    category: "teen-chat-room",
    cover: "https://teenzoom2-mvp.up.railway.app",
    isPublished: true,
    order: 3,
  },
  {
    _id: "4",
    slug: "watermaji-delivery",
    name: "WaterMaji Delivery",
    tagline: "Water delivery service management",
    description: "A specialized platform for water delivery services, featuring route optimization, customer management, and payment processing.",
    category: "service-delivery",
    cover: "https://watermajifrontend-production.up.railway.app",
    isPublished: true,
    order: 4,
  },
  {
    _id: "5",
    slug: "trade-machine-crypto",
    name: "Trade Machine Crypto & AI",
    tagline: "AI-powered cryptocurrency trading platform",
    description: "An advanced trading platform combining artificial intelligence with cryptocurrency markets, featuring automated trading strategies and real-time analytics.",
    category: "crypto-ai",
    cover: "https://trade-machine.vercel.app",
    isPublished: true,
    order: 5,
  },
  {
    _id: "6",
    slug: "gatenjia-payments",
    name: "Gatenjia Payment Gateway",
    tagline: "Multi-channel payment processing solution",
    description: "A comprehensive payment gateway supporting multiple payment methods including M-Pesa, bank transfers, and international cards.",
    category: "payment-gateway",
    cover: "https://gatenjia-frontend-production.up.railway.app",
    isPublished: true,
    order: 6,
  },
  {
    _id: "7",
    slug: "ussd-autopay",
    name: "USSD Autopay for Creators",
    tagline: "USSD-based payment system for content creators",
    description: "A USSD-based payment solution enabling content creators to monetize their work through mobile payments and subscription management.",
    category: "content-creators",
    cover: "https://ussd-autopay.vercel.app",
    isPublished: true,
    order: 7,
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = mockProjects.find(p => p._id === id);
    
    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // In production, this would update the project in your backend
    // const response = await fetch(`${process.env.BACKEND_URL}/api/projects/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(body)
    // });
    
    // For now, return a mock response
    const updatedProject = {
      _id: id,
      ...body,
    };
    
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // In production, this would delete the project from your backend
    // const response = await fetch(`${process.env.BACKEND_URL}/api/projects/${id}`, {
    //   method: 'DELETE'
    // });
    
    // For now, return a success response
    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
