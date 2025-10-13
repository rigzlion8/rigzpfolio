import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Development Portfolio - Real Projects & Applications",
  description: "Explore 10+ production-ready applications including security scanners, education platforms, e-commerce platforms, service delivery systems, real-time chat applications, payment gateways, and analytics dashboards. Built with modern technologies like Next.js, TypeScript, and cloud-native architectures.",
  keywords: [
    "software developer portfolio",
    "web applications",
    "security scanner",
    "school management system",
    "e-commerce development",
    "service delivery platform",
    "chat application",
    "payment gateway",
    "analytics dashboard",
    "Next.js projects",
    "TypeScript development",
    "cloud applications",
    "full-stack developer",
    "Kenya software developer"
  ],
  openGraph: {
    title: "Software Development Portfolio - Real Projects & Applications",
    description: "Explore 10+ production-ready applications including security scanners, education platforms, e-commerce platforms, service delivery systems, real-time chat applications, payment gateways, and analytics dashboards.",
    type: "website",
    url: "https://maishatech.co.ke",
  },
  twitter: {
    title: "Software Development Portfolio - Real Projects & Applications",
    description: "Explore 10+ production-ready applications including security scanners, education platforms, e-commerce platforms, service delivery systems, real-time chat applications, payment gateways, and analytics dashboards.",
  },
};

type ExternalProject = {
  name: string;
  tagline: string;
  category: string;
  href: string;
};

const projects: ExternalProject[] = [
  { 
    name: "CyberTech Security Scanner", 
    tagline: "Professional security scanning and vulnerability assessment tool for modern web applications. Features vulnerability scanning, SSL/TLS analysis, port scanning, security headers analysis, and detailed PDF reports.", 
    category: "Security", 
    href: "https://cybertech-security-scanner.fly.dev" 
  },
  { 
    name: "School App", 
    tagline: "Complete school management system for educational institutions, featuring student enrollment, attendance tracking, grade management, class scheduling, and parent-teacher communication.", 
    category: "Education", 
    href: "https://frontend-still-paper-8364.fly.dev/" 
  },
  { 
    name: "AgriMarket", 
    tagline: "Digital marketplace connecting farmers with buyers, featuring product listings, pricing, inventory management, and direct communication between agricultural producers and consumers.", 
    category: "Marketplace", 
    href: "https://agrimarket.fly.dev/" 
  },
  { 
    name: "E‑Commerce Platform", 
    tagline: "Full-stack e-commerce with cart, checkout, payments, and admin dashboard. Built with Next.js, TypeScript, MongoDB, and Stripe integration.", 
    category: "Commerce", 
    href: "https://myduka-beta.vercel.app" 
  },
  { 
    name: "Service Delivery Platform", 
    tagline: "On-demand service booking system with real-time tracking, geolocation, and automated matching. Features React, Node.js, and WebSocket integration.", 
    category: "Services", 
    href: "https://saka-kazi.vercel.app" 
  },
  { 
    name: "Teen Chat Room", 
    tagline: "Secure real-time chat application with content moderation, user authentication, and safety features. Built with Socket.io, Express.js, and MongoDB.", 
    category: "Social", 
    href: "https://teenzoom2-mvp.up.railway.app" 
  },
  { 
    name: "Water Delivery System", 
    tagline: "On-demand water delivery platform with GPS tracking, payment integration, and driver management. Features React Native, Node.js, and M-Pesa integration.", 
    category: "Services", 
    href: "https://watermajifrontend-production.up.railway.app" 
  },
  { 
    name: "Crypto Trading Bot", 
    tagline: "AI-powered cryptocurrency trading assistant with automated strategies, real-time market analysis, and portfolio management. Built with Python, React, and WebSocket APIs.", 
    category: "FinTech", 
    href: "https://trade-machine.vercel.app" 
  },
  { 
    name: "Payment Gateway", 
    tagline: "Multi-rail payment processing system supporting Paystack, M-Pesa, and international cards. Features React, Node.js, and comprehensive payment analytics.", 
    category: "Payments", 
    href: "https://gatenjia-frontend-production.up.railway.app" 
  },
  { 
    name: "USSD Content Platform", 
    tagline: "USSD-based content delivery system with autopay integration for mobile users. Built with Node.js, Africa's Talking API, and MySQL database.", 
    category: "Content", 
    href: "https://ussd-autopay.vercel.app" 
  },
  { 
    name: "Events & Ticketing", 
    tagline: "Event management platform with ticketing, RSVP, payment processing, and attendee management. Features Next.js, TypeScript, and real-time updates.", 
    category: "Events", 
    href: "https://myduka-beta.vercel.app" 
  },
];

export default function Home() {
  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <header className="px-4 sm:px-6 py-5 flex items-center justify-between" role="banner">
        <Link href="/" className="flex items-center gap-2" aria-label="MaishaTech Home">
          <div className="size-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500" aria-hidden="true" />
          <span className="font-semibold">MaishaTech</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-5 text-sm" role="navigation" aria-label="Main navigation">
          <Link href="#projects" className="opacity-80 hover:opacity-100">Projects</Link>
          <Link href="/web-vitals" className="opacity-80 hover:opacity-100">Performance</Link>
          <Link href="/contact" className="opacity-80 hover:opacity-100">Contact</Link>
          <Link href="/signin" className="px-3 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black">Sign in</Link>
        </nav>
      </header>

      <main className="px-4 sm:px-6 pb-16" role="main">
        <section className="py-6 sm:py-10" aria-labelledby="hero-title">
          <h1 id="hero-title" className="text-3xl sm:text-5xl font-bold tracking-tight">
            Software that helps businesses grow
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-xl">
            Showcasing real products: commerce, services, chat, media, analytics and more.
            Built with Next.js, Tailwind CSS, and scalable cloud-native patterns.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <Link href="#projects" className="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm">
              Explore Projects
            </Link>
            <Link href="/payments" className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm">
              Payment Demo
            </Link>
            <Link href="/uploads" className="px-4 py-2 rounded-full bg-purple-600 text-white text-sm">
              Uploads Demo
            </Link>
            <Link href="/contact" className="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-sm">
              Get in touch
            </Link>
          </div>
        </section>

        <section id="projects" className="mt-6 sm:mt-10" aria-labelledby="projects-title">
          <div className="flex items-baseline justify-between">
            <h2 id="projects-title" className="text-lg sm:text-2xl font-semibold">Featured Work</h2>
            <Link href="/projects" className="text-sm opacity-80 hover:opacity-100">View all</Link>
          </div>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6" role="list" aria-label="Featured projects">
            {projects.map((p) => {
              const thumb = `https://api.microlink.io/?url=${encodeURIComponent(p.href)}&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=5000&waitUntil=networkidle0`;
              return (
                <article key={`${p.href}-${p.name}`} role="listitem" className="group rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all bg-white dark:bg-neutral-950">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    aria-label={`View ${p.name} project - ${p.tagline}`}
                  >
                  <div className="aspect-[16/10] bg-neutral-100 dark:bg-neutral-900 overflow-hidden relative">
                    <Thumbnail
                      src={thumb}
                      alt={`${p.name} thumbnail`}
                      projectName={p.name}
                      category={p.category}
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                    />
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                    <div className="p-4">
                      <div className="text-xs uppercase tracking-wide opacity-60 mb-1">{p.category}</div>
                      <h3 className="text-lg font-semibold mb-2">{p.name}</h3>
                      <p className="text-sm opacity-70 line-clamp-2">{p.tagline}</p>
                    </div>
                  </a>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer id="contact" className="px-4 sm:px-6 py-10 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-semibold">Let’s build something for Kenya</div>
            <div className="text-sm opacity-70">maishatech.co.ke · Nairobi</div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="mailto:hello@maishatech.co.ke" className="text-sm px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800">Email</Link>
            <Link href="/signin" className="text-sm px-3 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
