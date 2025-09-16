import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact - Rigz Lion | Software Developer",
  description: "Get in touch with Rigz Lion, a passionate software developer specializing in Next.js, React, and full-stack web applications. Connect via LinkedIn, GitHub, or email.",
  keywords: [
    "contact",
    "software developer",
    "Rigz Lion",
    "LinkedIn",
    "GitHub",
    "portfolio",
    "web development",
    "Next.js",
    "React",
    "Kenya developer"
  ],
  openGraph: {
    title: "Contact - Rigz Lion | Software Developer",
    description: "Get in touch with Rigz Lion, a passionate software developer specializing in Next.js, React, and full-stack web applications.",
    type: "website",
  },
};

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/rigz-lion",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    name: "GitHub",
    url: "https://github.com/rigz-lion",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    color: "bg-gray-900 hover:bg-gray-800",
  },
  {
    name: "Email",
    url: "mailto:rigz@maishatech.co.ke",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    name: "Portfolio",
    url: "https://maishatech.co.ke",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
      </svg>
    ),
    color: "bg-cyan-600 hover:bg-cyan-700",
  },
];

const skills = [
  "Next.js & React",
  "TypeScript",
  "Node.js & Express",
  "MongoDB & Mongoose",
  "Tailwind CSS",
  "Payment Integration",
  "OAuth & Authentication",
  "Cloud Deployment",
  "API Development",
  "Mobile-First Design"
];

export default function ContactPage() {
  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      {/* Header */}
      <header className="px-4 sm:px-6 py-5 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500" />
          <span className="font-semibold text-xl">MaishaTech</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-5 text-sm">
          <Link href="/" className="opacity-80 hover:opacity-100">Home</Link>
          <Link href="/projects" className="opacity-80 hover:opacity-100">Projects</Link>
          <Link href="/contact" className="opacity-100 font-medium">Contact</Link>
          <Link href="/signin" className="px-3 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black">Sign in</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-12 max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Let&apos;s Build Something
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent"> Amazing</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
            I&apos;m Rigz Lion, a passionate software developer specializing in modern web technologies. 
            Let&apos;s connect and discuss your next project!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Social Links */}
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6">Connect With Me</h2>
            <div className="space-y-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-xl text-white transition-colors ${link.color}`}
                >
                  {link.icon}
                  <span className="font-medium">{link.name}</span>
                  <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6">Quick Info</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-2">Location</h3>
                <p className="text-neutral-600 dark:text-neutral-300">Nairobi, Kenya</p>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Availability</h3>
                <p className="text-neutral-600 dark:text-neutral-300">Open to new opportunities</p>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Response Time</h3>
                <p className="text-neutral-600 dark:text-neutral-300">Usually within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Technical Skills</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let&apos;s discuss how we can bring your ideas to life with cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:rigz@maishatech.co.ke"
              className="px-8 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Send Email
            </a>
            <a
              href="https://linkedin.com/in/rigz-lion"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 sm:px-6 py-8 border-t border-neutral-200 dark:border-neutral-800 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-neutral-600 dark:text-neutral-300">
            © 2024 MaishaTech. Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
