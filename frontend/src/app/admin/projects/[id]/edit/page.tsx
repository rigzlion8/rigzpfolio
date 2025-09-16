"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  _id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  cover: string;
  technologies?: string;
  githubUrl?: string;
  liveUrl?: string;
  isPublished: boolean;
  order: number;
}

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    category: "e-commerce",
    cover: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
    isPublished: false,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const resolvedParams = await params;
        const response = await fetch(`/api/projects/${resolvedParams.id}`);
        if (response.ok) {
          const projectData = await response.json();
          setProject(projectData);
          setFormData({
            name: projectData.name || "",
            tagline: projectData.tagline || "",
            description: projectData.description || "",
            category: projectData.category || "e-commerce",
            cover: projectData.cover || "",
            technologies: projectData.technologies || "",
            githubUrl: projectData.githubUrl || "",
            liveUrl: projectData.liveUrl || "",
            isPublished: projectData.isPublished || false,
          });
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    if (status === "authenticated") {
      fetchProject();
    }
  }, [status, params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resolvedParams = await params;
      const response = await fetch(`/api/projects/${resolvedParams.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin");
      } else {
        console.error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (status === "loading") {
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

  if (!project) {
    return (
      <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📁</div>
          <h3 className="text-lg font-medium mb-2">Project not found</h3>
          <p className="text-neutral-600 dark:text-neutral-300 mb-4">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/admin"
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <header className="px-4 sm:px-6 py-5 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500" />
          <span className="font-semibold">MaishaTech Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700"
              />
            )}
            <span className="text-sm opacity-70">{session.user?.name}</span>
          </div>
          <Link
            href="/admin"
            className="px-3 py-1.5 text-sm rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            ← Back to Projects
          </Link>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-8 max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-8">Edit Project</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Project Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-neutral-900"
              placeholder="Enter project name"
            />
          </div>

          <div>
            <label htmlFor="tagline" className="block text-sm font-medium mb-2">
              Tagline
            </label>
            <input
              type="text"
              id="tagline"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-neutral-900"
              placeholder="Brief description of the project"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-neutral-900"
              placeholder="Detailed description of the project"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-neutral-900"
            >
              <option value="e-commerce">E-commerce</option>
              <option value="service-delivery">Service Delivery</option>
              <option value="teen-chat-room">Teen Chat Room</option>
              <option value="crypto-ai">Crypto & AI</option>
              <option value="payment-gateway">Payment Gateway</option>
              <option value="content-creators">Content Creators</option>
            </select>
          </div>

          <div>
            <label htmlFor="cover" className="block text-sm font-medium mb-2">
              Cover URL
            </label>
            <input
              type="url"
              id="cover"
              name="cover"
              value={formData.cover}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-neutral-900"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label htmlFor="technologies" className="block text-sm font-medium mb-2">
              Technologies Used
            </label>
            <input
              type="text"
              id="technologies"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-neutral-900"
              placeholder="Next.js, React, TypeScript, MongoDB"
            />
            <p className="text-xs text-neutral-500 mt-1">Separate technologies with commas</p>
          </div>

          <div>
            <label htmlFor="githubUrl" className="block text-sm font-medium mb-2">
              GitHub Repository URL
            </label>
            <input
              type="url"
              id="githubUrl"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-neutral-900"
              placeholder="https://github.com/username/repository"
            />
          </div>

          <div>
            <label htmlFor="liveUrl" className="block text-sm font-medium mb-2">
              Live Project URL
            </label>
            <input
              type="url"
              id="liveUrl"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-neutral-900"
              placeholder="https://your-project.com"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-neutral-300 rounded"
            />
            <label htmlFor="isPublished" className="ml-2 block text-sm">
              Publish immediately
            </label>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Project"}
            </button>
            <Link
              href="/admin"
              className="px-6 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
