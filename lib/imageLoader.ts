'use client'

type ImageLoaderProps = {
  src: string
  width: number
  quality?: number
}

export default function microcmsImageLoader({ src, width, quality }: ImageLoaderProps): string {
  // ローカル画像（/public）はそのまま返す
  if (src.startsWith('/') || src.startsWith('data:')) return src
  const q = quality ?? 80
  // microCMS 画像
  if (src.includes('microcms-assets.io')) {
    return `${src}?fm=webp&fit=crop&w=${width}&q=${q}`
  }
  // その他の外部画像（picsum 等）は幅だけ指定
  return src
}
