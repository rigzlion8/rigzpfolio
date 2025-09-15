"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export default function UploadsPage() {
  const [signature, setSignature] = useState<{
    signature: string;
    timestamp: number;
    folder: string;
  } | null>(null);
  const [folder, setFolder] = useState("maishatech");

  const getSignature = async () => {
    const res = await fetch(`${API_BASE}/api/upload/signature?folder=${folder}`);
    const data = await res.json();
    setSignature(data);
  };

  useEffect(() => {
    getSignature();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <header className="px-4 sm:px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500" />
          <span className="font-semibold">MaishaTech</span>
        </Link>
        <Link href="/" className="text-sm opacity-80 hover:opacity-100">← Back</Link>
      </header>

      <main className="px-4 sm:px-6 pb-16">
        <h1 className="text-2xl sm:text-3xl font-semibold">Cloudinary Upload Demo</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-2xl">
          This page fetches a signed payload from the backend so the browser can upload
          directly to Cloudinary without proxying files through the server.
        </p>

        <div className="mt-6 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Folder</label>
              <input
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={getSignature}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
              >
                Refresh Signature
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-sm opacity-70 mb-2">Signed Params</div>
            <pre className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(signature, null, 2)}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}


