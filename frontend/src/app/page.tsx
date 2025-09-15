import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";

type ExternalProject = {
  name: string;
  tagline: string;
  category: string;
  href: string;
};

const projects: ExternalProject[] = [
  { name: "E‑Commerce", tagline: "Shop with cart & checkout", category: "Commerce", href: "https://myduka-beta.vercel.app" },
  { name: "Service Delivery", tagline: "Bookings, quotes, jobs", category: "Services", href: "https://saka-kazi.vercel.app" },
  { name: "Teen Chat Room", tagline: "Realtime chat with safety", category: "Social", href: "https://teenzoom2-mvp.up.railway.app" },
  { name: "Service Delivery (Water Maji)", tagline: "On‑demand water delivery", category: "Services", href: "https://watermajifrontend-production.up.railway.app" },
  { name: "Crypto & AI Bot Trading", tagline: "Automated trading assistant", category: "FinTech", href: "https://trade-machine.vercel.app" },
  { name: "Payment Gateway", tagline: "Multi‑rails payments demo", category: "Payments", href: "https://gatenjia-frontend-production.up.railway.app" },
  { name: "Content Creators USSD", tagline: "USSD & autopay flows", category: "Content", href: "https://ussd-autopay.vercel.app" },
  { name: "Events & Tickets", tagline: "Host, RSVP, ticketing", category: "Events", href: "https://myduka-beta.vercel.app" },
];

export default function Home() {
  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <header className="px-4 sm:px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500" />
          <span className="font-semibold">MaishaTech</span>
        </div>
        <nav className="hidden sm:flex items-center gap-5 text-sm">
          <Link href="#projects" className="opacity-80 hover:opacity-100">Projects</Link>
          <Link href="#contact" className="opacity-80 hover:opacity-100">Contact</Link>
          <Link href="/signin" className="px-3 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black">Sign in</Link>
        </nav>
      </header>

      <main className="px-4 sm:px-6 pb-16">
        <section className="py-6 sm:py-10">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
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

        <section id="projects" className="mt-6 sm:mt-10">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg sm:text-2xl font-semibold">Featured Work</h2>
            <Link href="/projects" className="text-sm opacity-80 hover:opacity-100">View all</Link>
          </div>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((p) => {
              const thumb = `https://api.microlink.io/?url=${encodeURIComponent(p.href)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=960`;
              return (
                <a
                  key={`${p.href}-${p.name}`}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all bg-white dark:bg-neutral-950"
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
                    <div className="text-lg font-semibold mb-2">{p.name}</div>
                    <div className="text-sm opacity-70 line-clamp-2">{p.tagline}</div>
                  </div>
                </a>
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
