'use client'

type ImageLoaderProps = {
  src: string
  width: number
  quality?: number
}

export default function microcmsImageLoader({ src, width, quality }: ImageLoaderProps): string {
  const q = quality ?? 80
  return `${src}?fm=webp&fit=crop&w=${width}&q=${q}`
}
