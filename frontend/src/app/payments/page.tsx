"use client";

import { useState } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export default function PaymentsPage() {
  const [paystackData, setPaystackData] = useState({
    email: "",
    amount: "",
    reference: "",
  });
  const [mpesaData, setMpesaData] = useState({
    phoneNumber: "",
    amount: "",
    reference: "",
    description: "",
  });
  const [smsData, setSmsData] = useState({
    to: "",
    message: "",
  });
  const [loading, setLoading] = useState("");
  const [result, setResult] = useState<{
    type: string;
    data?: unknown;
    error?: unknown;
  } | null>(null);

  const handlePaystack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("paystack");
    try {
      const res = await fetch(`${API_BASE}/api/paystack/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paystackData),
      });
      const data = await res.json();
      setResult({ type: "Paystack", data });
    } catch (err) {
      setResult({ type: "Paystack", error: err });
    }
    setLoading("");
  };

  const handleMpesa = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("mpesa");
    try {
      const res = await fetch(`${API_BASE}/api/mpesa/stk-push`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mpesaData),
      });
      const data = await res.json();
      setResult({ type: "M-Pesa", data });
    } catch (err) {
      setResult({ type: "M-Pesa", error: err });
    }
    setLoading("");
  };

  const handleSms = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("sms");
    try {
      const res = await fetch(`${API_BASE}/api/sms/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(smsData),
      });
      const data = await res.json();
      setResult({ type: "SMS", data });
    } catch (err) {
      setResult({ type: "SMS", error: err });
    }
    setLoading("");
  };

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
        <h1 className="text-2xl sm:text-3xl font-semibold">Payment Integrations Demo</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-300">
          Test Paystack, M-Pesa, and SMS functionality
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Paystack */}
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
            <h2 className="text-lg font-semibold mb-4">Paystack Payment</h2>
            <form onSubmit={handlePaystack} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={paystackData.email}
                  onChange={(e) => setPaystackData({ ...paystackData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900"
                  placeholder="customer@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount (KES)</label>
                <input
                  type="number"
                  value={paystackData.amount}
                  onChange={(e) => setPaystackData({ ...paystackData, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900"
                  placeholder="1000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Reference</label>
                <input
                  type="text"
                  value={paystackData.reference}
                  onChange={(e) => setPaystackData({ ...paystackData, reference: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900"
                  placeholder="order_123"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading === "paystack"}
                className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg disabled:opacity-50"
              >
                {loading === "paystack" ? "Processing..." : "Initialize Payment"}
              </button>
            </form>
          </div>

          {/* M-Pesa */}
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
            <h2 className="text-lg font-semibold mb-4">M-Pesa STK Push</h2>
            <form onSubmit={handleMpesa} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={mpesaData.phoneNumber}
                  onChange={(e) => setMpesaData({ ...mpesaData, phoneNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900"
                  placeholder="254712345678"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount (KES)</label>
                <input
                  type="number"
                  value={mpesaData.amount}
                  onChange={(e) => setMpesaData({ ...mpesaData, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900"
                  placeholder="100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Reference</label>
                <input
                  type="text"
                  value={mpesaData.reference}
                  onChange={(e) => setMpesaData({ ...mpesaData, reference: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900"
                  placeholder="order_123"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input
                  type="text"
                  value={mpesaData.description}
                  onChange={(e) => setMpesaData({ ...mpesaData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900"
                  placeholder="Payment for services"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading === "mpesa"}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
              >
                {loading === "mpesa" ? "Processing..." : "Send STK Push"}
              </button>
            </form>
          </div>
        </div>

        {/* SMS */}
        <div className="mt-8 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
          <h2 className="text-lg font-semibold mb-4">SMS via Africa&apos;s Talking</h2>
          <form onSubmit={handleSms} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                value={smsData.to}
                onChange={(e) => setSmsData({ ...smsData, to: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900"
                placeholder="254712345678"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                value={smsData.message}
                onChange={(e) => setSmsData({ ...smsData, message: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900"
                placeholder="Hello from MaishaTech!"
                rows={3}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading === "sms"}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              {loading === "sms" ? "Sending..." : "Send SMS"}
            </button>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
            <h3 className="text-lg font-semibold mb-4">Result: {result.type}</h3>
            <pre className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(result.error || result.data, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
