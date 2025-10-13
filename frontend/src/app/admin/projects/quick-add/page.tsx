"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function QuickAddProjectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    url: "",
    description: "",
    category: "web-app",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const extractProjectName = (url: string) => {
    try {
      const hostname = new URL(url).hostname;
      const name = hostname.split('.')[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    } catch {
      return "New Project";
    }
  };

  const generateSlug = (url: string) => {
    try {
      const hostname = new URL(url).hostname;
      return hostname.split('.')[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
    } catch {
      return `project-${Date.now()}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const projectName = extractProjectName(formData.url);
      const slug = generateSlug(formData.url);

      const projectData = {
        slug,
        name: projectName,
        tagline: formData.description.substring(0, 100),
        description: formData.description,
        category: formData.category,
        cover: formData.url,
        liveUrl: formData.url,
        isPublished: true,
      };

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        router.push("/admin");
      } else {
        console.error("Failed to create project");
        alert("Failed to create project. Please try again.");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Error creating project. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
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
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Quick Add Project</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Simply enter a URL and description. We'll automatically generate the project name, slug, and screenshot.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="url" className="block text-sm font-medium mb-2">
              Project URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-neutral-900"
              placeholder="https://your-project.com"
            />
            <p className="text-xs text-neutral-500 mt-1">
              The live URL of your project. We'll use this to capture a screenshot automatically.
            </p>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-neutral-900"
              placeholder="A comprehensive description of what your project does, its key features, and technologies used..."
            />
            <p className="text-xs text-neutral-500 mt-1">
              Provide a detailed description. The first 100 characters will be used as the tagline.
            </p>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-neutral-900"
            >
              <option value="web-app">Web App</option>
              <option value="e-commerce">E-commerce</option>
              <option value="service-delivery">Service Delivery</option>
              <option value="security">Security</option>
              <option value="education">Education</option>
              <option value="marketplace">Marketplace</option>
              <option value="teen-chat-room">Chat/Social</option>
              <option value="crypto-ai">Crypto & AI</option>
              <option value="payment-gateway">Payment Gateway</option>
              <option value="content-creators">Content Platform</option>
            </select>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-2 text-blue-900 dark:text-blue-100">
              📸 Screenshot Preview
            </h3>
            <p className="text-xs text-blue-800 dark:text-blue-200">
              After submission, the project will automatically have a screenshot generated from the URL you provided. 
              If the screenshot fails to load, a beautiful gradient thumbnail with your project name will be displayed instead.
            </p>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Adding Project..." : "Add Project"}
            </button>
            <Link
              href="/admin"
              className="px-6 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}

