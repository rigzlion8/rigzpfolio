import Thumbnail from "@/components/Thumbnail";

const projects = [
  { name: "E‑Commerce", href: "https://myduka-beta.vercel.app", category: "Commerce" },
  { name: "Service Delivery", href: "https://saka-kazi.vercel.app", category: "Services" },
  { name: "Teen Chat Room", href: "https://teenzoom2-mvp.up.railway.app", category: "Social" },
  { name: "Service Delivery (Water Maji)", href: "https://watermajifrontend-production.up.railway.app", category: "Services" },
  { name: "Crypto & AI Bot Trading", href: "https://trade-machine.vercel.app", category: "FinTech" },
  { name: "Payment Gateway", href: "https://gatenjia-frontend-production.up.railway.app", category: "Payments" },
  { name: "Content Creators USSD", href: "https://ussd-autopay.vercel.app", category: "Content" },
  { name: "Events & Tickets", href: "https://myduka-beta.vercel.app", category: "Events" },
];

export default function ProjectsPage() {
  return (
    <main className="px-4 sm:px-6 py-10">
      <h1 className="text-2xl sm:text-3xl font-semibold">All Projects</h1>
      <div className="mt-6 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map((p) => {
          const thumb = `https://api.microlink.io/?url=${encodeURIComponent(p.href)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=960`;
          const local = `/thumbs/${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
          return (
            <a
              key={`${p.href}-${p.name}`}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all bg-white dark:bg-neutral-950"
            >
              <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 overflow-hidden relative">
                <Thumbnail
                  src={thumb}
                  fallbackSrc={local}
                  alt={`${p.name} thumbnail`}
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              <div className="p-3">
                <div className="text-xs uppercase tracking-wide opacity-60">{p.category}</div>
                <div className="mt-0.5 font-medium">{p.name}</div>
                <div className="text-sm opacity-70">Open ↗</div>
              </div>
            </a>
          );
        })}
      </div>
    </main>
  );
}


