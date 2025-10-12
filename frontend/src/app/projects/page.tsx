import Thumbnail from "@/components/Thumbnail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Projects - Software Development Portfolio",
  description: "Complete collection of software development projects including e-commerce platforms, service delivery systems, real-time chat applications, payment gateways, analytics dashboards, and more. Built with modern web technologies.",
  keywords: [
    "software projects",
    "web development portfolio",
    "e-commerce applications",
    "service delivery platforms",
    "chat applications",
    "payment gateways",
    "analytics dashboards",
    "Next.js projects",
    "TypeScript development",
    "React applications"
  ],
  openGraph: {
    title: "All Projects - Software Development Portfolio",
    description: "Complete collection of software development projects including e-commerce platforms, service delivery systems, real-time chat applications, payment gateways, analytics dashboards, and more.",
    type: "website",
    url: "https://maishatech.co.ke/projects",
  },
};

const projects = [
  { 
    name: "CyberTech Security Scanner", 
    href: "https://cybertech-security-scanner.fly.dev", 
    category: "Security",
    description: "Professional security scanning and vulnerability assessment tool for modern web applications. Features vulnerability scanning, SSL/TLS analysis, port scanning, security headers analysis, password security checks, and database security assessments with detailed PDF reports.",
    technologies: ["React", "Node.js", "Security", "SSL/TLS", "PDF Reports"]
  },
  { 
    name: "School App", 
    href: "https://frontend-still-paper-8364.fly.dev/", 
    category: "Education",
    description: "Complete school management system for educational institutions, featuring student enrollment, attendance tracking, grade management, class scheduling, parent-teacher communication, and administrative tools for efficient school operations.",
    technologies: ["Next.js", "TypeScript", "MongoDB", "Real-time", "Dashboard"]
  },
  { 
    name: "E‑Commerce Platform", 
    href: "https://myduka-beta.vercel.app", 
    category: "Commerce",
    description: "Full-stack e-commerce with cart, checkout, payments, and admin dashboard. Built with Next.js, TypeScript, MongoDB, and Stripe integration.",
    technologies: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Tailwind CSS"]
  },
  { 
    name: "Service Delivery Platform", 
    href: "https://saka-kazi.vercel.app", 
    category: "Services",
    description: "On-demand service booking system with real-time tracking, geolocation, and automated matching. Features React, Node.js, and WebSocket integration.",
    technologies: ["React", "Node.js", "WebSocket", "MongoDB", "Google Maps API"]
  },
  { 
    name: "Teen Chat Room", 
    href: "https://teenzoom2-mvp.up.railway.app", 
    category: "Social",
    description: "Secure real-time chat application with content moderation, user authentication, and safety features. Built with Socket.io, Express.js, and MongoDB.",
    technologies: ["Socket.io", "Express.js", "MongoDB", "React", "JWT"]
  },
  { 
    name: "Water Delivery System", 
    href: "https://watermajifrontend-production.up.railway.app", 
    category: "Services",
    description: "On-demand water delivery platform with GPS tracking, payment integration, and driver management. Features React Native, Node.js, and M-Pesa integration.",
    technologies: ["React Native", "Node.js", "M-Pesa", "GPS", "MongoDB"]
  },
  { 
    name: "Crypto Trading Bot", 
    href: "https://trade-machine.vercel.app", 
    category: "FinTech",
    description: "AI-powered cryptocurrency trading assistant with automated strategies, real-time market analysis, and portfolio management. Built with Python, React, and WebSocket APIs.",
    technologies: ["Python", "React", "WebSocket", "AI/ML", "Binance API"]
  },
  { 
    name: "Payment Gateway", 
    href: "https://gatenjia-frontend-production.up.railway.app", 
    category: "Payments",
    description: "Multi-rail payment processing system supporting Paystack, M-Pesa, and international cards. Features React, Node.js, and comprehensive payment analytics.",
    technologies: ["React", "Node.js", "Paystack", "M-Pesa", "Analytics"]
  },
  { 
    name: "USSD Content Platform", 
    href: "https://ussd-autopay.vercel.app", 
    category: "Content",
    description: "USSD-based content delivery system with autopay integration for mobile users. Built with Node.js, Africa's Talking API, and MySQL database.",
    technologies: ["Node.js", "Africa's Talking", "MySQL", "USSD", "Mobile Payments"]
  },
  { 
    name: "Events & Ticketing", 
    href: "https://myduka-beta.vercel.app", 
    category: "Events",
    description: "Event management platform with ticketing, RSVP, payment processing, and attendee management. Features Next.js, TypeScript, and real-time updates.",
    technologies: ["Next.js", "TypeScript", "Real-time", "Payments", "MongoDB"]
  },
];

export default function ProjectsPage() {
  return (
    <main className="px-4 sm:px-6 py-10">
      <h1 className="text-2xl sm:text-3xl font-semibold">All Projects</h1>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => {
            const thumb = `https://api.microlink.io/?url=${encodeURIComponent(p.href)}&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=5000&waitUntil=networkidle0`;
            return (
              <article key={`${p.href}-${p.name}`} className="group rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all bg-white dark:bg-neutral-950">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label={`View ${p.name} project`}
                >
                  <div className="aspect-[16/10] bg-neutral-100 dark:bg-neutral-900 overflow-hidden relative">
                    <Thumbnail
                      src={thumb}
                      alt={`${p.name} thumbnail`}
                      projectName={p.name}
                      category={p.category}
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                  <div className="p-4">
                    <div className="text-xs uppercase tracking-wide opacity-60 mb-2">{p.category}</div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald-600 transition-colors">{p.name}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-3">{p.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {p.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-full">
                          {tech}
                        </span>
                      ))}
                      {p.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-full">
                          +{p.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-emerald-600 font-medium group-hover:text-emerald-700">
                      View Project →
                    </div>
                  </div>
                </a>
              </article>
            );
          })}
      </div>
    </main>
  );
}


