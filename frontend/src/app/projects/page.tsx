import Link from "next/link";

const projects = [
  { slug: "ecommerce", name: "E‑Commerce" },
  { slug: "service-delivery", name: "Service Delivery" },
  { slug: "teen-chat", name: "Teen Chat Room" },
  { slug: "learning", name: "Learning Portal" },
  { slug: "events", name: "Events & Tickets" },
  { slug: "blog", name: "Content Hub" },
  { slug: "analytics", name: "Analytics Dashboard" },
  { slug: "gallery", name: "Media Gallery" },
];

export default function ProjectsPage() {
  return (
    <main className="px-4 sm:px-6 py-10">
      <h1 className="text-2xl sm:text-3xl font-semibold">All Projects</h1>
      <div className="mt-6 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="group rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:shadow-sm transition-shadow p-4"
          >
            <div className="font-medium">{p.name}</div>
            <div className="text-sm opacity-70">View details →</div>
          </Link>
        ))}
      </div>
    </main>
  );
}


