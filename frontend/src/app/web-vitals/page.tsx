"use client";

import { useEffect, useState } from "react";
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

interface WebVitalMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  rating: "good" | "needs-improvement" | "poor";
  navigationType: string;
}

export default function WebVitalsPage() {
  const [metrics, setMetrics] = useState<WebVitalMetric[]>([]);

  useEffect(() => {
    const handleMetric = (metric: any) => {
      setMetrics(prev => [...prev, metric]);
    };

    // Measure Core Web Vitals
    getCLS(handleMetric);
    getFID(handleMetric);
    getFCP(handleMetric);
    getLCP(handleMetric);
    getTTFB(handleMetric);
  }, []);

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "good":
        return "text-green-600 bg-green-100";
      case "needs-improvement":
        return "text-yellow-600 bg-yellow-100";
      case "poor":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatValue = (name: string, value: number) => {
    if (name === "CLS") {
      return value.toFixed(3);
    }
    if (name === "FID" || name === "FCP" || name === "LCP" || name === "TTFB") {
      return `${Math.round(value)}ms`;
    }
    return value.toString();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Core Web Vitals Monitor</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Real-time performance metrics for your portfolio site
          </p>
        </header>

        <div className="grid gap-6">
          {/* Performance Overview */}
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
            <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">LCP</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Largest Contentful Paint
                </div>
                <div className="text-xs mt-1">
                  Good: &lt;2.5s | Needs Improvement: 2.5-4s | Poor: &gt;4s
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">FID</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  First Input Delay
                </div>
                <div className="text-xs mt-1">
                  Good: &lt;100ms | Needs Improvement: 100-300ms | Poor: &gt;300ms
                </div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">CLS</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Cumulative Layout Shift
                </div>
                <div className="text-xs mt-1">
                  Good: &lt;0.1 | Needs Improvement: 0.1-0.25 | Poor: &gt;0.25
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Table */}
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
            <h2 className="text-xl font-semibold mb-4">Live Metrics</h2>
            {metrics.length === 0 ? (
              <div className="text-center py-8 text-neutral-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                <p>Loading performance metrics...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <th className="text-left py-3 px-4 font-medium">Metric</th>
                      <th className="text-left py-3 px-4 font-medium">Value</th>
                      <th className="text-left py-3 px-4 font-medium">Rating</th>
                      <th className="text-left py-3 px-4 font-medium">Delta</th>
                      <th className="text-left py-3 px-4 font-medium">Navigation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.map((metric, index) => (
                      <tr key={index} className="border-b border-neutral-100 dark:border-neutral-800">
                        <td className="py-3 px-4 font-mono text-sm">{metric.name}</td>
                        <td className="py-3 px-4 font-mono text-sm">
                          {formatValue(metric.name, metric.value)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(metric.rating)}`}>
                            {metric.rating}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-sm">
                          {formatValue(metric.name, metric.delta)}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {metric.navigationType}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Performance Tips */}
          <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6">
            <h2 className="text-xl font-semibold mb-4 text-emerald-800 dark:text-emerald-200">
              Performance Optimization Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-medium mb-2">LCP Optimization</h3>
                <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
                  <li>• Optimize images with Next.js Image component</li>
                  <li>• Use WebP format for better compression</li>
                  <li>• Implement lazy loading for below-fold content</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">FID Optimization</h3>
                <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
                  <li>• Minimize JavaScript execution time</li>
                  <li>• Use code splitting and dynamic imports</li>
                  <li>• Optimize third-party scripts</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">CLS Optimization</h3>
                <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
                  <li>• Set explicit dimensions for images</li>
                  <li>• Avoid inserting content above existing content</li>
                  <li>• Use CSS transforms instead of changing layout properties</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">General Tips</h3>
                <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
                  <li>• Enable gzip compression</li>
                  <li>• Use a CDN for static assets</li>
                  <li>• Implement proper caching strategies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
