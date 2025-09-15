"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

type Log = {
  _id: string;
  method: string;
  path: string;
  status: number;
  userAgent?: string;
  ip?: string;
  latencyMs: number;
  createdAt: string;
};

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [method, setMethod] = useState("");
  const [path, setPath] = useState("");
  const pageSize = 20;

  const fetchLogs = async () => {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    if (method) params.set("method", method);
    if (path) params.set("path", path);
    const res = await fetch(`${API_BASE}/api/logs?${params}`);
    const data = await res.json();
    setLogs(data.items || []);
    setTotal(data.total || 0);
  };

  useEffect(() => {
    fetchLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <header className="px-4 sm:px-6 py-5 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500" />
          <span className="font-semibold">Request Logs</span>
        </div>
        <Link href="/admin" className="text-sm opacity-80 hover:opacity-100">← Back to Admin</Link>
      </header>

      <main className="px-4 sm:px-6 py-6">
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input
              placeholder="Filter path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900"
            />
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900"
            >
              <option value="">All methods</option>
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
            <button onClick={() => { setPage(1); fetchLogs(); }} className="px-3 py-2 rounded-lg bg-emerald-600 text-white">Apply</button>
            <button onClick={() => { setMethod(""); setPath(""); setPage(1); fetchLogs(); }} className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800">Reset</button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-900">
              <tr>
                <th className="text-left p-3">Time</th>
                <th className="text-left p-3">Method</th>
                <th className="text-left p-3">Path</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Latency</th>
                <th className="text-left p-3">IP</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} className="border-t border-neutral-200 dark:border-neutral-800">
                  <td className="p-3 opacity-80">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="p-3 font-mono">{log.method}</td>
                  <td className="p-3 font-mono break-all">{log.path}</td>
                  <td className="p-3">{log.status}</td>
                  <td className="p-3">{log.latencyMs} ms</td>
                  <td className="p-3">{log.ip || "-"}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td className="p-6 text-center opacity-70" colSpan={6}>No logs yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm opacity-70">Page {page} of {totalPages}</div>
          <div className="flex gap-2">
            <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1.5 rounded border border-neutral-200 dark:border-neutral-800 disabled:opacity-50">Prev</button>
            <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="px-3 py-1.5 rounded border border-neutral-200 dark:border-neutral-800 disabled:opacity-50">Next</button>
          </div>
        </div>
      </main>
    </div>
  );
}


