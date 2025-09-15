import Link from "next/link";

type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  cover: string;
};

const projects: Project[] = [
  { slug: "ecommerce", name: "E‑Commerce", tagline: "Modern shop with cart & checkout", category: "Commerce", cover: "/covers/ecommerce.jpg" },
  { slug: "service-delivery", name: "Service Delivery", tagline: "Bookings, quotes, and jobs", category: "Services", cover: "/covers/service.jpg" },
  { slug: "teen-chat", name: "Teen Chat Room", tagline: "Realtime chat with safety filters", category: "Social", cover: "/covers/chat.jpg" },
  { slug: "learning", name: "Learning Portal", tagline: "Courses, progress, certificates", category: "EdTech", cover: "/covers/learn.jpg" },
  { slug: "events", name: "Events & Tickets", tagline: "Host, RSVP, and ticketing", category: "Events", cover: "/covers/events.jpg" },
  { slug: "blog", name: "Content Hub", tagline: "MDX blog with search", category: "Content", cover: "/covers/blog.jpg" },
  { slug: "analytics", name: "Analytics Dashboard", tagline: "KPIs, charts, and alerts", category: "Data", cover: "/covers/analytics.jpg" },
  { slug: "gallery", name: "Media Gallery", tagline: "Photos & videos upload", category: "Media", cover: "/covers/gallery.jpg" },
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
          <div className="mt-4 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:shadow-sm transition-shadow"
              >
                <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-900" />
                <div className="p-3">
                  <div className="text-xs uppercase tracking-wide opacity-60">{p.category}</div>
                  <div className="mt-0.5 font-medium">{p.name}</div>
                  <div className="text-sm opacity-70 line-clamp-2">{p.tagline}</div>
                </div>
              </Link>
            ))}
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
