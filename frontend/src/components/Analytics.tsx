"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default function Analytics() {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      // Track page views
      window.gtag("config", GA_TRACKING_ID, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, []);

  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  );
}

// Core Web Vitals monitoring
export function reportWebVitals(metric: any) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", metric.name, {
      event_category: "Web Vitals",
      event_label: metric.id,
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}
