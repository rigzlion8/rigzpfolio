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
  const [subscriberData, setSubscriberData] = useState({
    message: "",
    phoneNumbers: "",
  });
  const [loading, setLoading] = useState("");
  const [results, setResults] = useState<{
    mpesa?: { data?: unknown; error?: unknown };
    paystack?: { data?: unknown; error?: unknown };
    sms?: { data?: unknown; error?: unknown };
    subscriber?: { data?: unknown; error?: unknown };
  }>({});

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
      setResults(prev => ({ ...prev, paystack: { data } }));
    } catch (err) {
      setResults(prev => ({ ...prev, paystack: { error: err } }));
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
      setResults(prev => ({ ...prev, mpesa: { data } }));
    } catch (err) {
      setResults(prev => ({ ...prev, mpesa: { error: err } }));
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
      setResults(prev => ({ ...prev, sms: { data } }));
    } catch (err) {
      setResults(prev => ({ ...prev, sms: { error: err } }));
    }
    setLoading("");
  };

  const handleSubscriberSms = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("subscriber");
    try {
      // Parse phone numbers if provided
      const phoneNumbers = subscriberData.phoneNumbers 
        ? subscriberData.phoneNumbers.split(',').map(num => num.trim())
        : undefined;

      const payload = {
        message: subscriberData.message,
        ...(phoneNumbers && { phoneNumbers })
      };

      const res = await fetch(`${API_BASE}/api/sms/send-to-subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResults(prev => ({ ...prev, subscriber: { data } }));
    } catch (err) {
      setResults(prev => ({ ...prev, subscriber: { error: err } }));
    }
    setLoading("");
  };

  const renderResult = (result: { data?: unknown; error?: unknown } | undefined, type: string) => {
    if (!result) return null;

    if (result.error) {
      return (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">{type} Error</h4>
          <pre className="text-xs text-red-600 dark:text-red-400 whitespace-pre-wrap">
            {JSON.stringify(result.error, null, 2)}
          </pre>
        </div>
      );
    }

    if (result.data) {
      return (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <h4 className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">{type} Success</h4>
          <pre className="text-xs text-green-600 dark:text-green-400 whitespace-pre-wrap">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      );
    }

    return null;
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
                {loading === "mpesa" ? "Check your phone..." : "Send STK Push"}
              </button>
            </form>
            {renderResult(results.mpesa, "M-Pesa")}
          </div>

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
            {renderResult(results.paystack, "Paystack")}
          </div>
        </div>

        {/* SMS */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
            <h2 className="text-lg font-semibold mb-4">SMS via Africa&apos;s Talking</h2>
            <form onSubmit={handleSms} className="space-y-4">
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
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
              >
                {loading === "sms" ? "Sending..." : "Send SMS"}
              </button>
            </form>
            {renderResult(results.sms, "SMS")}
          </div>

          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
            <h2 className="text-lg font-semibold mb-4">Send to Sportstips Subscribers</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
              Send SMS to subscribers. Provide phone numbers (comma-separated) or leave empty for instructions.
            </p>
            <form onSubmit={handleSubscriberSms} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Phone Numbers (Optional)</label>
                <input
                  type="text"
                  value={subscriberData.phoneNumbers}
                  onChange={(e) => setSubscriberData({ ...subscriberData, phoneNumbers: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900"
                  placeholder="254708374149, 254712345678, 254700000000"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  Comma-separated phone numbers. Leave empty to see instructions for bulk messaging.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  value={subscriberData.message}
                  onChange={(e) => setSubscriberData({ ...subscriberData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900"
                  placeholder="Today's sports tips: Arsenal vs Chelsea..."
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading === "subscriber"}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
              >
                {loading === "subscriber" ? "Sending..." : "Send to Subscribers"}
              </button>
            </form>
            {renderResult(results.subscriber, "Subscriber SMS")}
          </div>
        </div>

      </main>
    </div>
  );
}
