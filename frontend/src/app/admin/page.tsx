"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Project {
  _id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  cover: string;
  isPublished: boolean;
  order: number;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
      return;
    }

    if (status === "authenticated") {
      fetchProjects();
    }
  }, [status, router]);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="size-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 mx-auto mb-4 animate-pulse" />
          <div className="text-sm opacity-70">Loading...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <header className="px-4 sm:px-6 py-5 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500" />
          <span className="font-semibold">MaishaTech Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm opacity-70">Welcome, {session.user?.name}</span>
          <button
            onClick={() => signOut()}
            className="px-3 py-1.5 text-sm rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold">Projects</h1>
          <Link
            href="/admin/projects/new"
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm"
          >
            Add Project
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-sm transition-shadow"
            >
              <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-900" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wide opacity-60">
                    {project.category}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      project.isPublished
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                    }`}
                  >
                    {project.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <h3 className="font-medium mb-1">{project.name}</h3>
                <p className="text-sm opacity-70 line-clamp-2 mb-3">{project.tagline}</p>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/projects/${project._id}/edit`}
                    className="px-3 py-1.5 text-xs rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="px-3 py-1.5 text-xs rounded-full bg-emerald-600 text-white"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📁</div>
            <h3 className="text-lg font-medium mb-2">No projects yet</h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              Get started by adding your first project
            </p>
            <Link
              href="/admin/projects/new"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
            >
              Add Project
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
