import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center px-4 bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <div className="text-center max-w-md">
        <div className="size-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-2">Page not found</h1>
        <p className="text-neutral-600 dark:text-neutral-300 mb-6">
          The page you’re looking for...your probably not going to find it.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/" className="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm">
            Go home
          </Link>
          <Link href="/projects" className="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-sm">
            Browse projects
          </Link>
        </div>
      </div>
    </div>
  );
}


