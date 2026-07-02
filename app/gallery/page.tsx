import { getGallery, getExhibitions } from '@/lib/microcms'
import RevealOnScroll from '@/components/RevealOnScroll'
import GalleryClient from '@/components/gallery/GalleryClient'

export const revalidate = 60

export default async function GalleryPage() {
  const [items, exhibitions] = await Promise.all([
    getGallery().catch(() => []),
    getExhibitions().catch(() => []),
  ])

  return (
    <div className="wrap pad-top pad-bottom">
      <RevealOnScroll className="sec-head">
        <h2 className="serif">Gallery</h2>
      </RevealOnScroll>

      {items.length === 0 ? (
        <p style={{ color: 'var(--ink-faint)', fontFamily: 'Jost', fontSize: '.86rem', letterSpacing: '.1em' }}>
          No images yet.
        </p>
      ) : (
        <GalleryClient items={items} exhibitions={exhibitions} />
      )}
    </div>
  )
}
