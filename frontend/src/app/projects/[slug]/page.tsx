import Link from "next/link";

const projectDetails = {
  ecommerce: {
    title: "E‑Commerce",
    description:
      "A full-featured commerce app with product catalog, cart, checkout, and payments.",
  },
  "service-delivery": {
    title: "Service Delivery",
    description:
      "Customers request services, get quotes, schedule jobs, and track completion.",
  },
  "teen-chat": {
    title: "Teen Chat Room",
    description:
      "Realtime chat with moderation, content filters, and safety-first features.",
  },
  learning: {
    title: "Learning Portal",
    description:
      "Courses with progress tracking, quizzes, and certificate issuance.",
  },
  events: {
    title: "Events & Tickets",
    description: "Create events, manage RSVPs, and sell digital tickets.",
  },
  blog: {
    title: "Content Hub",
    description: "MDX-powered blog with categories, tags, and search.",
  },
  analytics: {
    title: "Analytics Dashboard",
    description: "KPIs, charts, alerts, and scheduled email summaries.",
  },
  gallery: {
    title: "Media Gallery",
    description: "Upload and browse photos and videos with smart albums.",
  },
} as const;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: keyof typeof projectDetails }>;
}) {
  const { slug } = await params;
  const details = projectDetails[slug];

  return (
    <main className="px-4 sm:px-6 py-10">
      <Link href="/projects" className="text-sm opacity-80 hover:opacity-100">
        ← Back to projects
      </Link>
      <h1 className="mt-3 text-2xl sm:text-3xl font-semibold">{details.title}</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-2xl">
        {details.description}
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="aspect-video rounded-xl bg-neutral-100 dark:bg-neutral-900" />
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
          <div className="font-medium">Highlights</div>
          <ul className="mt-2 list-disc list-inside text-sm opacity-80">
            <li>Next.js App Router, Tailwind CSS</li>
            <li>Auth, payments, media uploads</li>
            <li>Cloud-ready, scalable architecture</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <Link href="#" className="px-3 py-1.5 text-sm rounded-full bg-emerald-600 text-white">
              Live demo
            </Link>
            <Link href="#" className="px-3 py-1.5 text-sm rounded-full border border-neutral-200 dark:border-neutral-800">
              Case study
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}


