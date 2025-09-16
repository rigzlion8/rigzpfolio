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

export async function GET(request: NextRequest) {
  try {
    // In production, this would fetch from your backend API
    // const response = await fetch(`${process.env.BACKEND_URL}/api/projects`);
    // const projects = await response.json();
    
    return NextResponse.json(mockProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In production, this would create a project in your backend
    // const response = await fetch(`${process.env.BACKEND_URL}/api/projects`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(body)
    // });
    
    // For now, return a mock response
    const newProject = {
      _id: Date.now().toString(),
      ...body,
      isPublished: false,
      order: mockProjects.length + 1,
    };
    
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
