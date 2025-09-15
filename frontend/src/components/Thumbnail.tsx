"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string; // optional local static fallback (e.g., /thumbs/app.png)
};

const FALLBACK_DATA_URL =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='#40E0D0'/>
          <stop offset='100%' stop-color='#22D3EE'/>
        </linearGradient>
      </defs>
      <rect width='800' height='600' fill='url(#g)'/>
    </svg>`
  );

export default function Thumbnail({ src, alt, className, fallbackSrc }: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [triedLocal, setTriedLocal] = useState(false);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      className={className}
      onError={() => {
        if (!triedLocal && fallbackSrc) {
          setTriedLocal(true);
          setCurrentSrc(fallbackSrc);
        } else {
          setCurrentSrc(FALLBACK_DATA_URL);
        }
      }}
    />
  );
}


