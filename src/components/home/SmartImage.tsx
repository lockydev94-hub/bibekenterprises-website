"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
}

/** Plain <img> with a single automatic fallback when a CDN asset is missing. */
export default function SmartImage({
  src,
  fallback,
  alt,
  className = "",
  width,
  height,
  loading = "lazy",
}: Props) {
  const [current, setCurrent] = useState(src || fallback);
  const failedRef = useRef(false);

  useEffect(() => {
    failedRef.current = false;
    setCurrent(src || fallback);
  }, [src, fallback]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      onError={() => {
        if (!failedRef.current && current !== fallback) {
          failedRef.current = true;
          setCurrent(fallback);
        }
      }}
    />
  );
}
