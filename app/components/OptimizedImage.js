'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  fill = false,
  width,
  height,
  style,
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`${className} ${isLoading ? 'blur' : ''}`}
        priority={priority}
        onLoadingComplete={() => setIsLoading(false)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={style}
        {...props}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${isLoading ? 'blur' : ''}`}
      priority={priority}
      onLoadingComplete={() => setIsLoading(false)}
      style={style}
      {...props}
    />
  );
}
