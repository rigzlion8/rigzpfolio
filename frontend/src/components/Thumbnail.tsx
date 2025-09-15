"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

type Props = {
  src: string;
  alt: string;
  className?: string;
  projectName?: string;
  category?: string;
};

// Color schemes for different categories
const getCategoryColors = (category: string) => {
  const colors: Record<string, { primary: string; secondary: string; accent: string }> = {
    "Commerce": { primary: "#10B981", secondary: "#059669", accent: "#34D399" },
    "Services": { primary: "#3B82F6", secondary: "#2563EB", accent: "#60A5FA" },
    "Social": { primary: "#8B5CF6", secondary: "#7C3AED", accent: "#A78BFA" },
    "FinTech": { primary: "#F59E0B", secondary: "#D97706", accent: "#FBBF24" },
    "Payments": { primary: "#EF4444", secondary: "#DC2626", accent: "#F87171" },
    "Content": { primary: "#EC4899", secondary: "#DB2777", accent: "#F472B6" },
    "Events": { primary: "#06B6D4", secondary: "#0891B2", accent: "#22D3EE" },
    "Default": { primary: "#40E0D0", secondary: "#22D3EE", accent: "#67E8F9" }
  };
  return colors[category] || colors["Default"];
};

const generateDynamicThumbnail = (projectName: string, category: string) => {
  const colors = getCategoryColors(category);
  const initials = projectName
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 3);

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
      <defs>
        <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='${colors.primary}'/>
          <stop offset='100%' stop-color='${colors.secondary}'/>
        </linearGradient>
        <linearGradient id='accent' x1='0' y1='0' x2='1' y2='0'>
          <stop offset='0%' stop-color='${colors.accent}' stop-opacity='0.3'/>
          <stop offset='100%' stop-color='${colors.accent}' stop-opacity='0.1'/>
        </linearGradient>
      </defs>
      <rect width='800' height='600' fill='url(#bg)'/>
      <rect width='800' height='200' y='400' fill='url(#accent)'/>
      <circle cx='150' cy='150' r='80' fill='white' fill-opacity='0.2'/>
      <circle cx='650' cy='450' r='60' fill='white' fill-opacity='0.15'/>
      <text x='400' y='280' font-family='Arial, sans-serif' font-size='64' font-weight='bold' fill='white' text-anchor='middle'>${initials}</text>
      <text x='400' y='350' font-family='Arial, sans-serif' font-size='32' fill='white' text-anchor='middle' opacity='0.9'>${projectName}</text>
      <text x='400' y='390' font-family='Arial, sans-serif' font-size='20' fill='white' text-anchor='middle' opacity='0.7'>${category}</text>
    </svg>`
  )}`;
};

export default function Thumbnail({ src, alt, className, projectName = "Portfolio", category = "Default" }: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const isMobile = useIsMobile();

  const handleError = () => {
    // Try different approaches before falling back to dynamic thumbnail
    if (retryCount === 0) {
      setRetryCount(1);
      // Try a simpler Microlink URL without extra parameters
      const simpleUrl = src.replace(/&[^&]*viewport[^&]*/g, '').replace(/&[^&]*screenshot[^&]*quality[^&]*/g, '');
      setCurrentSrc(simpleUrl);
      return;
    }
    
    if (retryCount === 1) {
      setRetryCount(2);
      // Try with a different screenshot service for desktop
      const url = new URL(src);
      const targetUrl = url.searchParams.get('url');
      if (targetUrl) {
        const alternativeUrl = `https://htmlcsstoimage.com/demo?url=${encodeURIComponent(targetUrl)}`;
        setCurrentSrc(alternativeUrl);
        return;
      }
    }
    
    // Final fallback to dynamic thumbnail
    setHasError(true);
    setCurrentSrc(generateDynamicThumbnail(projectName, category));
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Add a timeout to fallback to dynamic thumbnail if remote takes too long
  useEffect(() => {
    const timeout = 6000; // 6 seconds for both mobile and desktop
    const timer = setTimeout(() => {
      if (isLoading && !hasError) {
        setHasError(true);
        setCurrentSrc(generateDynamicThumbnail(projectName, category));
        setIsLoading(false);
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [isLoading, hasError, projectName, category]);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700 animate-pulse flex items-center justify-center">
          <div className="text-xs opacity-60 text-center">
            {retryCount === 0 ? 'Loading screenshot...' : 
             retryCount === 1 ? 'Retrying...' : 
             'Trying alternative...'}
          </div>
        </div>
      )}
      <Image
        src={currentSrc}
        alt={alt}
        fill
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        priority={false}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        unoptimized={true} // Don't optimize any external URLs to avoid 400 errors
      />
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-1 left-1 text-xs bg-black/50 text-white p-1 rounded text-[10px]">
          {hasError ? 'Dynamic' : 
           retryCount === 0 ? 'Screenshot' :
           retryCount === 1 ? 'Retry 1' :
           retryCount === 2 ? 'Retry 2' : 'Unknown'}
        </div>
      )}
    </div>
  );
}


